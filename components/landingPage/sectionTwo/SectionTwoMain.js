/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import WaveBackdrop from "../WaveBackdrop";
import SecondWaveBackdrop from "../SecondWaveBackdrop";
import gsap from "gsap";

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

const SectionTwoMain = ({ visibleSection }) => {
	const classes = useClasses();
	useEffect(() => {
		if (visibleSection !== 2) {
			resetBulletins();
		}
		if (visibleSection === 2) {
			animateEntrance();
		}
	}, [visibleSection]);
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
					<Bulletin>
						Meet others from around the world and connect on the thing that
						unites us all.
					</Bulletin>
					<Bulletin>
						Turn your recipe book into a weekly grocery list, or create a
						special list for recipes you love.
					</Bulletin>
					<Bulletin>Share recipes, ideas, inspiration and more.</Bulletin>
				</div>
			</div>
			<div className={classes.waveContainer}>
				<WaveBackdrop
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

const useBulletinClasses = makeStyles((theme) => ({
	subtitleRightTextContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		border: "1px solid #fffa",
		borderRadius: "0.5rem",
		width: "100%",
		padding: "1rem",
		// boxShadow: "12px 12px 24px #4589d9, -12px -12px 24px #5db9ff",
		// background: "linear-gradient(145deg, #2485f6, #1f70cf)",
	},
	subtitleRightText: {
		color: "#fff",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const Bulletin = ({ children }) => {
	const classes = useBulletinClasses();
	return (
		<div
			className={clsx(classes.subtitleRightTextContainer, "bulletin-container")}
		>
			<Typography className={classes.subtitleRightText} variant="h5">
				{children}
			</Typography>
		</div>
	);
};

const resetBulletins = () => {
	gsap.to(".bulletin-container", {
		boxShadow: "0px 0px 0px #0008",
		background: "#2485f6",
		// padding: "1px",
	});
};

const animateEntrance = () => {
	setTimeout(() => {
		gsap.fromTo(
			".bulletin-container",
			{
				boxShadow: "0px 0px 0px #0008",
				background: "#1f70cf",
				border: "none",
				// padding: "1px",
				stagger: 0.1,
				ease: "elastic.out(1.7, 0.5)",
				duration: 1.5,
			},
			{
				boxShadow: "8px 8px 12px #4589d9, -8px -8px 12px #5db9ff",
				border: "1px solid #fffa",
				// padding: "0px",
				background: "linear-gradient(145deg, #2485f6, #1f70cf)",
				ease: "elastic.out(1.7, 0.5)",
				stagger: 0.1,
				duration: 1.5,
			}
		);
	}, 500);
};
