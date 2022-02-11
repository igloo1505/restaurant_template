import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import { getFormattedTime } from "../../util/getFormattedTime";
import IconButton from "@material-ui/core/IconButton";
import TimerIcon from "@material-ui/icons/Timer";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const descriptionMax = 200;

const useClasses = makeStyles((theme) => ({
	recipeCardOuterContainer: {
		width: "100%",
		height: "fit-content",
		padding: "0.75rem",
		borderRadius: "4px",
		border: "1px solid #ffa157",
		// backgroundColor: theme.palette.secondary.light,
		background: "linear-gradient(145deg, #fe782b, #d56524)",
		transition: theme.transitions.create(["box-shadow"], {
			duration: 500,
		}),
	},
	titleContainer: {
		textTransform: "capitalize",
		"& > *": {
			color: "#ffff",
		},
	},
	addBoxShadow: {
		boxShadow: `8px 8px 14px ${theme.palette.grey[400]}, -8px 8px 14px ${theme.palette.grey[300]}`,
		"&:hover": {
			boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
			cursor: "pointer",
		},
	},
	topWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	timeContainer: {
		display: "flex",
		flexDirection: "row",
		transform: "translate(6px, -6px)",
		"& > * ": {
			color: "#fff",
		},
	},
	timerIconRoot: {
		height: "1rem",
		width: "1rem",
		transform: "translateY(4px)",
		marginRight: "0.25rem",
	},
	descriptionWrapper: {
		width: "auto",
		height: "auto",
		"& > *": {
			color: "#fff",
		},
	},
}));

const publicProfileRecipeCardNoImage = ({ recipe, index }) => {
	const formattedTime = getFormattedTime(recipe);
	const {
		_id,
		title,
		time,
		description,
		servings: { unit: servingUnit, amount: servingAmount },
	} = recipe;
	const classes = useClasses();
	const router = useRouter();
	const [addBoxShadow, setAddBoxShadow] = useState(false);
	const trimDescription = (desc) => {
		if (desc.length < descriptionMax) {
			return desc;
		}
		if (desc.length >= descriptionMax) {
			return `${desc.slice(0, descriptionMax - 3)}...`;
		}
	};
	useEffect(() => {
		let offset = 500 + index * 200;
		setTimeout(() => {
			setAddBoxShadow(true);
		}, offset);
	}, []);

	const redirectToRecipe = () => {
		router.push(`/recipeDetails/${_id}`);
	};
	return (
		<div
			className={clsx(
				"userCreatedRecipeCard",
				classes.recipeCardOuterContainer,
				addBoxShadow && classes.addBoxShadow
			)}
			onClick={redirectToRecipe}
		>
			<div className={classes.topWrapper}>
				<div className={classes.titleContainer}>
					<Typography variant="h6">{title}</Typography>
				</div>
				{formattedTime && (
					<TimeToolTip formattedTime={formattedTime} time={time}>
						<div className={classes.timeContainer}>
							<TimerIcon classes={{ root: classes.timerIconRoot }} />
							{formattedTime?.hours && (
								<Typography classes={{ root: classes.hoursText }}>
									{formattedTime.hours}
								</Typography>
							)}
							{formattedTime?.minutes && (
								<Typography
									variant="caption"
									classes={{ root: classes.minutesText }}
								>
									<Fragment>{formattedTime?.hours && ":"}</Fragment>
									{formattedTime.minutes}
									<Fragment>{!formattedTime?.hours && " mins"}</Fragment>
								</Typography>
							)}
						</div>
					</TimeToolTip>
				)}
			</div>
			<div className={classes.descriptionWrapper}>
				<Typography variant="body2">{trimDescription(description)}</Typography>
			</div>
		</div>
	);
};

export default publicProfileRecipeCardNoImage;

const useToolTipClasses = makeStyles((theme) => ({
	toolTip: {
		backgroundColor: theme.palette.primary.dark,
		color: "#fff",
		fontSize: 11,
		boxShadow: `10px 10px 14px ${theme.palette.grey[500]}, -10px 10px 14px ${theme.palette.grey[400]}`,
	},
}));

const TimeToolTip = (props) => {
	const classes = useToolTipClasses();
	return (
		<Tooltip
			classes={{ tooltip: classes.toolTip }}
			placement="right-end"
			arrow
			title={
				<div className={classes.toolTipTitleContainer}>
					{props?.time?.prepTime && (
						<div className={classes.toolTipTitleContainer}>
							Prep Time: {props.time.prepTime} mins
						</div>
					)}
					{props?.time?.cookTime && (
						<div className={classes.toolTipTitleContainer}>
							Cook Time: {props.time.cookTime} mins
						</div>
					)}
				</div>
			}
		>
			{props.children}
		</Tooltip>
	);
};
