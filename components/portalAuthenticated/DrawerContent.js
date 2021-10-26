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
			icon: <TwoToneBookIcon color="secondary" fontSize="large" />,
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

const ListItemComponent = ({ item, classes, loggedIn, userId }) => {
	const [disabled, setDisabled] = useState(false);
	useEffect(() => {
		let shouldDisable = Boolean(loggedIn && userId);
		setDisabled(!shouldDisable);
	}, [loggedIn, userId]);
	let { text, action, icon } = item;
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
			onClick={action}
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
