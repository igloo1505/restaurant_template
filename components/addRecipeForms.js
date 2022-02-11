/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../stateManagement/TYPES";
import UnitSelectDestructured from "./UnitSelectDestructured";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// RESUME: check

const useStyles = makeStyles((theme) => ({
	textFieldRoot: {
		minWidth: "100%",
		alignSelf: "stretch",
		// color: "#fff",
		"& > div": {
			minWidth: "100%",
			width: "100%",
		},
	},
	servingTextfieldRoot: {
		minWidth: "100px",
		alignSelf: "stretch",
		// color: "#fff",
		"& > div": {
			minWidth: "100%",
			width: "100%",
		},
	},
	textFieldWrapper: {
		padding: "0px 0px 5px 0px",
	},
	textFieldWrapperFocused: {},
	textFieldWrapperShrunk: {},
	inputRoot: {
		color: "#fff",
		paddingLeft: "7px",
		paddingRight: "7px",
		zIndex: 999,
		"&:before": {
			// border: "1px solid green",
			borderBottom: "1px solid #fff",
		},
	},
	gridItemTitle: {
		width: "240px",
	},
	gridItemServing: {
		width: "120px",
	},
	inputroot: {
		color: "#fff",
		border: `2px solid ${theme.palette.secondary.main}`,
		transition: "border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"&:before": {
			borderBottom: "1px solid #fff",
		},
		"&:hover:not(.Mui-disabled):before": {
			// Underline when hovered
			borderBottom: "2px solid #fff",
		},
		"&:after": {
			// borderBottom: `1px solid ${theme.palette.secondary.light}`,
		},
	},
	descriptionInputRoot: {
		// padding: "8px 2px 9px 2px", paddingBottom: "9px",
		border: `2px solid ${theme.palette.secondary.main}`,
		transition: "border 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		"&:before": {
			borderBottom: "1px solid #fff",
		},
		"&:after": {},
		"&:hover:not(.Mui-disabled):before": {
			borderBottom: "2px solid #fff",
		},
	},
	descriptionInputFocused: {
		"&::before": {
			background:
				"linear-gradient(145deg, #d4560e 0%, #eb6010 7%, #eb6010 80%, #fb6711 100%) !impo" +
				"rtant",
		},
	},
	inputFocused: {
		color: "#fff",
		boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
		border: `2px solid ${theme.palette.primary.main}`,
		transition: theme.transitions.create(["box-shadow", "border"], {
			duration: 250,
		}),
		"&:hover": {
			border: `2px solid ${theme.palette.primary.light}`,
		},
		"&:hover:not(.Mui-disabled):before": {
			borderBottom: "none",
		},
		"&::before": {
			borderBottom: "none",
			content: '""',
			position: "absolute",
			// background: "linear-gradient(145deg, #d4560e, #fb6711)", background:
			// "linear-gradient(145deg, rgba(212,86,14,1) 0%, rgba(251,103,17,1) 17%)",
			background:
				"linear-gradient(145deg, #d4560e 0%, #eb6010 5%, #eb6010 75%, #fb6711 100%)",
			height: "calc(100% - 0px)",
			width: "calc(100% - 0px)",
			boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
			// borderRadius: "4px", background: theme.palette.secondary.main, zIndex: -999,
			// boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12", transition:
			// theme.transitions.create(   ["box-shadow", "transform", "border"],   {
			// duration: 250,   } ),
		},
		"&:after": {
			borderBottom: "none",
			width: "calc(100% - 12px)",
			marginLeft: "4px",
			// borderBottom: `2px solid ${theme.palette.primary.light}`,
		},
	},
	inputLabelRoot: {
		color: "#e0e0e0",
		zIndex: 999,
	},
	inputLabelWithValue: {
		color: "#fff",
		// transform: "translate(2px, 2px)"
		transform: "translate(2px, 0px) !important",
		fontSize: "0.7rem",
		"&.Mui-focused": {
			// boxShadow: "2px 0px 2px #cf540e, -2px -2px 2px #ff6c12", padding: "0px 3px
			// 3px 3px",
		},
	},
	descriptionLabelRoot: {
		transform: "translate(10px, 34px)",
		color: "#e0e0e0",
		transition: theme.transitions.create(["box-shadow", "transform"], {
			duration: 250,
		}),
	},
	descriptionInputLabelFocused: {
		transform: "translate(2px, -5px)",
		fontSize: "0.7rem",
		color: "#fff !important",
		zIndex: 100,
		// "&.Mui-focused": { boxShadow: "2px 0px 2px #cf540e, -2px -2px 2px #ff6c12",
		// padding: "0px 3px 3px 3px", },
	},
	inputLabelRequired: {},
	topRow: {
		display: "flex",
		flexDirection: "row",
		gap: "0.75rem",
	},
	inputLabelFocused: {
		color: "#fff !important",
		transform: "translate(10px, 27px)",
	},
	descriptionInputInput: {
		color: "#fff",
		padding: "5px 8px 8px",
		zIndex: 999,
	},

	gridRoot: {
		gap: "0.75rem",
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.down(1150)]: {
			gap: "0.75rem",
		},
		[theme.breakpoints.down(600)]: {
			padding: "0px 0.75rem 1rem 0.75rem",
		},
	},
	gridItemRoot: {},
	promptText: {
		marginBottom: "1.3rem",
		marginTop: "1.3rem",
		[theme.breakpoints.down(600)]: {},
	},
}));

const StepOneFormComponent = ({
	props: { handleFormChange, placeHolder, setPlaceHolder },
	UI: {
		addRecipe: { activeStep, formData },
	},
}) => {
	const titleInputRef = useRef();
	const dispatch = useDispatch();
	const classes = useStyles();

	const setFormData = (newFormData) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_FORM_DATA,
			payload: newFormData,
		});
	};
	useEffect(() => {
		if (activeStep === 0) {
			titleInputRef.current.focus();
		}
	}, [activeStep]);
	const initialFocusState = {
		title: {
			focus: false,
			shrink: Boolean(formData?.title?.length !== 0),
		},
		servings: {
			focus: false,
			shrink: Boolean(formData?.servings?.length !== 0),
		},
		description: {
			focus: false,
			shrink: Boolean(formData?.description?.length !== 0),
		},
	};
	const [focusState, setFocusState] = useState(initialFocusState);
	const [shouldShrinkDescription, setShouldShrinkDescription] = useState(true);
	useEffect(() => {
		console.log("formData: ", formData.description);
		let shouldShrink = Boolean(formData?.description?.length !== 0);
		setShouldShrinkDescription(shouldShrink);
		setPlaceHolder(!shouldShrink);
	}, []);
	const fauxListener = (title, type) => {
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
	};
	const allowKeys = [
		"Backspace",
		"ArrowLeft",
		"ArrowRight",
		"ArrowUp",
		"ArrowDown",
		"Tab",
	];
	useEffect(() => {
		setFocusState({
			...focusState,
			title: {
				...focusState.title,
				focus: true,
			},
		});
	}, []);

	return (
		<Fragment>
			<Typography
				variant="h6"
				gutterBottom
				style={{
					color: "#fff",
				}}
				classes={{ root: classes.promptText }}
			>
				Let's get some information about your recipe!
			</Typography>
			<div
				container
				spacing={3}
				className={clsx(classes.gridRoot, "addRecipeFormContainer")}
			>
				<div className={classes.topRow}>
					<div className={classes.gridItemTitle}>
						<div
							className={clsx(
								classes.textFieldWrapper,
								focusState?.title?.focus && classes.textFieldWrapperFocused,
								Boolean(formData?.title?.length !== 0) &&
									classes.textFieldWrapperShrunk
							)}
						>
							<TextField
								id="recipeTitleInput"
								name="title"
								onFocus={() => fauxListener("title", "focus")}
								onBlur={() => fauxListener("title", "blur")}
								fullWidth
								autoFocus
								multiline
								inputRef={titleInputRef}
								label="Recipe's title "
								onChange={handleFormChange}
								value={formData?.title}
								onKeyDown={(e) => {
									if (
										e.target.value.length > 80 &&
										!allowKeys.includes(e.key)
									) {
										e.preventDefault();
									}
								}}
								focused={focusState.title.focus}
								InputLabelProps={{
									focused: focusState.title.focus,
									shrink: Boolean(formData?.title?.length !== 0),
									classes: {
										root: clsx(
											classes.inputLabelRoot,
											focusState.title.focus && classes.inputLabelFocused,
											formData?.title?.length !== 0 &&
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
										root: clsx("inputListener", classes.inputroot),
										input: classes.inputRoot,
										focused: classes.inputFocused,
									},
								}}
								classes={{
									root: classes.textFieldRoot,
								}}
							/>
						</div>
					</div>
					<div className={classes.gridItemServing}>
						<TextField
							id="recipeServingInput"
							name="servings"
							onFocus={() => fauxListener("servings", "focus")}
							onBlur={() => fauxListener("servings", "blur")}
							type="number"
							fullWidth
							label="Servings"
							onChange={handleFormChange}
							inputProps={{
								className: "inputListener",
								pattern: "\\d*",
							}}
							onKeyDown={(e) => {
								// All of this to avoid Safari's shadow user agent
								let allowed = false;
								let regex = /^\d+$/;
								if (regex.test(e.key) || e.code.slice(0, 3) !== "Key") {
									allowed = true;
								}
								if (!allowed) {
									e.preventDefault();
								}
							}}
							value={formData?.servings}
							classes={{
								root: classes.servingTextfieldRoot,
							}}
							InputLabelProps={{
								focused: focusState.servings.focus,
								shrink: Boolean(formData?.servings?.length !== 0),
								classes: {
									root: clsx(
										classes.inputLabelRoot,
										focusState.servings.focus && classes.inputLabelFocused,
										formData?.servings?.length !== 0 &&
											classes.inputLabelWithValue
									),
									required: classes.inputLabelRequired,
								},
							}}
							InputProps={{
								classes: {
									root: clsx("inputListener", classes.inputroot),
									input: classes.inputRoot,
									focused: classes.inputFocused,
								},
							}}
						/>
					</div>
					<div className={classes.gridItemUnit}>
						<UnitSelectDestructured
							handleFormChange={handleFormChange}
							focusState={focusState}
							formData={formData}
							setFormData={setFormData}
							classes={classes}
						/>
					</div>
				</div>
				<div className={classes.gridItemDescription}>
					<TextField // required
						id="recipeDescriptionInput"
						name="description"
						onFocus={() => fauxListener("description", "focus")}
						onBlur={() => fauxListener("description", "blur")}
						label="Tell people about it!"
						{...(placeHolder && {
							placeholder:
								"Here's your chance to tell people about the deliciousness in detail.",
						})}
						fullWidth
						multiline
						onChange={handleFormChange}
						onFocus={() => {
							fauxListener("description", "focus");
							setPlaceHolder(true);
							setShouldShrinkDescription(true);
						}}
						onBlur={() => {
							if (formData?.description === "") {
								fauxListener("description", "blur");
								setPlaceHolder(true);
								setShouldShrinkDescription(false);
							}
						}}
						value={formData?.description}
						classes={{
							root: classes.textFieldRoot,
						}}
						InputLabelProps={{
							focused: focusState.description.focus,
							shrink: shouldShrinkDescription,
							classes: {
								root: clsx(
									classes.descriptionLabelRoot,
									shouldShrinkDescription &&
										classes.descriptionInputLabelFocused
								),
								required: classes.inputLabelRequired,
							},
						}}
						InputProps={{
							classes: {
								root: clsx("inputListener", classes.descriptionInputRoot),
								input: classes.descriptionInputInput,
								focused: clsx(
									classes.inputFocused,
									classes.descriptionInputFocused
								),
							},
						}}
						inputProps={{
							className: "inputListener",
						}}
					/>
					<style jsx>
						{`
							input[type=number]: {
								-webkit-appearance: none;
								-moz-appearance: none;
							}
							::-webkit-textfield-decoration-container: {
								content: none;
							}
						`}
					</style>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state, props) => ({
	network: state.network,
	user: state.user,
	UI: state.UI,
	props: props,
});

export const StepOneForm = connect(mapStateToProps)(StepOneFormComponent);
