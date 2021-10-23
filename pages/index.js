/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { tryAutoLogin } from "../stateManagement/userActions";
import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import {
	UnderNavbar,
	AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import LandingPageBanner from "../components/landingPage/landingPageBanner";
import SlidingSection from "../components/landingPage/SlidingSection";
import SectionTwoMain from "../components/landingPage/sectionTwo/SectionTwoMain";
import { gsap } from "gsap";
import clsx from "clsx";
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import dynamic from "next/dynamic";
import { to, useSpring } from "@react-spring/core";
const MainCanvas = dynamic(
	() => import("../components/landingPage/MainCanvas"),
	{
		ssr: false,
	}
);

const useClasses = makeStyles((theme) => ({
	mainCanvasContainer: {
		width: "100%",
		height: "calc(100vh - 64px)",
		minHeight: "calc(100vh - 64px)",
		maxHeight: "fit-content",
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "transparent",
		// top: "64px",
		// border: "5px solid blue",
		// backgroundColor: "#51a1ff"
	},
	container: {
		maxWidth: "1280px",
		// marginLeft: "50%",

		// transform: "translateX(-50%)"
	},
}));

const mapStateToProps = (state, props) => ({
	viewport: state.UI.viewport,
	user: state.user,
	network: state.network,
	props: props,
});

const Home = connect(mapStateToProps)(
	({
		viewport: { width: deviceWidth, height: deviceHeight, navHeight },
		user: {
			loggedIn,
			triedAutoLogin,
			self: { token },
		},
		network: { loading: isLoading },
		tryAutoLogin,
		hasUser,
		props: { visibleSection },
	}) => {
		// console.log("props: visibleSection", visibleSection);
		const dispatch = useDispatch();
		const classes = useClasses();
		useEffect(() => {
			console.log("hasUser: ", hasUser);
			if (hasUser) {
				dispatch({
					type: Types.AUTO_LOGIN_SUCCESS,
					payload: hasUser,
				});
			}
		}, [hasUser]);

		return (
			<Fragment>
				<UnderNavbar />
				<div className={classes.container}>
					<div
						className={classes.mainCanvasContainer}
						id="main-canvas-container"
					>
						<MainCanvas visibleSection={visibleSection} />
					</div>
					<LandingPageBanner />
				</div>
				<style jsx>{``}</style>
			</Fragment>
		);
	}
);

const Switcher = () => {
	const [visibleSection, setVisibleSection] = useState(1);

	const [styles, api] = useSpring(() => ({
		transform: "translateX(0px)",
		config: config.stiff,
	}));
	useEffect(() => {
		// add scroll listener and toggle sections here
		// setVisibleSection(1);
		// TODO: ADD GESTURE HANDLER TO TOGGLE SECTIONS ON TOUCH DEVICES
		// BUG: ADD GESTURE HANDLER TO TOGGLE SECTIONS ON TOUCH DEVICES
		document.addEventListener("scroll", (e) => {
			e.preventDefault();
			e.stopPropagation();
		});
		document.addEventListener("wheel", (e) => {
			e.preventDefault();
			e.stopPropagation();

			if (e.deltaY > 20) {
				return setVisibleSection(1);
			}
			if (e.deltaY < -20) {
				return setVisibleSection(2);
			}
		});
	}, []);

	useEffect(() => {
		console.log("visibleSection: new section ", visibleSection);
		let _w = window?.innerWidth;
		if (!_w) return;
		api.start({
			transform: `translateX(-${_w * (visibleSection - 1)}px)`,
		});
	}, [visibleSection]);

	return (
		<div
			style={{
				position: "absolute",
				top: "0",
				left: "0",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<web.div
				style={{
					position: "absolute",
					// Match this with amount of children... I hate doing this hardcoded but it's good for now
					width: "200vw",
					overflowY: "hidden",
					height: "100vh",
					padding: "0",
					top: 0,
					left: 0,
					overflow: "hidden !important",
					...styles,
				}}
				id="main-section-scroller"
			>
				<SlidingSection
					thisIndex={1}
					currentIndex={visibleSection}
					ownStyles={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
						alignItems: "center",
						padding: "2rem",
					}}
					// visibleSection={visibleSection}
					// setVisibleSection={setVisibleSection}
				>
					<Home
						visibleSection={visibleSection}
						setVisibleSection={setVisibleSection}
					/>
				</SlidingSection>
				<SlidingSection
					thisIndex={2}
					currentIndex={visibleSection}
					ownStyles={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						padding: "2rem",
					}}
					// visibleSection={visibleSection}
					// setVisibleSection={setVisibleSection}
				>
					<SectionTwoMain />
				</SlidingSection>
			</web.div>
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	let _user = await autoLoginOnFirstRequest(ctx.req, ctx.res);
	return {
		props: {
			hasUser: _user,
		},
	};
};

export default connect(mapStateToProps, { tryAutoLogin })(Switcher);
