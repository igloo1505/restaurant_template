/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

const RightColumnWidth = "40%";

const useClasses = makeStyles((theme) => ({
	outermostContainer: {
		height: "100%",
		width: "100%",
		minHeight: "100%",
		minWidth: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		border: "5px solid green",
		// height: "100%",
		// width: "100%",
		// overflow: "hidden",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		color: "#fff",
	},
	subtitleText: {
		color: "#fff",
	},
	containerRight: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		minHeight: "100%",
		width: `${RightColumnWidth}`,
		float: "right",
		border: "5px solid white",
	},
	bottomRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
	},
}));

const SectionTwoMain = () => {
	const classes = useClasses();
	return (
		<div className={classes.outermostContainer}>
			<div className={classes.titleContainer}>
				<Typography className={classes.titleText} variant="h1">
					Rad~ish
				</Typography>
				<Typography className={classes.subtitleText} variant="h4">
					The social network to unite.
				</Typography>
			</div>
			<div className={classes.bottomRow}>
				<div className={classes.containerRight}>
					<Typography className={classes.subtitleText} variant="h5">
						Section two title
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default SectionTwoMain;
