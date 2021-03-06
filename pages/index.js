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
import { useRouter } from "next/router";
import LandingPageBanner from "../components/landingPage/landingPageBanner";
import SlidingSection from "../components/landingPage/SlidingSection";
import SectionTwoMain from "../components/landingPage/sectionTwo/SectionTwoMain";
import Cookies from "cookies";
import mongoose from "mongoose";
import Recipe from "../models/Recipe";
import { gsap } from "gsap";
import clsx from "clsx";
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import dynamic from "next/dynamic";
import { to, useSpring } from "@react-spring/core";
import { useDrag } from "@use-gesture/react";
import { useMobileOrientation } from "react-device-detect";
import WaveBackdrop from "../components/landingPage/WaveBackdrop";
import SecondWaveBackdrop from "../components/landingPage/SecondWaveBackdrop";

const MainCanvas = dynamic(
	() => import("../components/landingPage/MainCanvas"),
	{
		ssr: false,
	}
);

const setFeaturedRecipeIdThisWayForNow = "618713b0ed2a427d04a636ab";

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
	},
	container: {
		maxWidth: "1280px",
	},
	waveContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		zIndex: -1,
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
		props: {
			visibleSection,
			setVisibleSection,
			initialVisibleSection,
			setInitialVisibleSection,
			visibleSectionAnimStart,
			scrollXPosition,
			setScrollXPosition,
			featuredRecipe,
			isTicking,
			setIsTicking,
		},
	}) => {
		const dispatch = useDispatch();
		const router = useRouter();
		const classes = useClasses();
		useEffect(() => {
			router.prefetch("/portal");
		}, []);

		return (
			<Fragment>
				<UnderNavbar />
				<div className={classes.container}>
					<div
						className={classes.mainCanvasContainer}
						id="main-canvas-container"
					>
						<MainCanvas
							visibleSection={visibleSection}
							setVisibleSection={setVisibleSection}
							scrollXPosition={scrollXPosition}
							setScrollXPosition={setScrollXPosition}
							initialVisibleSection={initialVisibleSection}
							setInitialVisibleSection={setInitialVisibleSection}
							visibleSectionAnimStart={visibleSectionAnimStart}
							isTicking={isTicking}
							setIsTicking={setIsTicking}
						/>
					</div>
					<LandingPageBanner visibleSection={visibleSection} />
					<WaveBackdrop
						color="#EB6010"
						additionalStyles={{
							filter: "drop-shadow(-5px 0px 6px #0008)",
						}}
					/>
					<SecondWaveBackdrop
						color="#FF6F00"
						tintRightColor="#7C4DFF"
						animId="sectionOne"
						visibleSection={visibleSection}
						thisIndex={1}
						additionalStyles={{
							filter: "drop-shadow(-5px 0px 6px #0008)",
						}}
					/>
				</div>
			</Fragment>
		);
	}
);

const Switcher = ({
	viewport: { width: deviceWidth, height: deviceHeight, navHeight },
	props: { hasUser, featuredRecipe },
}) => {
	const dispatch = useDispatch();
	const [visibleSection, setVisibleSection] = useState(1);
	const [initialVisibleSection, setInitialVisibleSection] = useState(1);
	const [scrollXPosition, setScrollxPosition] = useState(0);
	const [isTicking, setIsTicking] = useState(false);

	const setScrollXPosition = (val) => {
		console.log("is ticking", isTicking);
		setScrollxPosition(val);
	};

	useEffect(() => {
		console.log("hasUser", hasUser);

		if (hasUser) {
			dispatch({
				type: Types.AUTO_LOGIN_SUCCESS,
				payload: hasUser,
			});
		}
	}, [hasUser]);

	const dragHandler = useDrag(({ delta, ...rest }) => {
		console.log("data first", delta[0], rest, rest.args);
		console.log("Handle drag and isTicking state");
		if (delta[0] < -10) {
			if (typeof window !== "undefined" && visibleSection === 1) {
				let em = document.getElementById("banner-title-narrow-title-text");
				if (em) {
					em.style.display = "none";
				}
			}
			setVisibleSection(2);
		}
		if (delta[0] > 10) {
			setVisibleSection(1);
		}
		// api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
	});

	const [styles, api] = useSpring(() => ({
		transform: "translateX(0px)",
		config: config.stiff,
		onStart: () => {
			setIsTicking(true);
			console.log("On Start down here isTicking", isTicking);
		},
		onRest: () => {
			console.log("On Rest down here isTicking", isTicking);
		},
		onResolve: () => {
			setIsTicking(false);
			console.log("On Resolve down here isTicking", isTicking);
		},
	}));
	useEffect(() => {
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
		document.addEventListener("touchmove", (e) => {
			console.log("e: touchmove", e);
			e.preventDefault();
			e.stopPropagation();
		});
	}, []);

	useEffect(() => {
		// debugger;
		console.log("visibleSection: new section ", visibleSection);
		let _w = window?.innerWidth;
		if (!_w) return;

		// Handle early transition here.
		// startEarlyAnimation(visibleSection)

		api.start({
			transform: `translateX(-${_w * (visibleSection - 1)}px)`,
			onResolve: () => {
				setInitialVisibleSection(visibleSection);
				setScrollXPosition(_w * (visibleSection - 1));
				console.log("On Resolve isTicking", isTicking);
				setTimeout(() => {
					setIsTicking(false);
				}, 500);
			},
			onStart: () => {
				setIsTicking(true);
				console.log("On Start isTicking", isTicking);
			},
			onRest: () => {
				console.log("On Rest isTicking", isTicking);
			},
			onChange: () => {
				console.log("onChange: ", isTicking);

				if (!isTicking) setIsTicking(true);
			},
		});
	}, [visibleSection, deviceWidth]);
	let dHandler = dragHandler();
	let dragHandlerWithArg = {};
	Object.keys(dHandler).forEach((handler) => {
		dragHandlerWithArg[handler] = (event) => dHandler[handler](event);
	});
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
				{...dragHandlerWithArg}
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
						backgroundColor: "#ed7028",
					}}
					// visibleSection={visibleSection}
					// setVisibleSection={setVisibleSection}
				>
					<Home
						visibleSection={visibleSection}
						setVisibleSection={setVisibleSection}
						initialVisibleSection={initialVisibleSection}
						scrollXPosition={scrollXPosition}
						setScrollXPosition={setScrollXPosition}
						isTicking={isTicking}
						setIsTicking={setIsTicking}
						setInitialVisibleSection={setInitialVisibleSection}
						visibleSectionAnimStart={visibleSection}
						featuredRecipe={featuredRecipe}
						// setVisibleSection={setVisibleSection}
						// startEarlyAnimation={startEarlyAnimation}
					/>
				</SlidingSection>
				<SlidingSection
					thisIndex={2}
					currentIndex={visibleSection}
					ownStyles={{
						display: "flex",
						flexDirection: "flex-start",
						justifyContent: "center",
						alignItems: "center",
						padding: "2rem",
						// backgroundColor: "#ed7028",
						backgroundColor: "#51a1ff",
					}}
					// visibleSection={visibleSection}
					// setVisibleSection={setVisibleSection}
				>
					<SectionTwoMain
						visibleSection={visibleSection}
						featuredRecipe={featuredRecipe}
					/>
				</SlidingSection>
			</web.div>
		</div>
	);
};

export const getServerSideProps = async (ctx) => {
	let _user = await autoLoginOnFirstRequest(ctx.req, ctx.res);
	let featuredRecipe = await mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(async () => {
			let r = await Recipe.findById(setFeaturedRecipeIdThisWayForNow)
				.populate("ingredients")
				.populate({
					path: "recipeReviews",
					options: {
						limit: 10,
						sort: { created: -1 },
						// skip: req.params.pageIndex*10
					},
					populate: {
						path: "submittedBy",
						select:
							"firstName lastName _id -groceryList -myBookmarks -userProfileData",
					},
				})
				.populate("createdBy", { firstName: 1, lastName: 1, _id: 1 });
			return r;
		});
	return {
		props: {
			hasUser: _user,
			featuredRecipe: JSON.parse(JSON.stringify(featuredRecipe)),
		},
	};
};

export default connect(mapStateToProps, { tryAutoLogin })(Switcher);
