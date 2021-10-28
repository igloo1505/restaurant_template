/* eslint-disable react/prop-types */
import React, {
	useState,
	useRef,
	useEffect,
	Fragment,
	forwardRef,
} from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useDispatch, connect } from "react-redux";
import * as Types from "../stateManagement/TYPES";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import CheckedIcon from "@material-ui/icons/DoneOutlined";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import { isMobile } from "mobile-device-detect";
import Fade from "@material-ui/core/Fade";
import AddAdornment from "./AddAdornment";
import ingredientAdornment from "./ingredientUnitAdornment";
import UnitSelectCompact from "./UnitSelectCompact";
import { getIngredientUnits } from "../util/appWideData";
import { validateStepTwo } from "../util/addRecipeFormValidate";

const unitContainerBreakpoint = "xl";

const getHasSentAlert = () => {
	let value = localStorage.getItem("hasSentAlert-ingredients");
	return value ? value : false;
};
const useStyles = makeStyles((theme) => ({
	hide: {
		display: "none !important",
	},
	container: {
		marginRight: "10px",
		transform: "translateX(0%)",
		transition: theme.transitions.create(["transform"], {
			duration: 500,
		}),
		minWidth: "300px",
		position: "relative",
		[theme.breakpoints.down(960)]: {
			minWidth: "min(200px, 25vw)",
		},
		[theme.breakpoints.down(600)]: {
			minWidth: "unset",
			padding: "1rem 0.75rem 1rem 0.75rem",
			borderRadius: "20px",
			margin: "0.75rem 0px 0px ",
			// boxShadow: "3px 3px 12px #783108, -3px -3px 12px #ff8f18",
			// boxShadow: "3px 3px 10px #bb5820, -3px -3px 10px #ff8830",
			boxShadow: "5px 5px 10px #c14f0d, -5px -5px 10px #ff7113",
			backgroundColor: theme.palette.secondary.dark,
			border: `1px solid ${theme.palette.secondary.light}`,
		},
	},
	transformContainer: {
		// transform: "translateX(50%)",
		transform: "translateX(calc(50% + 1.5rem))",
		zIndex: 100,
		// backgroundColor: theme.palette.secondary.main,
		transition: theme.transitions.create(["transform"], {
			duration: 500,
		}),
	},
	textFieldRoot: {
		minWidth: "100%",
		alignSelf: "stretch",
		color: "#fff",
		"& > div": {
			minWidth: "100%",
			width: "100%",
		},
	},
	topTextFieldRoot: {
		// marginTop: "2rem"
	},
	inputRoot: {
		color: "#fff",
		// paddingLeft: "5px",
		"&:before": {
			borderBottom: "1px solid #fff",
		},
	},
	inputroot: {
		"&:before": {
			borderBottom: "1px solid #fff",
		},
		"&:hover:not(.Mui-disabled):before": {
			borderBottom: "2px solid #fff",
		},
		"&:after": {
			borderBottom: `1px solid ${theme.palette.secondary.light}`,
			transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	inputrootSelect: {
		paddingRight: "30px !important",
		"&:before": {
			borderBottom: "1px solid #fff",
		},
		"&:hover:not(.Mui-disabled):before": {
			borderBottom: "2px solid #fff",
		},
		"&:after": {
			borderBottom: `2px solid ${theme.palette.primary.light}`,
			transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	inputFocused: {
		color: "#fff",
		// boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
		// borderRadius: "4px",
		transition: theme.transitions.create(["box-shadow"], {
			duration: 250,
		}),
		"&:after": {
			borderBottom: `2px solid ${theme.palette.primary.light}`,
			transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		},
	},
	inputLabelRoot: { color: "#e0e0e0" },
	inputLabelWithValue: {
		color: "#fff",
		// transform: "translate(2px, 0px) !important",
		// fontSize: "0.7rem",
	},
	inputLabelFocused: {
		color: "#fff !important",
		// transform: "translate(8px, 24px)",
	},
	checkBoxRoot: {
		color: "#e0e0e0",
		padding: "0px 1px",
		margin: "9px 8px",
		borderRadius: "4px",
		zIndex: 1,
		transition: theme.transitions.create(["box-shadow"], {
			duration: 300,
		}),
	},
	checkBoxChecked: {
		background: theme.palette.secondary.main,
		boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
		borderRadius: "4px",
		transition: theme.transitions.create(["box-shadow"], {
			duration: 300,
		}),
		[theme.breakpoints.down(600)]: {
			background: theme.palette.secondary.dark,
			boxShadow: "2px 2px 2px #c34f0d, -2px -2px 2px #e55d0f",
		},
	},
	checkboxDisabled: {},
	checkboxLabel: { color: "#fff" },
	checkBoxContainer: {
		float: "right",
	},
	unitAndAmountContainer: {
		width: "100%",
		display: "grid",
		gridColumnGap: "10px",
		gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
		[theme.breakpoints.up(unitContainerBreakpoint)]: {
			display: "flex",
			flexDirection: "row",
		},
	},
	amountContainer: {
		[theme.breakpoints.up(unitContainerBreakpoint)]: {
			// width: "50%",
			width: "calc(50% - 5px)",
			marginRight: "5px",
		},
	},
	unitContainer: {
		[theme.breakpoints.up(unitContainerBreakpoint)]: {
			width: "calc(50% - 5px)",
			marginLeft: "5px",
		},
	},
	typographyRoot: {
		margin: "12px 4px 7px 4px",
		color: "#e0e0e0",
		transition: theme.transitions.create(["color"], {
			duration: 500,
		}),
	},
	typographyRootFocused: {
		color: "#fff",
		transition: theme.transitions.create(["color"], {
			duration: 500,
		}),
	},
	bottomContainer: {
		marginTop: "1rem",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	addSecondItemButtonContainer: {},
	addSecondItemButton: {
		backgroundColor: theme.palette.info.main,
		"&:hover": {
			backgroundColor: theme.palette.info.main,
			boxShadow: "2px 2px 6px #cc540e, -2px -2px 6px #ff6c12",
			transition: theme.transitions.create(["box-shadow"], {
				duration: 350,
			}),
		},
	},
	addSecondItemButtonLabel: {
		color: "#fff",
		textTransform: "none",
	},
	subRecipeTitleTextContainer: {
		display: "flex",
		zIndex: 100,
		transform: "translateX(-50%)",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	subRecipeTitleText: {
		color: "#fff",
	},
}));

const StepTwoFormComponent = ({
	handleFormChange,
	isShifted,
	hasMenuOpen,
	setHasMenuOpen,
	handleAddSecondItem,
	setIsSubRecipe,
	hasSetCommand,
	alert: {
		subRecipe: { titles: subRecipeTitleArray, isSubRecipe, latestDirection },
		keyboardShortcuts: { show: showKeyboardShortcuts },
	},
	UI: {
		addRecipe: { allowSubRecipe: addSecondItemButton, activeStep, formData },
	},
}) => {
	const dispatch = useDispatch();
	const [arrayWithMain, setArrayWithMain] = useState([]);
	const ingredientInputRef = useRef(null);

	const setSubRecipeFormData = (subRecData) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_FORM_DATA,
			payload: {
				...formData,
				subRecipes: subRecData,
			},
		});
	};

	const setFormData = (newFormData) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_FORM_DATA,
			payload: newFormData,
		});
	};

	useEffect(() => {
		if (activeStep === 1) {
			ingredientInputRef.current.focus();
		}
	}, [activeStep]);

	useEffect(() => {
		dispatch({
			type: Types.SET_ALLOW_SUB_RECIPE,
			payload: formData.ingredients.length > 2,
		});
	}, [formData]);
	useEffect(() => {
		if (subRecipeTitleArray.length > 0) {
			let newArray = [
				{
					text: "Main",
					thisIndex: -1,
				},
			];
			subRecipeTitleArray.forEach((title, index) => {
				newArray.push({
					text: title,
					thisIndex: index,
				});
			});
			setArrayWithMain(newArray);
		}
		if (subRecipeTitleArray.length === 0) {
			setArrayWithMain([]);
		}
	}, [subRecipeTitleArray]);
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("keydown", (e) => {
				let cmdShift = e.shiftKey && e.metaKey;
				if (subRecipeTitleArray.length > 0) {
					if (cmdShift && e.key === "ArrowRight") {
						dispatch({
							type: Types.LOOP_THROUGH_SUB_RECIPES,
							payload: "rightKey",
						});
					}
					if (cmdShift && e.key === "ArrowLeft") {
						dispatch({
							type: Types.LOOP_THROUGH_SUB_RECIPES,
							payload: "leftKey",
						});
					}
				}
			});
		}
	}, [subRecipeTitleArray]);

	const [hasSentAlert, setHasSentAlert] = useState(getHasSentAlert());
	const [shiftPressed, setShiftPressed] = useState(false);

	const [focusState, setFocusState] = useState({
		ingredient: {
			shrink: Boolean(formData?.ingredient?.text?.length !== 0),
			focus: false,
		},
		amount: {
			shrink: Boolean(formData?.ingredient?.amount?.length !== 0),
			focus: false,
		},
		unit: {
			shrink: Boolean(formData?.ingredient?.unit?.length !== 0),
			focus: false,
		},
	});
	const sendAddIngredientNotification = () => {
		if (!hasSentAlert) {
			if (localStorage) {
				localStorage.setItem("hasSentAlert-ingredients", true);
				setHasSentAlert(true);
			}
			dispatch({
				type: Types.SHOW_SNACKBAR,
				payload: {
					message: "To add an ingredient, click the + icon or press ENTER.",
					variant: "info",
					vertical: "bottom",
					horizontal: "left",
					hideIn: 10000,
				},
			});
		}
	};

	const handleChange = (e) => {
		if (e.target.value.length === 3) {
			sendAddIngredientNotification();
		}
		if (isSubRecipe >= 0) {
			let newSubRecData = [...formData?.subRecipes];
			newSubRecData[isSubRecipe] = {
				...newSubRecData[isSubRecipe],
				ingredient: {
					...newSubRecData[isSubRecipe].ingredient,
					[e.target.name]: e.target.value,
				},
			};
			setSubRecipeFormData(newSubRecData);
		}
		if (isSubRecipe < 0) {
			if (e.target.name === "amount") {
				return setFormData({
					...formData,
					ingredient: { ...formData.ingredient, amount: e.target.value },
				});
			}
			if (e.target.name !== "amount") {
				setFormData({
					...formData,
					[e.target.name]: { ...formData[e.target.name], text: e.target.value },
				});
			}
		}
	};
	// Go back and change this to use users last used unit
	const addIngredient = (unit) => {
		// if (formData.ingredients.length >= 1) {
		//   setAddSecondItemButton(true);
		// }
		if (isSubRecipe >= 0) {
			let newSubRecData = [...formData?.subRecipes];
			newSubRecData[isSubRecipe] = {
				...newSubRecData[isSubRecipe],
				ingredients: [
					...newSubRecData[isSubRecipe].ingredients,
					newSubRecData[isSubRecipe].ingredient,
				],
				ingredient: {
					ingredient: "",
					optional: false,
					amount: 1,
					// unit: newSubRecData[isSubRecipe].ingredient.unit
					unit: unit,
				},
			};
			setSubRecipeFormData(newSubRecData);
			document.getElementById("recipeIngredientInput").focus();
			document.getElementById("recipeIngredientInput").select();
		}
		if (isSubRecipe < 0) {
			setFormData({
				...formData,
				ingredients: [
					...formData.ingredients,
					{ ...formData.ingredient, unit: unit },
				],
				ingredient: {
					text: "",
					optional: false,
					amount: 1,
					unit: { long: "cups", short: "cups" },
				},
			});
			document.getElementById("recipeIngredientInput").focus();
			document.getElementById("recipeIngredientInput").select();
		}
	};
	const classes = useStyles();
	const fauxListener = (title, type) => {
		if (title !== "unit") {
			if (type === "blur") {
				setFocusState({
					...focusState,
					[title]: {
						shrink: Boolean(formData?.[title]?.length !== 0),
						focus: false,
					},
				});
			}
			if (type === "focus") {
				setFocusState({
					...focusState,
					[title]: {
						shrink: Boolean(formData?.[title]?.length !== 0),
						focus: true,
					},
				});
			}
		}
	};

	useEffect(() => {
		if (subRecipeTitleArray.length > 0) {
			let length = subRecipeTitleArray.length - 1;
			setSubRecipeFormData([
				...formData?.subRecipes,
				{
					title: subRecipeTitleArray[subRecipeTitleArray.length - 1],
					ingredients: [],
					ingredient: {
						ingredient: "",
						optional: false,
						amount: 1,
						unit: { long: "Cups", short: "cups", key: "Volume" },
					},
				},
			]);

			// setIsSubRecipe(length);
		}
	}, [subRecipeTitleArray]);
	const handleSubRecipeButtonClick = () => {
		dispatch({
			type: Types.SHOW_ALERT,
			payload: {
				title: "Sub-Recipe Title",
				variant: "setSubRecipeTitle",
				currentSubRecipeIndex: isSubRecipe,
				titleColor: "primary",
			},
		});
	};
	useEffect(() => {
		if (typeof window !== "undefined") {
			if (!isMobile) {
				// let hasShownModal = window.localStorage.getItem("hskm")
				//   if (!hasShownModal) {
				//     dispatch({
				//       type: Types.TOGGLE_ADD_RECIPE_KEYBOARD_SHORTCUTS,
				//     })
				//     window.localStorage.setItem("hskm", true)
				//   }
				// }
				document.addEventListener("keydown", (e) => {
					if (
						e.metaKey &&
						e.shiftKey &&
						e.key === "i" &&
						formData?.ingredients?.length > 3
					) {
						handleSubRecipeButtonClick();
					}
				});
			}
		}
	}, []);

	const checkUnit = () => {
		let unit = formData.ingredient?.unit?.long?.toLowerCase();
		let units = getIngredientUnits().filter((u) => !u.isKey);
		let indexOf = units.map((u) => u.long.toLowerCase()).indexOf(unit);

		return indexOf !== -1 ? units[indexOf] : false;
		// return
	};
	const keyObserver = (e) => {
		let theseEms = document.querySelectorAll("[data-focus='true']");
		let hasDataFocus = theseEms.length > 0;
		let HAS_SELECTED_INGREDIENT = false;
		let selectedOption = theseEms.forEach((em) => {
			if (em.classList.contains("autocomplete-unit-option")) {
				let hasClass = em?.childNodes?.forEach((child) => {
					if (child?.classList?.contains("unit-autocomplete-option")) {
						HAS_SELECTED_INGREDIENT = getIngredientUnits().filter((i) => {
							return child.textContent.toLowerCase() === i?.long?.toLowerCase();
						})?.[0];
					}
				});
			}
			return false;
		});

		if (!e.shiftKey && e.key === "Enter") {
			e.preventDefault();
			let validated = false;
			if (isSubRecipe < 0) {
				validated = {
					text: Boolean(formData.ingredient.text.length >= 3),
					amount: Boolean(
						typeof parseFloat(formData.ingredient.amount) === "number"
					),
					unit: HAS_SELECTED_INGREDIENT ? HAS_SELECTED_INGREDIENT : checkUnit(),
				};

				if (Object.values(validated).every((i) => i)) {
					addIngredient(validated.unit);
				}
			}
			if (isSubRecipe >= 0) {
				validated = {
					text: Boolean(
						formData?.subRecipes?.[isSubRecipe].ingredient.ingredient.length >=
							3
					),
					amount: Boolean(
						typeof parseFloat(
							formData?.subRecipes?.[isSubRecipe].ingredient.amount
						) === "number"
					),
					unit: HAS_SELECTED_INGREDIENT ? HAS_SELECTED_INGREDIENT : checkUnit(),
				};
				if (Object.values(validated).every((i) => i)) {
					// RESUME add check here to make sure unit is currently selected one if dropdown is open rather than the text content of the textField

					addIngredient(validated.unit);
				}
			}
		}
		if (e.shiftKey) {
			setShiftPressed(true);
		}
	};
	const handleChangeBoolean = (e) => {
		if (isSubRecipe >= 0) {
			let newSubRecData = [...formData?.subRecipes];
			newSubRecData[isSubRecipe] = {
				...newSubRecData[isSubRecipe],
				ingredient: {
					...newSubRecData[isSubRecipe].ingredient,
					optional: !subRecipeFormData[isSubRecipe].ingredient.optional,
				},
			};
			setSubRecipeFormData(newSubRecData);
		}
		if (isSubRecipe < 0) {
			setFormData({
				...formData,
				[e.target.name]: {
					...formData[e.target.name],
					optional: !formData[e.target.name].optional,
				},
			});
		}
	};

	return (
		<div
			className={clsx(
				classes.container,
				!isShifted && classes.transformContainer
			)}
		>
			{arrayWithMain.length > 0 &&
				arrayWithMain.map((title, index) => (
					<SubRecipeBanner
						classes={classes}
						subRecipeIndex={index}
						currentTitle={subRecipeTitleArray[isSubRecipe]}
						thisTitle={title.text}
						isIn={title.thisIndex === isSubRecipe}
						latestDirection={latestDirection}
						index={title.thisIndex}
						subRecipeFormData={formData?.subRecipes}
						isSubRecipe={isSubRecipe}
					/>
				))}
			<TextField
				id="recipeIngredientInput"
				name="ingredient"
				onFocus={() => fauxListener("ingredient", "focus")}
				onBlur={() => fauxListener("ingredient", "blur")}
				fullWidth
				classes={{ root: classes.topTextFieldRoot }}
				autoFocus
				multiline
				inputRef={ingredientInputRef}
				label="Ingredient"
				onChange={handleChange}
				onKeyDown={keyObserver}
				onKeyUp={(e) => {
					if (!e.shiftKey) {
						setShiftPressed(false);
					}
				}}
				value={
					isSubRecipe >= 0
						? formData?.subRecipes?.[isSubRecipe]?.ingredient?.ingredient
						: formData.ingredient.text
				}
				// value={isSubRecipe}
				focused={focusState.ingredient.focus}
				InputLabelProps={{
					focused: focusState.ingredient.focus,
					shrink: (() => {
						if (isSubRecipe >= 0) {
							return Boolean(
								formData?.subRecipes?.[isSubRecipe]?.ingredient?.ingredient
									?.length !== 0
							);
						}
						if (isSubRecipe < 0) {
							return Boolean(formData?.ingredient?.text?.length !== 0);
						}
					})(),
					classes: {
						root: clsx(
							classes.inputLabelRoot,
							focusState.ingredient.focus && classes.inputLabelFocused,
							formData?.ingredient?.text?.length !== 0 &&
								classes.inputLabelWithValue
						),
						required: classes.inputLabelRequired,
					},
				}}
				InputProps={{
					// endAdornment: ingredientAdornment(
					//   formData,
					//   setFormData,
					//   focusState.ingredient.focus,
					//   addIngredient,
					//   name,
					//   shiftPressed,
					//   formData?.ingredient?.text,
					//   hasMenuOpen,
					//   setHasMenuOpen
					// ),
					classes: {
						root: clsx("inputListener", classes.inputroot),
						input: classes.inputRoot,
						focused: classes.inputFocused,
					},
				}}
			/>
			<Typography
				align="center"
				classes={{
					root: clsx(
						classes.typographyRoot,
						focusState.amount.focus && classes.typographyRootFocused,
						focusState.unit.focus && classes.typographyRootFocused
					),
				}}
			>
				How Much?
			</Typography>
			<div className={clsx(classes.unitAndAmountContainer)}>
				<div className={clsx(classes.amountContainer)}>
					<TextField
						name="amount"
						id="recipeIngredientAmountInput"
						label="Amount"
						fullWidth
						onFocus={() => fauxListener("amount", "focus")}
						onBlur={() => fauxListener("amount", "blur")}
						onChange={handleChange}
						value={
							isSubRecipe >= 0
								? formData?.subRecipes?.[isSubRecipe]?.ingredient?.amount
								: formData.ingredient.amount
						}
						focused={focusState.amount.focus}
						InputLabelProps={{
							focused: focusState.amount.focus,
							shrink: Boolean(formData?.ingredient.amount?.length !== 0),
							classes: {
								root: clsx(
									classes.inputLabelRoot,
									focusState.amount.focus && classes.inputLabelFocused,
									formData?.ingredient.amount?.length !== 0 &&
										classes.inputLabelWithValue
								),
								required: classes.inputLabelRequired,
							},
						}}
						inputProps={{
							className: "inputListener",
							pattern: "\\d*",
						}}
						InputProps={{
							classes: {
								root: clsx("inputListener", classes.inputroot),
								input: classes.inputRoot,
								focused: classes.inputFocused,
							},
						}}
						onKeyDown={(e) => {
							let allowed = false;
							let regex = /^\d+$/;
							if (regex.test(e.key) || e.code.slice(0, 3) !== "Key") {
								allowed = true;
							}
							if (!allowed) {
								e.preventDefault();
							}
						}}
					/>
				</div>
				<div className={clsx(classes.unitContainer)}>
					<UnitSelectCompact
						name="unit"
						label="Unit"
						fullWidth
						focusState={focusState}
						setFocusState={setFocusState}
						// Each item id format to send whole object to state
						// `unit-${index}`
						addIngredient={addIngredient}
						focused={focusState.unit.focus}
						InputLabelProps={{
							focused: focusState.unit.focus,
							shrink: Boolean(formData?.ingredient.unit.long?.length !== 0),
							classes: {
								root: clsx(
									classes.inputLabelRoot,
									focusState.unit.focus && classes.inputLabelFocused,
									formData?.ingredient.unit.long?.length !== 0 &&
										classes.inputLabelWithValue
								),
								required: classes.inputLabelRequired,
							},
						}}
						inputProps={{
							className: "inputListener",
						}}
						InputProps={{
							classes: {
								root: clsx("inputListener", classes.inputrootSelect),
								input: classes.inputRoot,
								focused: classes.inputFocused,
							},
						}}
						// onKeyDown={keyObserver}
						onKeyUp={(e) => {
							if (!e.shiftKey) {
								setShiftPressed(false);
							}
						}}
					/>
				</div>
			</div>
			<div className={classes.bottomContainer}>
				<div className={classes.addSecondItemButtonContainer}>
					{addSecondItemButton && (
						<Button
							onClick={handleSubRecipeButtonClick}
							classes={{
								root: clsx(
									classes.addSecondItemButton,
									hasMenuOpen && "hideButtons",
									"addSecondItemButtonAnimate"
								),
								label: clsx(
									classes.addSecondItemButtonLabel,
									hasMenuOpen && "hideButtons"
								),
							}}
						>
							{subRecipeTitleArray.length > 0
								? "Switch Items"
								: "Add Separate Item"}
						</Button>
					)}
				</div>
				<FormControlLabel
					style={{ backgroundColor: "transparent" }}
					classes={{
						label: classes.checkboxLabel,
						root: classes.checkBoxContainer,
					}}
					control={
						<Checkbox
							value={
								isSubRecipe >= 0
									? formData?.subRecipes?.[isSubRecipe]?.ingredient?.optional
									: formData.ingredient.optional
							}
							checked={
								isSubRecipe >= 0
									? formData?.subRecipes?.[isSubRecipe]?.ingredient?.optional
									: formData.ingredient.optional
							}
							name="ingredient"
							onChange={handleChangeBoolean}
							color="primary"
							checkedIcon={<CheckedIcon style={{ color: "#fff" }} />}
							classes={{
								root: classes.checkBoxRoot,
								checked: classes.checkBoxChecked,
								disabled: classes.checkboxDisabled,
							}}
						/>
					}
					label="Optional"
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	alert: state.alert,
	UI: state.UI,
	props: props,
});

const SubRecipeBanner = forwardRef(
	({
		classes,
		isSubRecipe,
		currentTitle,
		thisTitle,
		isIn,
		index,
		latestDirection,
		subRecipeIndex,
	}) => {
		const [_previousIndex, setPreviousIndex] = useState(0);
		const [_latestDirection, set_latestDirection] = useState("right");
		useEffect(() => {
			setPreviousIndex(isSubRecipe);
			set_latestDirection(latestDirection);
		}, [isSubRecipe, latestDirection]);

		return (
			<Slide
				in={isIn}
				direction={latestDirection ? latestDirection : _latestDirection}
			>
				<div
					className={clsx(
						classes.subRecipeTitleTextContainer,
						!isIn && classes.hide
					)}
				>
					<Typography
						variant="h6"
						classes={{
							root: clsx(classes.subRecipeTitleText, `testClass-${index}`),
						}}
					>
						{thisTitle}
					</Typography>
				</div>
			</Slide>
		);
	}
);

const animateTitleEntrance = ({ index }) => {
	let titleDiv = document.getElementById();
};

export default connect(mapStateToProps)(StepTwoFormComponent);
