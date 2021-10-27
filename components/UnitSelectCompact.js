/* eslint-disable react/prop-types */
import React, { useEffect, useState, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import * as Types from "../stateManagement/TYPES";
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

const useStyles = makeStyles((theme) => ({
	margin: { width: "100%" },
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
	option: {
		// padding: "4px 18px",
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
	togglePadding: {
		padding: "4px 16px",
	},
	clearIndicator: {
		display: "none",
	},
	strikethroughContainerThing: {
		display: "flex",
		width: "100%",
		height: "100%",
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
	textContainer: { width: "fit-content", padding: "0px 5px" },
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

const UnitSelectCompact = ({
	UI: {
		addRecipe: { allowSubRecipe: addSecondItemButton, activeStep, formData },
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
		isSubRecipe,
		setIsSubRecipe,
	} = props;
	const [unitHelper, setUnitHelper] = useState("");
	const [options, setOptions] = useState(null);
	const [popperIsOpen, setPopperIsOpen] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
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
		if (options?.length === 0) {
			return setPopperIsOpen(false);
		}
		if (options?.length > 0) {
			setPopperIsOpen(true);
		}
		if (options?.length === 1) {
			let _unit = options?.[0];
			if (_unit) {
				handleSubmission(_unit);
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

	const handleKeyPress = (e) => {
		if (typeof window !== "undefined") {
			if (e.code === "Enter") {
				e.preventDefault();
				e.stopPropagation();
				let regex = new RegExp(e.target.value, "gi");
				let daUnit = filterData(regex)[0];
				if (
					daUnit &&
					formData.ingredient.text.length >= 3 &&
					typeof parseFloat(formData.ingredient.amount) === "number"
				) {
					console.log("DIspatch addIngredient", addIngredient);
					// addIngredient(daUnit);
				}
			}
		}
	};

	const handleSubmission = ({ unit, unitDotLong, noSubmit }) => {
		if (!unit && unitDotLong) {
			unit =
				filterData(unitDotLong).length === 1
					? filterData(unitDotLong)[0]
					: null;
		}
		if (noSubmit) {
			return unit;
		}
		if (unit && isSubRecipe < 0) {
			setFormData({
				...formData,
				ingredient: { ...formData.ingredient, unit: unit[0] },
			});
		}

		if (unit && isSubRecipe >= 0) {
			let newSubRecData = [...formData?.subRecipes];
			newSubRecData[isSubRecipe] = {
				...newSubRecData[isSubRecipe],
				ingredient: {
					...newSubRecData[isSubRecipe].ingredient,
					ingredient: {
						...newSubRecData[isSubRecipe].ingredient,
						unit: unit[0],
					},
				},
			};
			setSubRecipeFormData(newSubRecData);
		}
	};

	handleSubmission({
		unitDotLong: "Liter",
	});

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
			if (_unit.length === 1) {
				handleSubmission({ unit: _unit });
			}
			setUnitHelper(e.target.value);
			let filtered = filterData(e.target.value);
			if (e.target.value.length > 0) {
				setOptions(filtered);
			}
			if (e.target.value.length === 0) {
				setOptions(null);
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
			<Autocomplete
				{...defaultProps}
				id="unit-select-autocomplete"
				disableCloseOnSelect
				defaultMuiPrevented
				open={popperIsOpen}
				fullWidth
				// autoSelect
				autoComplete
				getOptionDisabled={(option) => option.isKey}
				onChange={handleChange}
				classes={{
					root: clsx(
						classes.autoCompleteRoot,
						focusState.unit.focus && classes.autoCompleteRootFocused
					),
					popper: classes.autoCompletePopper,
					listbox: classes.autoCompleteListbox,
					paper: classes.autoCompletePaper,
					loading: classes.loading,
					noOptions: classes.noOptions,
					groupLabel: classes.groupLabel,
					groupUl: classes.groupUl,
					option: classes.autoCompleteOption,
					inputFocused: props.InputProps.classes.focused,
					input: props.InputProps.classes.input,
					inputRoot: props.InputProps.classes.root,
					endAdornment: classes.endAdornment,
					clearIndicator: classes.clearIndicator,
				}}
				renderInput={(params) => {
					// Don't delete this. Needed to use value inline here.
					delete params.inputProps.value;
					return (
						<TextField
							id={props.id}
							value={unitHelper}
							fullWidth
							onChange={handleChange}
							onFocus={() => handleFocus("focus")}
							onBlur={() => handleFocus("blur")}
							onKeyDown={(e) => handleKeyPress(e)}
							{...props}
							{...params}
						/>
					);
				}}
				renderOption={(option, { ...state }) => {
					const ignore = (e) => {
						return e.preventDefault();
					};
					const parts = getParts(option);
					if (!option.isKey) {
						return (
							<div
								className={clsx(
									classes.option,
									"unit-autocomplete-option",
									unitHelper.length > 0 && classes.optionWithValue
								)}
								value={option.long}
								onClick={(e) => handleItemClick(e, option)}
								onSelect={(e) => console.log("Selected", option.long)}
								onFocus={(e) => console.log("Selected", option.long)}
								// TODO make sure this clickItem function or something similar is handled on select or whatever method is called when you press Enter
							>
								{parts.map((part, index) => (
									<span
										key={index}
										style={{
											color: part.match ? theme.palette.primary.main : "#000",
											padding: part.text === " " && "0px 2px",
										}}
										value={option.long}
										onClick={(e) => handleItemClick(e, option)}
									>
										{part.text}
									</span>
								))}
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
								<div className={classes.textContainer} onClick={ignore}>
									{parts.map((part, index) => (
										<span
											key={index}
											style={{
												color: part.match
													? theme.palette.secondary.main
													: "#000",
												margin: part.text === "_" && "10px",
											}}
											onClick={ignore}
										>
											{part.text.toUpperCase()}
										</span>
									))}
								</div>
								<div className={classes.strikethroughContainerThing}>
									<div className={classes.strikethroughUpper}></div>
									<div className={classes.strikethroughLower}></div>
								</div>
							</div>
						);
					}
				}}
			/>
		</FormControl>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});
export default connect(mapStateToProps)(UnitSelectCompact);
