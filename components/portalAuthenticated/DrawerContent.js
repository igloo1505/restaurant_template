/* eslint-disable react/prop-types */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { useRouter } from "next/router";
import * as Types from "../../stateManagement/TYPES";
import TwoToneBookIcon from "../TwoToneBookIcon";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CategoryIcon from "@material-ui/icons/Category";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	List,
	Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	outerContainer: {},
	listRoot: {},
	listItemRoot: {
		"&:hover": {
			backgroundColor: "rgba(251,	201,	92, 0.3)",
		},
	},
	listItemIconRoot: {
		zIndex: 1,
	},
	listItemRootDisabled: {
		"&:hover": {
			backgroundColor: "rgba(251,	201,	92, 0.1)",
			cursor: "default",
		},
	},
	listItemIconRootDisabled: {
		zIndex: 1,
		"& svg": {
			color: "rgba(235, 96, 16, 0.5)",
		},
	},
	listItemTextPrimary: {
		zIndex: 1,
	},
	listItemTextPrimaryDisabled: {
		zIndex: 1,
		// color: "rgba(235, 96, 16, 0.5)",
		color: theme.palette.grey[500],
	},
	listItemTextRoot: {
		// zIndex: 1,
	},
	listItemTextRootDisabled: {
		// zIndex: 1,
		color: "rgba(235, 96, 16, 0.5)",
	},
}));

const DrawerContent = ({
	UI: {
		viewport: { navHeight, width: deviceWidth },
	},
	user: {
		loggedIn,
		self: { _id: userId },
		userSettings: { allowKeyboardShortcuts },
	},
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const closeDrawer = () => {
		dispatch({ type: Types.CLOSE_DRAWER });
	};
	// * Push down to be level with navbar
	const [heightOffsetStyle, setHeightOffsetStyle] = useState({
		marginTop: `${navHeight}px`,
	});
	useLayoutEffect(() => {
		let style = {
			marginTop: `${navHeight}px`,
		};

		if (navHeight !== 0 && deviceWidth >= 1920 && loggedIn) {
			setHeightOffsetStyle(style);
		}
		if (navHeight === 0 && deviceWidth >= 1920 && loggedIn) {
			setHeightOffsetStyle({ marginTop: "64px" });
		}
		if (deviceWidth < 1920) {
			setHeightOffsetStyle({ marginTop: "0px" });
		}
	}, [navHeight, deviceWidth]);
	const theme = useTheme();
	const classes = useStyles();
	const addRecipeAction = () => {
		router.push("/addRecipe");
		closeDrawer();
	};
	const myRecipeAction = () => {
		// !! Handle redirect
		router.push("/myRecipes");
		closeDrawer();
	};
	// const shortcutAction = () => {

	// }
	let array = [
		{
			text: "Add Recipe",
			action: addRecipeAction,
			icon: <AddCircleIcon color="secondary" fontSize="large" />,
		},
		{
			text: "My Recipes",
			action: myRecipeAction,
			icon: <TwoToneBookIcon color="secondary" fontSize="large" />,
		},
		{
			text: "My Shortcuts",
			action: myRecipeAction,
			icon: <LetterIcon color="secondary" fontSize="large" />,
		},
	];
	return (
		<div className={classes.outerContainer} style={heightOffsetStyle}>
			<Divider />
			<List className={classes.listRoot}>
				{array.map((a) => (
					<ListItemComponent
						item={a}
						classes={classes}
						key={a.text}
						loggedIn={loggedIn}
						userId={userId}
						allowKeyboardShortcuts={allowKeyboardShortcuts}
					/>
				))}
			</List>
			<Divider />
			<List>
				{["All mail", "Trash", "Spam"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon classes={{ root: classes.listItemIconRoot }}>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							primary={text}
							classes={{
								primary: classes.listItemTextPrimary,
								root: classes.listItemTextRoot,
							}}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
	user: state.user,
});

export default connect(mapStateToProps)(DrawerContent);
// {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} above InboxIcon ln 30

const ListItemComponent = ({
	item,
	classes,
	loggedIn,
	userId,
	allowKeyboardShortcuts,
}) => {
	const [disabled, setDisabled] = useState(false);
	let { text, action, icon } = item;
	useEffect(() => {
		let shouldDisable = Boolean(!loggedIn || !userId);
		if (text === "My Shortcuts") {
			shouldDisable = !allowKeyboardShortcuts;
		}
		setDisabled(shouldDisable);
	}, [loggedIn, userId]);
	return (
		<ListItem
			button
			key={text}
			classes={{
				root: clsx(
					classes.listItemRoot,
					disabled && classes.listItemRootDisabled
				),
			}}
			onClick={disabled ? () => {} : action}
		>
			<ListItemIcon
				classes={{
					root: clsx(
						classes.listItemIconRoot,
						disabled && classes.listItemIconRootDisabled
					),
				}}
			>
				{icon}
			</ListItemIcon>
			<ListItemText
				primary={text}
				classes={{
					primary: clsx(
						classes.listItemTextPrimary,
						disabled && classes.listItemTextPrimaryDisabled
					),
					root: clsx(
						classes.listItemTextRoot,
						disabled && classes.listItemTextRootDisabled
					),
				}}
			/>
		</ListItem>
	);
};

const LetterIcon = connect(mapStateToProps)(
	({
		user: {
			userSettings: { allowKeyboardShortcuts },
		},
	}) => {
		const [disabled, setDisabled] = useState(!allowKeyboardShortcuts);
		useEffect(() => {
			setDisabled(!allowKeyboardShortcuts);
			console.log("userSettings disabled: ", disabled);
		}, [allowKeyboardShortcuts]);

		return (
			<div
				style={
					disabled
						? {
								border: "1px solid rgba(235, 96, 16, 0.5)",
								borderRadius: "5px",
						  }
						: {
								border: "1px solid #eb6010",
								backgroundColor: "#eb6010",
								borderRadius: "5px",
						  }
				}
			>
				<Typography
					variant="h5"
					style={
						disabled
							? {
									padding: "0.35rem 0.5rem",
									color: "rgba(235, 96, 16, 0.5)",
									lineHeight: "1",
							  }
							: {
									margin: "0",
									padding: "0.35rem 0.5rem",
									color: "#fff",
									lineHeight: "1",
							  }
					}
				>
					K
				</Typography>
			</div>
		);
	}
);
