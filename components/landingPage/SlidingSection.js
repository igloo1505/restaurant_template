/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

const drawerWidth = 240;

const useClasses = makeStyles((theme) => ({
	root: {
		display: "block",
		width: "100vw",
		// paddingRight: marginHorizontal,
		// paddingLeft: marginHorizontal,
		// paddingTop: marginVertical,
		border: "2px solid red",
		transition: theme.transitions.create(["margin-left", "width"], {
			duration: 500,
		}),
		overflowY: "auto",
		[theme.breakpoints.down("lg")]: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	},
	shifted: {
		width: `calc(100vw - ${drawerWidth}px)`,
		display: "block",
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin-left", "width"], {
			duration: 500,
		}),
		overflowX: "hidden",
	},
}));

const SlidingSection = ({
	props: { thisIndex, currentIndex },
	UI: {
		mainDrawer: { open: drawerIsOpen },
		viewport: { navHeight, width: deviceWidth },
	},
	children,
}) => {
	const classes = useClasses();
	const getStyles = () => {
		let _navHeight = navHeight === 0 ? 64 : navHeight;
		let _styles = {
			height: `calc(100vh - ${_navHeight}px)`,
		};
		if (_navHeight >= 0) {
			_styles.marginTop = `${_navHeight}px`;
		}
		if (_navHeight === 0) {
			_styles.marginTop = "64px";
		}
		setStyles({
			..._styles,
		});
	};
	const [shifted, setShifted] = useState(deviceWidth > 1920);
	const [styles, setStyles] = useState({
		marginTop: "64px",
	});
	useEffect(() => {
		let shouldShift = drawerIsOpen
			? drawerIsOpen
			: deviceWidth > 1920
			? true
			: false;
		setShifted(shouldShift);
		getStyles();
	}, [drawerIsOpen, navHeight, deviceWidth]);
	return (
		<div
			className={clsx(classes.root, shifted && classes.shifted)}
			style={styles}
		>
			{children}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(SlidingSection);
