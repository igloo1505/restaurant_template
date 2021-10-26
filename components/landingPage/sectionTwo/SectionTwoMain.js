/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import WaveBackdrop from "../WaveBackdrop";
import SecondWaveBackdrop from "../SecondWaveBackdrop";

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
		gap: "1rem",
		// border: "5px solid green",
		// height: "100%",
		// width: "100%",
		// overflow: "hidden",
	},
	dividerRoot: {
		color: "#ed7028",
		backgroundColor: "#ed7028",
		height: "2px !important",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	titleText: {
		color: "#fff",
		fontWeight: 500,
		letterSpacing: "0.1em",
		fontSize: "5.5rem",
	},
	subtitleText: {
		color: "#fff",
	},
	waveContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		zIndex: -1,
	},
	subtitleRightTextContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		border: "5px solid #fff",
		borderRadius: "0.5rem",
		width: "100%",
		padding: "1rem",
		boxShadow: "12px 12px 24px #4589d9, -12px -12px 24px #5db9ff",
		background: "linear-gradient(145deg, #57acff, #4991e6)",
	},
	subtitleRightText: {
		color: "#fff",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	containerBodyText: {
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
		gap: "1.5rem",
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
					<div className={classes.subtitleRightTextContainer}>
						<Typography className={classes.subtitleRightText} variant="h5">
							Meet others from around the world and connect on the thing that
							unites us all.
						</Typography>
					</div>
					<div className={classes.subtitleRightTextContainer}>
						<Typography className={classes.subtitleRightText} variant="h5">
							Turn your recipe book into a weekly grocery list, or create a
							special list for recipes you love.
						</Typography>
					</div>
					<div className={classes.subtitleRightTextContainer}>
						<Typography className={classes.subtitleRightText} variant="h5">
							Share recipes, ideas, inspiration and more.
						</Typography>
					</div>
				</div>
			</div>
			<div className={classes.waveContainer}>
				<WaveBackdrop
					// color=""
					additionalStyles={{
						filter: "drop-shadow(-5px 0px 6px #0008 )",
					}}
				/>
				<SecondWaveBackdrop
					color="#0099ff"
					tintLeftColor="#E91E63"
					animId="sectionTwo"
					additionalStyles={{
						filter: "drop-shadow(-5px 0px 6px #0008)",
					}}
				/>
			</div>
		</div>
	);
};

export default SectionTwoMain;
