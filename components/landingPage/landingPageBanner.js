import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useSpring } from "@react-spring/core";
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkedIcon from "@material-ui/icons/Bookmark";
import NotBookmarkedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import Button from "@material-ui/core/Button";
import ClientSidePortal from "../portalAuthenticated/ClientSidePortal";

const useClasses = makeStyles((theme) => ({
	landingpageBannerContainer: {
		width: "100%",
		height: "fit-content",
		minHeight: "40vh",
		backgroundColor: theme.palette.primary.main,
		padding: "1.5rem",
		borderRadius: "0.6rem",
		// boxShadow: `8px 8px 12px ${theme.palette.grey[400]}, -8px 8px 12px ${theme.palette.grey[300]}`,
		// boxShadow: `8px 8px 12px ${theme.palette.grey[700]}, -8px 8px 12px ${theme.palette.grey[600]}`,
		boxShadow: `12px 12px 24px #c95f22, -12px -12px 24px #ff812e`,
		display: "flex",
		flexDirection: "row",
		gap: "1.5rem",
		[theme.breakpoints.down(1200)]: {
			// position: "relative",
			// position: "static",
			flexDirection: "column",
			width: "85vw",
			justifyContent: "center",
			alignItems: "center",
			height: "fit-content",
			// width: "fit-content",
			padding: "2rem",
		},
	},
	titleTextWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		// width: "min(50%, 800px)",
		gap: "1rem",
		// [theme.breakpoints.up()]: {

		//   },
	},
	entireTextContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		width: "min(50%, 800px)",
		gap: "1rem",
	},
	titleTextMain: {
		color: "#fff",
		fontSize: "6rem",
		lineHeight: "6rem",
		fontWeight: 400,
		position: "relative",
	},
	dotIoTarget: {
		width: "0.25rem",
		height: "0.25rem",
		margin: "0px 0.5rem",
		borderRadius: "50%",
		// backgroundColor: "#fff",
	},
	textUnderline: {
		borderBottom: "2px solid #fff",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.75rem",
	},
	rightDefinitionProunounce: {
		color: "#fff",
		fontStyle: "italic",
		fontSize: "1.2rem",
	},
	bannerRightContainer: {
		padding: "0.75rem",
	},
	bannerRightNarrow: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		marginLeft: "6rem",
		// border: "2px solid red"
		[theme.breakpoints.down(750)]: {
			margin: "0rem",
		},
	},
	rightDefinitionTitleNarrow: {
		// rotate: "90deg",
		// transform: "rotate(270deg)",
		msTransform: "rotateZ(-90deg)",
		webkitTransform: "rotateZ(-90deg)",
		mozTransform: "rotateZ(-90deg)",
		oTransform: "rotateZ(-90deg)",
		transform: "rotateZ(-90deg) translate(-50%, 50%, 0%)",
		height: "fit-content",
		width: "100%",
		position: "absolute",
		bottom: 0,
		left: 0,
		padding: "0.75rem 0.75rem",
		zIndex: 9999,
	},
	rightDefinitionTitleContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		gap: "0",
		lineHeight: 1,
		marginBottom: "1rem",
	},
	rightDefinitionTitle: {
		fontWeight: 500,
		backgroundColor: "#fff",
		width: "100%",
		padding: "0.25rem",
		textAlign: "center",

		color: theme.palette.primary.dark,
		overflow: "visible",
		borderRadius: "4px",
		marginBottom: "1rem",
	},
	rotatedDefinitionTitle: {
		fontWeight: 500,
		backgroundColor: "#FFF",
		width: "100%",
		padding: "0.25rem",
		textAlign: "center",
		// color: "#273c75",
		color: theme.palette.primary.dark,
		borderRadius: "4px",
		marginBottom: "1rem",
	},
	rightDefinitionNoun: {
		color: "#fff",
		fontSize: "1.2rem",
	},
	definitionContainer: {},
	definitionTitle: {
		fontSize: "1.4rem",
		color: "#fff",
		fontWeight: 400,
		margin: "0.75rem",
	},
	definitionMain: {
		fontSize: "1.1rem",
		fontWeight: 400,
		color: "#fff",
		margin: "0.75rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	informal: {
		fontSize: "1.2rem",
		fontWeight: 200,
		color: "#fff",
		margin: "0.75rem 0rem",
		fontStyle: "italic",
		// margin: "0px"
	},
	buttonText: {
		color: "#fff",
		fontWeight: 600,
		letterSpacing: "0.2rem",
		fontSize: "2rem",
		padding: "0.5rem",
		textTransform: "none",
		borderRadius: "8px",
		[theme.breakpoints.down(1200)]: {
			padding: "0.5rem",
			fontSize: "1.5rem",
		},
	},
	buttonTextLogin: {
		color: "#eb6010",
		fontWeight: 600,
		letterSpacing: "0.2rem",
		fontSize: "2rem",
		padding: "0.5rem",
		textTransform: "none",
		borderRadius: "8px",
		[theme.breakpoints.down(1200)]: {
			padding: "0.5rem",
			fontSize: "1.5rem",
		},
	},
}));

const useButtonClasses = makeStyles((theme) => ({
	root: {
		width: "calc(50% - 1rem)",
		margin: "0.5rem",
		height: "100%",
		marginTop: "2rem",
		border: "2px solid #eb6010",
		boxSizing: "border-box",
	},
	loginRoot: {
		width: "calc(50% - 1rem)",
		margin: "0.5rem",
		backgroundColor: "#fff",
		height: "100%",
		marginTop: "2rem",
		border: "2px solid #eb6010",
		boxSizing: "border-box",
	},
	// text: {

	// },
	// loginText: {

	// }
}));

const coverBackground = {
	position: "absolute",
	display: "flex",
	height: "40%",
	width: "100%",
	backgroundColor: "#268AFF",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	top: 0,
};

const landingPageBanner = ({
	UI: {
		viewport: { width: deviceWidth, height: deviceHeight },
	},
	props: { visibleSection },
}) => {
	const classes = useClasses();
	const [anchorToCorner, setAnchorToCorner] = useState(null);

	useEffect(() => {
		let targets = document.getElementsByClassName("i-hover-target");
		console.log("targets: iTargets", targets);
		for (var i = 0; i < targets.length; i++) {
			console.log("Target i iTargets", targets[i]);
		}
	}, []);

	const handleAnchorPoint = (cancel) => {
		let dim = document
			.getElementById("banner-title-narrow")
			?.getBoundingClientRect();
		let textDim = document
			.getElementById("banner-title-narrow-title-text")
			?.getBoundingClientRect();
		// console.log('dim: here ', dim, textDim);
		if (!dim) {
			return;
		}
		// debugger
		let leftOffset = deviceWidth > 900 ? 16 : 24;
		setAnchorToCorner({
			// rotateZ: "270deg"
			// transfo
			msTransform: "rotateZ(-90deg)",
			webkitTransform: "rotateZ(-90deg)",
			mozTransform: "rotateZ(-90deg)",
			oTransform: "rotateZ(-90deg)",
			transform: "rotateZ(-90deg)",
			transformOrigin: "bottom left",
			// rotate: "270deg",
			top: `${dim.bottom - 56}px`,
			left: dim.left - 16,
			overflow: "hidden",
			width: dim.height,
			height: "3.5rem",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			border: "2px solid #227ce6",
			fontSize: "1.8rem",
		});
		if (cancel) {
			setTimeout(() => {
				cancel();
			}, 1000);
		}
		// console.log("dim cancel", cancel)
	};

	useEffect(() => {
		let _int = setInterval(() => handleAnchorPoint(cancelInterval));
		const cancelInterval = () => {
			clearInterval(_int);
		};
	}, [deviceWidth, deviceHeight]);

	const handleSignupClick = (e) => {
		console.log("Did click signup button target");
	};
	const buttonClasses = useButtonClasses();

	return (
		<div className={classes.landingpageBannerContainer}>
			<div className={classes.titleTextWrapper}>
				<div className={classes.entireTextContainer}>
					<div className={classes.textUnderline}>
						{[..."Radish"].map((ch, index) => {
							return (
								<Typography
									variant="h1"
									className={clsx(
										classes.titleTextMain,
										`title-character-${ch}`
									)}
									key={`title-${ch}-${index}`}
								>
									{ch === "i" && (
										<div style={coverBackground}>
											<div
												className="i-hover-target"
												style={{ width: "2px", height: "2px" }}
											></div>
										</div>
									)}
									{ch}
								</Typography>
							);
						})}
					</div>
					{deviceWidth > 1200 ? (
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirecton: "column",
								justifyContent: "center",
								alignItems: "flex-end",
							}}
						>
							<div className={classes.dotIoTarget} id="dot-io-target"></div>
						</div>
					) : (
						<div
							className="i-hover-target white"
							style={{ width: "2px", height: "2px", backgroundColor: "green" }}
						></div>
					)}
					<div className={classes.textUnderline}>
						<Typography variant="h1" className={classes.titleTextMain}>
							<div style={coverBackground}>
								<div
									className="i-hover-target"
									style={{ width: "2px", height: "2px" }}
								></div>
							</div>
							i
						</Typography>
						<Typography variant="h1" className={classes.titleTextMain}>
							o
						</Typography>
					</div>
				</div>
			</div>
			<div
				className={clsx(
					classes.bannerRightContainer,
					deviceWidth < 1200 && classes.bannerRightNarrow
				)}
			>
				{deviceWidth <= 1200 && deviceWidth >= 750 && visibleSection === 1 && (
					<ClientSidePortal selector="#topLevelPortalContainer">
						<Typography
							variant="h1"
							className={clsx(
								classes.rightDefinitionTitle,
								deviceWidth < 1200 && classes.rightDefinitionTitleNarrow
							)}
							style={{ ...anchorToCorner }}
							id="banner-title-narrow-title-text"
						>
							Radish
						</Typography>
					</ClientSidePortal>
				)}
				<div className={classes.dictionaryContent} id="banner-title-narrow">
					<div className={classes.rightDefinitionTitleContainer}>
						{deviceWidth > 1200 && (
							<Typography variant="h1" className={classes.rightDefinitionTitle}>
								Radish
							</Typography>
						)}
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "flex-start",
								width: "100%",
								gap: "0.75rem",
							}}
						>
							<Typography variant="h1" className={classes.rightDefinitionNoun}>
								noun, adjective
							</Typography>
							<Typography variant="h1" className={classes.rightDefinitionNoun}>
								|
							</Typography>
							<Typography
								variant="h1"
								className={classes.rightDefinitionProunounce}
							>
								rad~ish
							</Typography>
						</div>
					</div>
					<div className={classes.definitionContainer}>
						<Typography variant="h1" className={classes.definitionTitle}>
							Definition
						</Typography>
						<Typography variant="h1" className={classes.definitionMain}>
							<span className={classes.informal}>informal</span>
							The state of being kind of awesome. Usually in the presence of
							friends.
						</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								height: "fit-content",
							}}
						>
							<Typography
								variant="h1"
								className={classes.definitionMain}
								style={{
									flexDirection: "row",
									alignItems: "center",
									margin: "0px",
								}}
							>
								<Typography
									variant="h1"
									className={classes.informal}
									style={{ margin: "0.75rem" }}
								>
									also:
								</Typography>
								a plant that produces radishes.
							</Typography>
						</div>
					</div>
				</div>
				<div>
					<Button
						variant="contained"
						color="secondary"
						classes={{ root: buttonClasses.root }}
						onClick={handleSignupClick}
						id="landingPage-banner-signupButton"
					>
						<Typography variant="h1" className={classes.buttonText}>
							Sign up
						</Typography>
					</Button>
					<Button
						variant="contained"
						color="secondary"
						classes={{ root: buttonClasses.loginRoot }}
						onClick={handleSignupClick}
						id="landingPage-banner-loginButton"
					>
						<Typography variant="h1" className={classes.buttonTextLogin} i>
							Login
						</Typography>
					</Button>
				</div>
				<div
					id="hover-bottom-landing-page-target"
					style={{
						position: "absolute",
						bottom: "-2rem",
						left: "-3rem",
						width: "2px",
						height: "2px",
						backgroundColor: "pink",
					}}
				></div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	UI: state.UI,
	props: props,
});

export default connect(mapStateToProps)(landingPageBanner);
