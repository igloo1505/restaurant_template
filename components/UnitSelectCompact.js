/* eslint-disable react/prop-types */
import React, { useEffect, useState, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import * as Types from "../stateManagement/TYPES";
import ClientSidePortal from "./portalAuthenticated/ClientSidePortal";
import { connect, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import MUIMenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Menu from "@material-ui/core/Menu";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import {
	getIngredientUnits,
	filterData,
	validateUnit,
} from "../util/appWideData";
import { Fragment } from "react";

const menuLimit = 10;
const textFieldId = "unit-autocomplete-textfield";

const useStyles = makeStyles((theme) => ({
	margin: {
		// adjust width here
		// width: "120px",
		width: "100%",
	},
	autoCompleteRoot: {
		width: "100%",
		"& label": {
			color: "#e0e0e0",
		},
	},
	autoCompleteRootFocused: {
		width: "100%",
		"& label": {
			color: "#fff !important",
		},
	},
	autoCompletePopper: {},
	autoCompleteListbox: { width: "100%" },
	autoCompletePaper: { width: "100%" },
	endAdornment: {
		color: "white",
		"& > *": {
			color: "#fff",
		},
	},

	togglePadding: {
		padding: "4px 16px",
	},
	clearIndicator: {
		display: "none",
	},
}));

const UnitSelectCompact = ({
	UI: {
		addRecipe: { allowSubRecipe: addSecondItemButton, activeStep, formData },
	},
	alert: {
		subRecipe: { isSubRecipe },
	},
	props,
}) => {
	const {
		InputLabelProps,
		focused,
		label,
		selectedUnit,
		focusState,
		setFocusState,
		addIngredient,
	} = props;
	const [unitHelper, setUnitHelper] = useState("");
	const [options, setOptions] = useState(null);
	const [currentHighlightedOption, setCurrentHighlightedOption] =
		useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("Form data here", formData.ingredient);
		// debugger;
		if (formData.ingredient?.unit?.long) {
			setUnitHelper(formData.ingredient.unit.long);
		}
	}, [formData]);

	const setFormData = (newFormData) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_FORM_DATA,
			payload: newFormData,
		});
	};

	const setSubRecipeFormData = (value) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_FORM_DATA,
			payload: {
				...formData,
				subRecipes: value,
			},
		});
	};

	useEffect(() => {
		if (options?.length === 1) {
			let _unit = options?.[0];
			if (_unit) {
				handleSubmission({ unit: _unit });
			}
		}
	}, [options]);
	const theme = useTheme();
	const classes = useStyles();

	// useEffect(() => {
	// 	let options = getIngredientUnits("_initial_");
	// 	setOptions(options);
	// }, []);

	const defaultProps = {
		options: options,
		getOptionLabel: (option) => option.long,
	};

	const getParts = (option) => {
		let parts = [];
		let flags = "gi";
		let isUpper =
			unitHelper.toLowerCase() !== unitHelper.toUpperCase() &&
			unitHelper.length < 2;
		if (isUpper) {
			flags = "g";
		}
		let regex = new RegExp(unitHelper, flags);
		let unitHelperHelper = unitHelper;
		let str = option.long;
		// Add in extra character if next character is white space.
		let matches = str.split(regex);
		matches.forEach((m) => {
			if (m.charAt(0) === " ") {
				unitHelperHelper = `${unitHelperHelper} `;
			}
			if (m[m.length - 1] === " ") {
				unitHelperHelper = ` ${unitHelperHelper}`;
			}
		});
		if (matches.length === option.long.length) {
			matches = [];
		}
		matches.forEach((m, i, a) => {
			let o = {
				text: m,
				match: false,
			};
			parts.push(o);
			if (i !== a.length - 1) {
				let position = option.long.search(regex);

				parts.push({
					text: option.long.slice(position, position + unitHelper.length),
					match: true,
				});
			}
		});
		if (matches.length === 0) {
			parts.push({ text: option.long, match: false });
		}
		return parts;
	};

	const handleArrowKeys = (_key) => {
		let key = _key;
		const getValue = (curVal = 0, dir) => {
			// if (curVal === 0) curVal = 1;
			let iz = options?.findIndex((o) => !o.isKey);

			if (typeof iz !== "number") {
				return;
			}
			curVal === 0 && (curVal = iz);
			let newVal = curVal;
			if (dir === "up") {
				if (curVal === iz) {
					console.log("curVal", curVal);
					newVal = options?.length - 1;
				}
				if (curVal > iz) {
					console.log("curVal", curVal);
					newVal = curVal - 1;
				}
			}
			if (dir === "down") {
				if (curVal === options?.length - 1) {
					console.log("curVal", curVal);
					newVal = iz;
				}
				if (curVal < options?.length - 1) {
					console.log("curVal", curVal);
					newVal = curVal + 1;
				}
			}
			if (typeof newVal === "number") {
				let ox = options[newVal];
				if (!ox) return;
				if (ox.isKey) return getValue(newVal, dir);
				return { item: ox, index: newVal };
			}
		};
		let x = {
			ArrowUp: "up",
			ArrowDown: "down",
		};
		let nhl = getValue(currentHighlightedOption?.index, x[key]);
		if (nhl) {
			console.log("new highlighted item: ", nhl);
			setCurrentHighlightedOption(nhl);
			handleSubmission({ unit: nhl.item });
		}
		return nhl;
	};

	const handleKeyPress = (e) => {
		if (e.code === "Escape") {
			handleSubmission({ unitDotLong: e.target.value });
			setOptions(null);
		}
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			handleArrowKeys(e.key);
			if (!options) {
				setOptions(filterData("_initial_", "servings"));
			}
		}
		// debugger;
		if (e.code === "Enter") {
			e.preventDefault();
			e.stopPropagation();
			console.log("options", formData.ingredient);
			if (!options) {
				let un = handleSubmission({ unitDotLong: e.target.value });
				if (un) {
					addIngredient(un);
					handleFocus("blur");
				}
			}
			if (options) {
				setOptions(null);
			}
			// handleSubmission({ unit: currentHighlightedOption.item });
		}
	};

	const handleSubmission = ({ unit, unitDotLong }) => {
		if (!unit && unitDotLong) {
			unit =
				filterData(unitDotLong, "serving").length === 1
					? filterData(unitDotLong, "serving")[0]
					: null;
		}
		if (unit && isSubRecipe < 0) {
			setFormData({
				...formData,
				ingredient: { ...formData.ingredient, unit: unit },
			});
		}
		console.log("Form data", formData);
		if (unit && isSubRecipe >= 0) {
			let newSubRecData = [...formData?.subRecipes];
			newSubRecData[isSubRecipe] = {
				...newSubRecData[isSubRecipe],
				ingredient: {
					...newSubRecData[isSubRecipe].ingredient,
					ingredient: {
						...newSubRecData[isSubRecipe].ingredient,
						unit: unit,
					},
				},
			};
			setSubRecipeFormData(newSubRecData);
		}
		return unit;
	};

	//

	const handleChange = (e) => {
		console.log("e: ", e);
		if (e.key === "Enter" && e.type === "keydown") {
			e.preventDefault();
			e.stopPropagation();
			// RESUME HERE: FIX THIS SHIT FOR THE FOURTH TIME SO IT DOESN'T SUBMIT ON FIRST ENTER PRESS AND RESET TO DEFAULT VALUE RIGHT AWAY. I'VE BEEN AT THIS FOR WAY TOO LONG.
			// debugger;
			let theseEms = document.querySelectorAll("[data-focus='true']");
			theseEms.forEach((em) => {
				if (em.classList.contains("autocomplete-unit-option")) {
					let _unit = getIngredientUnits().filter(
						(u) => u.long.toLowerCase() === em.textContent.trim().toLowerCase()
					);
					console.log("_unit: ", _unit);
					// handleSubmission(_unit)
				}
			});
			return;
		}
		if (typeof e.target?.value === "string") {
			let _unit = getIngredientUnits().filter(
				(u) => u.long.toLowerCase() === e.target.value.trim().toLowerCase()
			);
			setOptions(_unit);
			setCurrentHighlightedOption({ item: _unit[0] });
			if (_unit.length === 1) {
				handleSubmission({ unit: _unit });
			}
			setUnitHelper(e.target.value);
			let filtered = filterData(e.target.value, "serving");
			if (e.target.value.length > 0) {
				setOptions(filtered);
				setCurrentHighlightedOption({ item: filtered[0] });
			}
			if (e.target.value.length === 0) {
				setOptions(null);
				setCurrentHighlightedOption(null);
			}
		}
	};

	const handleItemClick = (e, option) => {
		if (typeof option === "object") {
			let unit_ = getIngredientUnits().filter(
				(u) => !u.isKey && u.long === option.long
			);
			handleSubmission({ unit: unit_ });
		} else if (e.target?.value) {
			let _unit = getIngredientUnits()
				.filter((u) => !u.isKey)
				.filter(
					(u, i) => u.long.toLowerCase() === e.target.value.toLowerCase()
				);
			if (_unit.length === 1) {
				handleSubmission({ unit: _unit });
			}
		}
	};

	const handleFocus = (type) => {
		let shouldShrink =
			unitHelper.length > 0 ||
			typeof formData.ingredient.unit.long !== "undefined";
		let shouldFocus = type === "focus" ? true : false;
		setFocusState({
			...focusState,
			unit: {
				shrink: shouldShrink,
				focus: shouldFocus,
			},
		});
	};

	return (
		<FormControl className={classes.margin}>
			<TextField
				autocomplete="off"
				id={textFieldId}
				value={unitHelper}
				fullWidth
				onChange={handleChange}
				onFocus={() => handleFocus("focus")}
				onBlur={() => handleFocus("blur")}
				onKeyDown={(e) => handleKeyPress(e)}
				{...props}
			/>
			<DropDown
				options={options}
				unitHelper={unitHelper}
				highlighted={currentHighlightedOption}
			/>
		</FormControl>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	alert: state.alert,
	props: props,
});
export default connect(mapStateToProps)(UnitSelectCompact);

const useDropdownClasses = makeStyles((theme) => ({
	dropdownContainer: {
		width: "100%",
		position: "absolute",
		backgroundColor: "#fff",
		zIndex: 101,
		border: `2px solid ${theme.palette.primary.light}`,
		padding: "0.5rem 0rem",
		borderRadius: "4px",
		transform: "translateY(50)",
	},
	hide: { display: "none" },
	textContainer: { width: "fit-content", padding: "0px 5px" },
	autoCompleteOption: {
		opacity: "1 !important",
		padding: "0px",
		"&:hover": {
			backgroundColor: "rgba(81, 161, 255, 0.4)",
		},
		'&[data-focus="true"]': {
			backgroundColor: "rgba(81, 161, 255, 0.4)",
		},
	},
	optionKey: {
		"&[data-focus='true']": {
			backgroundColor: "#fff",
			"& span": {
				borderBottom: "1px solid #fff",
			},
		},
	},
	optionWithValue: {
		// padding: "4px 7px",
		// margin: "4px 7px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"& span": {
			padding: "0px",
			fontSize: "0.7rem",
			// whiteSpace: "nowrap",
			whiteSpace: "break-spaces",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	option: {
		// padding: "4px 18px",
		margin: "0",
		display: "flex",
		width: "100%",
		height: "100%",
		padding: "6px 16px",
		justifyContent: "center",
		alignItems: "center",
		// padding: "0px",
		"& span": {
			fontSize: "0.7rem",
			// Go back to this for smaller screen sizes.
			// whiteSpace: "nowrap",
			whiteSpace: "break-spaces",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
		"&[data-focus='true']": {
			backgroundColor: "rgba(81, 161, 255, 0.4)",
			"& span": {
				borderBottom: "1px solid #fff",
			},
		},
	},
	optionHighlighted: {
		backgroundColor: "rgba(81, 161, 255) !important",
		"& span": {
			borderBottom: "1px solid #fff",
			color: "#fff",
		},
	},
	strikethroughContainerThing: {
		display: "flex",
		width: "calc(100% - 0.5rem)",
		height: "100%",
		margin: "0px 0.25rem",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: theme.palette.primary.main,
	},
	strikethroughUpper: {
		height: "calc(50% - 1px)",
		width: "100%",
		backgroundColor: "#fff",
	},
	strikethroughLower: {
		height: "calc(50% - 1px)",
		// height: "100%",
		width: "100%",
		backgroundColor: "#fff",
	},
	keyContainer: {
		opacity: "1 !important",
		width: "100%",
		display: "grid",
		gridTemplateColumns: "1fr auto 1fr",
		"& span": {
			fontSize: "0.7rem",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
}));

const DropDown = connect(mapStateToProps)(
	({
		props: { options, unitHelper, highlighted },
		UI: {
			addRecipe: { formData },
			viewport: { width: deviceWidth, height: deviceHeight },
		},
	}) => {
		const classes = useDropdownClasses();
		const [isOpen, setIsOpen] = useState(false);
		const [styles, setStyles] = useState({});
		useEffect(() => {
			let txtField = document
				.getElementById(textFieldId)
				?.getBoundingClientRect();
			let pEm = document.getElementById(textFieldId)?.parentElement;
			let oSet = pEm.computedStyleMap().get("transform");
			console.log("pEm: txtField ", pEm, oSet);
			if (!txtField) {
				return setStyles({});
			}
			let ns = {
				top: `${txtField.bottom}px`,
				left: `${txtField.left}px`,
				...(pEm?.clientWidth
					? { width: `${pEm?.clientWidth}px` }
					: { width: "120px" }),
			};
			setStyles(ns);
			console.log("txtField: ", txtField);
		}, [
			deviceWidth,
			deviceHeight,
			formData.ingredients,
			formData.subRecipes,
			options,
		]);

		useEffect(() => {
			setIsOpen(options?.length > 0);
		}, [options]);
		return (
			<ClientSidePortal selector="#topLevelPortalContainer">
				<div
					className={clsx(classes.dropdownContainer, !isOpen && classes.hide)}
					style={styles}
				>
					{options &&
						options.map((option, i) => (
							<DropdownItem
								option={option}
								key={`unit-dropdown-item-${i}`}
								unitHelper={unitHelper}
								highlighted={highlighted?.item?.long === option.long}
							/>
						))}
				</div>
			</ClientSidePortal>
		);
	}
);

const DropdownItem = ({ option, unitHelper, highlighted }) => {
	const classes = useDropdownClasses();
	const theme = useTheme();
	if (!option.isKey) {
		return (
			<div
				className={clsx(
					classes.option,
					highlighted && classes.optionHighlighted,
					"unit-autocomplete-option",
					unitHelper.length > 0 && classes.optionWithValue
				)}
				value={option.long}
				// And here too: from like 10 lines below
				// onClick={(e) => handleItemClick(e, option)}
				onSelect={(e) => console.log("Selected", option.long)}
				onFocus={(e) => console.log("Selected", option.long)}
				// TODO make sure this clickItem function or something similar is handled on select or whatever method is called when you press Enter
			>
				<span
					value={option.long}
					// TODO: add this back in either after passing it down again or creating it here.
					// onClick={(e) => handleItemClick(e, option)}
				>
					{option.long}
				</span>
			</div>
		);
	}
	if (option.isKey) {
		return (
			<div className={classes.keyContainer}>
				<div className={classes.strikethroughContainerThing}>
					<div className={classes.strikethroughUpper}></div>
					<div className={classes.strikethroughLower}></div>
				</div>
				<div className={classes.textContainer}>{option.long}</div>
				<div className={classes.strikethroughContainerThing}>
					<div className={classes.strikethroughUpper}></div>
					<div className={classes.strikethroughLower}></div>
				</div>
			</div>
		);
	}
};
