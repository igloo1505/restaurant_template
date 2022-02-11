import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { connect, useDispatch } from "react-redux";
import NotWhatThisWasIntendedForButItsMoreVisible from "@material-ui/icons/Exposure";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import { PrimaryTooltip } from "./tooltip";
import Grow from "@material-ui/core/Grow";
import DisplayItemContent from "./DisplayItemContent";
import { getParsedValue } from "../util/appWideData";

// TODO fix issue where all objects with index > than removed ingredient in array go through boxShadow animation when removeItem(e)

const useItemStyles = makeStyles((theme) => ({
	itemWrapperInner: {
		width: "calc(100% - 8px)",
		height: "calc(100% - 8px)",
		padding: "0.5rem 0.75rem",
		display: "flex",
		margin: "2px 4px",
		boxShadow: "3px 3px 6px #cc540e, -3px -3px 6px #ff6c12",
		transform: "scaleX(0)",
		// border: "1px solid blue",
		// "&::before": {
		//   content: '""',
		//   position: "absolute",
		//   height: "calc(100% - 4px)",
		//   width: "calc(100% - 4px)",
		//   // borderRadius: "50%",
		//   // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
		//   boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
		//   transition: theme.transitions.create(
		//     ["box-shadow", "transform", "background-color"],
		//     {
		//       duration: 500,
		//     }
		//   ),
		// },
	},
	itemWrapperInnerShifted: { transform: "scaleX(1)" },
	badWayToGetRidOfBug: {
		transform: "scaleX(1) !important",
	},
	fullWidthLi: {
		width: "100%",
	},
	itemWrapperOuter: {
		// border: "1px solid red",
		// boxShadow: "5px 5px 8px #cc540e,-5px -5px 8px #ff6c12",
		padding: "1px 0px",
		zIndex: 999,
		marginBottom: "7px",
		height: "fit-content",
		minWidth: "50%",
		// minWidth: "150px",
		transition: theme.transitions.create(["box-shadow"], {
			duration: 500,
		}),
		// overflowY: "auto",
		"&.addBoxShadow": {
			boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
			transition: theme.transitions.create(["box-shadow"], {
				duration: 500,
			}),
		},
	},
	text: {
		padding: "4px 6px",
		color: "#fff",
		width: "100%",
	},
	textyText: {
		display: "block",
		overflowWrap: "break-word",
	},
	"text-subtitle": {
		fontWeight: 400,
		fontSize: "0.75rem",
		lineHeight: 1.66,
		letterSpacing: "0.03333em",
	},
	optionalText: {
		color: "#e0e0e0",
		fontSize: "0.7rem",
		float: "right",
		height: "fit-content",
		// width: "100%",
	},
	icon: { display: "flex", alignItems: "center" },
	iconRoot: {
		color: "#fff",
		width: "14px",
		height: "14px",
		padding: "2px",
		marginRight: "8px",
		transition: theme.transitions.create(["box-shadow"], {
			duration: 500,
		}),
		"&.addBoxShadow": {
			boxShadow: "2px 2px 4px #cc540e, -2px -2px 4px #ff6c12",
			transition: theme.transitions.create(["box-shadow"], {
				duration: 500,
			}),
			"&:hover": {
				cursor: "pointer",
				boxShadow: "0px 0px 6px #eb6010, -0px -0px 6px #eb6010",
				transition: theme.transitions.create(["box-shadow"], {
					duration: 500,
				}),
			},
		},
	},
	toolTip: {
		backgroundColor: theme.palette.common.white,
		color: "rgba(0, 0, 0, 0.87)",
		boxShadow: theme.shadows[1],
		fontSize: 11,
	},
}));

const superInefficientlyAvoidRepaint = (text, name, index) => {
	let storedData = localStorage.getItem(name);
	if (!storedData) {
		localStorage.setItem(name, JSON.stringify({ [index]: text }));
		return true;
	}
	if (storedData) {
		storedData = JSON.parse(storedData);

		if (Object.values(storedData).indexOf(text) === -1) {
			// storedData[index] = text
			localStorage.setItem(
				name,
				JSON.stringify({ ...storedData, [index]: text })
			);
			return true;
		}
		return false;
	}
	return false;
};

const DisplayItem = ({
	props: { item, text, removeItem, name, index },
	UI: {
		addRecipe: { formData, activeStep },
	},
	alert: {
		subRecipe: { isSubRecipe },
	},
}) => {
	let isInitial = superInefficientlyAvoidRepaint(text, name, index);
	const classes = useItemStyles();
	const [shifted, setShifted] = useState(!isInitial);
	const [makeFullHeight, setMakeFullHeight] = useState(false);
	const [shouldBeFullWidth, setShouldBeFullWidth] = useState(false);
	useEffect(() => {
		let _shouldBeFullWidth = false;
		if (activeStep !== 1) {
			return setShouldBeFullWidth(true);
		}
		if (isSubRecipe >= 0) {
			_shouldBeFullWidth =
				formData.subRecipes[isSubRecipe].ingredients.length <= 5;
		}
		if (isSubRecipe < 0) {
			_shouldBeFullWidth = formData.ingredients.length <= 5;
		}
		let oddLength =
			isSubRecipe >= 0
				? formData?.subRecipes?.[isSubRecipe]?.ingredients?.length % 2 === 1
				: formData?.ingredients?.length % 2 === 1;
		if (
			index === formData.subRecipes?.[isSubRecipe]?.ingredients?.length - 1 &&
			oddLength
		) {
			_shouldBeFullWidth = true;
		}
		if (
			isSubRecipe === -1 &&
			index === formData?.ingredients?.length - 1 &&
			oddLength
		) {
			console.log("index: ", index);
			_shouldBeFullWidth = true;
		}
		console.log("_shouldBeFullWidth: ", _shouldBeFullWidth);
		setShouldBeFullWidth(_shouldBeFullWidth);
	}, [isSubRecipe, formData]);

	useEffect(() => {
		setTimeout(() => setShifted(true), 250);
	}, []);
	if (isInitial) {
		return (
			<div
				className={clsx(
					classes.itemWrapperOuter,
					shifted && "addBoxShadow",
					true && "formDisplayItem",
					shouldBeFullWidth && classes.fullWidthLi
				)}
				// onClick={() => }
			>
				<div
					className={clsx(
						classes.itemWrapperInner,
						shifted && classes.itemWrapperInnerShifted
					)}
				>
					<div className={clsx(classes.icon, shifted && "addBoxShadow")}>
						<CloseIcon
							classes={{
								root: clsx(classes.iconRoot, shifted && "addBoxShadow"),
							}}
							fontSize="small"
							onClick={(e) => removeItem(e, item, text)}
						/>
					</div>
					<DisplayItemContent
						item={item}
						text={text}
						removeItem={removeItem}
						name={name}
						classes={classes}
					/>
					{item?.optional && (
						<PrimaryTooltip title="Optional">
							<div className={classes.optionalText}>
								<NotWhatThisWasIntendedForButItsMoreVisible />
							</div>
						</PrimaryTooltip>
					)}
				</div>
			</div>
		);
	}
	if (!isInitial) {
		return (
			<div
				className={clsx(
					classes.itemWrapperOuter,
					true && "formDisplayItem",
					shifted && "addBoxShadow",
					shouldBeFullWidth && classes.fullWidthLi
				)}
			>
				<div
					className={clsx(
						classes.itemWrapperInner,
						shifted && classes.itemWrapperInnerShifted
					)}
				>
					<div className={clsx(classes.icon, shifted && "addBoxShadow")}>
						<CloseIcon
							classes={{
								root: clsx(classes.iconRoot, shifted && "addBoxShadow"),
							}}
							fontSize="small"
							onClick={(e) => removeItem(e, item, text)}
						/>
					</div>
					<DisplayItemContent
						item={item}
						text={text}
						removeItem={removeItem}
						name={name}
						classes={classes}
					/>
					{item?.optional && (
						<PrimaryTooltip title="Optional">
							<div className={classes.optionalText}>
								<NotWhatThisWasIntendedForButItsMoreVisible />
							</div>
						</PrimaryTooltip>
					)}
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	alert: state.alert,
	props: props,
});

export default connect(mapStateToProps)(DisplayItem);
