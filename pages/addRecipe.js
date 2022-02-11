import React, {
	Fragment,
	useState,
	useEffect,
	createRef,
	forwardRef,
} from "react";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Slide from "@material-ui/core/Slide";
import Copyright from "../components/Copyright";
import Loader from "../components/Loader";
import * as Types from "../stateManagement/TYPES";
import { setKeyboardListener } from "../stateManagement/userActions";
import AddRecipeFormContainer from "../components/addRecipeFormContainer";
// import { connectDB } from "../util/connectDB";
// import { wrapper } from "../stateManagement/store";
// import Cookies from "cookies";
// import mongoose from "mongoose";
// import User from "../models/User";
// import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import {
	UnderNavbar,
	AdjustForDrawerContainer,
} from "../components/UIComponents";
import initialFormData from "../util/initialFormData";

// TODO check deviceHeight and if room, shift form downward and tilt banner along corner of form
const useStyles = makeStyles((theme) => ({
	appBar: {
		position: "relative",
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing(2),
		backgroundColor: "transparent",
		marginRight: theme.spacing(2),
		// transform: "translateY(-20vh)",
		// transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		position: "relative !important",
		[theme.breakpoints.down("md")]: {
			position: "relative !important",
			top: "unset",
			left: "unset",
			// transform: "unset",
			// transform: "translateY(-4rem)",
		},
	},
	layoutShifted: {
		// transform: "translate(-50%, -50%)",
		transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		[theme.breakpoints.down("lg")]: {
			// transform: "translateY(-20vh)"
			// transform: "translate(-50%, -50%)",
		},
		[theme.breakpoints.down("md")]: {
			// transform: "unset",
			// transform: "translateY(-4rem)",
			// transform: "translate(-50%, -50%)",
		},
	},

	stepper: {
		padding: theme.spacing(3, 0, 5),
	},

	button: {
		color: "#fff",
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	stepLabelRoot: {
		color: "#fff",
	},
	stepLabelActive: { color: "#fff !important" },
	stepLabelCompleted: {
		color: "#fff !important",
		fontWeight: "400 !important",
	},
}));

const steps = ["Details", "Ingredients", "Directions"];

const AddRecipe = ({
	user: {
		loggedIn,
		triedAutoLogin,
		self: { token, _id },
	},
	UI: {
		viewport: { navHeight, width: deviceWidth },
		mainDrawer: { open: drawerIsOpen },
		addRecipe: { activeStep },
	},
	network: { loading: isLoading },
	recipe: { resetFormData, myRecipes, myFavorites },
	// tryAutoLogin,
}) => {
	const [toggleFormWidth, setToggleFormWidth] = useState({ width: "auto" });
	const dispatch = useDispatch();

	const router = useRouter();
	// const [slideIn, setSlideIn] = useState(false);
	//!!! The only reason half of this form state isn't in Redux is because I installed Apple's beta OS on my macbook and now Chrome just about starts it on fire... and Safari doesn't have **** for devtools.
	// TODO Add character limit to title!!
	const [formData, setFormData] = useState(initialFormData);
	useEffect(() => {
		if (typeof window !== "undefined") {
			// let y = window.localStorage.setItem("recentAddRecipeForm", JSON.stringify(formData));
			dispatch({
				type: Types.SET_ADD_RECIPE_FORM_DATA,
				payload: formData,
			});
		}
	}, [formData]);

	const setActiveStep = (step) => {
		dispatch({
			type: Types.SET_ADD_RECIPE_STEP,
			payload: step,
		});
	};
	useEffect(() => {
		let _initialFormData = initialFormData;
		if (typeof window !== "undefined") {
			let hasStoredData = window.localStorage.getItem("recentAddRecipeForm");
			console.log("hasStoredData: ", JSON.parse(hasStoredData));
			// if (hasStoredData) {
			//   _initialFormData = JSON.parse(hasStoredData);
			// }
		}
		setFormData(_initialFormData);
		setActiveStep(0);
	}, [resetFormData]);
	useEffect(() => {
		let _breakpointXS = 780;
		let _breakpointSM = 1150;
		let widths = {
			xs: "85vw",
			sm: "70vw",
			reg: "auto",
		};
		if (
			deviceWidth < _breakpointSM &&
			deviceWidth > _breakpointXS &&
			activeStep === 1
		) {
			setToggleFormWidth({ width: widths.sm });
		}
		if (deviceWidth < _breakpointXS) {
			setToggleFormWidth({ width: `min(${widths.xs}, 650px)` });
		}
		if (deviceWidth >= _breakpointSM && activeStep === 1) {
			setToggleFormWidth({ width: widths.reg });
		}
	}, [deviceWidth]);

	const [placeHolder, setPlaceHolder] = useState(false);
	const handleFormChange = (e) => {
		if (e) {
			setFormData({ ...formData, [e.target.name]: e.target.value });
		}
	};

	useEffect(() => {
		if (!loggedIn) {
			router.push("/");
		}
		if (loggedIn) {
			setKeyboardListener();
		}
	}, [loggedIn, token]);

	const classes = useStyles();

	if (isLoading || !loggedIn) {
		return <Loader type="circular" />;
	}
	if (!isLoading && loggedIn) {
		return (
			<Fragment>
				<CssBaseline />
				<AdjustForDrawerContainer
					centerAll
					customStyles={{ justifyContent: "center", alignItems: "flex-start" }}
				>
					<main
						className={clsx(
							classes.layout,
							drawerIsOpen && classes.layoutShifted
						)}
						style={toggleFormWidth}
					>
						<SlideComponent>
							<AddRecipeFormContainer
								activeStep={activeStep}
								steps={steps}
								setActiveStep={setActiveStep}
								formData={formData}
								setFormData={setFormData}
								handleFormChange={handleFormChange}
								placeHolder={placeHolder}
								setPlaceHolder={setPlaceHolder}
							/>
						</SlideComponent>
						<Copyright />
					</main>
				</AdjustForDrawerContainer>
			</Fragment>
		);
	} else {
		return <div></div>;
	}
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	UI: state.UI,
	props: props,
	network: state.network,
	recipe: state.recipes,
});

// eslint-disable-next-line react/display-name
const SlideComponent = forwardRef(
	(props, ref) => {
		return (
			<Slide
				direction="right"
				in={true}
				ref={ref}
				timeout={{ appear: 500, enter: 500, exit: 500 }}
				mountOnEnter
				unmountOnExit
			>
				{props.children}
			</Slide>
		);
	}
	// )
);

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res }) => {
//       debugger
//       let state = store.getState();
//       let cookies = new Cookies(req, res);
//       let hasUser = false;
//       let token = cookies.get("token") || state?.user?.self?.token;
//       let userId = cookies.get("userId") || state?.user?.self?._id;
//       let rememberMe = cookies.get("rememberMe");
//       console.log("rememberMe avoiding redirect: ", rememberMe);
//       console.log("userId avoiding redirect: ", userId);

//       let isInState = Boolean(
//         state?.user?.self?._id && state?.user?.self?.token
//       );
//       console.log('isInState: avoiding redirect', isInState);
//       if (Boolean(!userId || !token) && !isInState) {
//         return {
//           redirect: {
//             destination: "/",
//             permanent: false,
//           },
//         };
//       }
//       if (Boolean(userId && token) && !isInState) {
//         console.log("userId && token: ", userId, token, rememberMe);
//         if (rememberMe) {
//           hasUser = await autoLoginOnFirstRequest(req, res);
//           console.log('hasUser: avoiding redirect', hasUser);
//           if (!hasUser) {
//             return {
//               redirect: {
//                 destination: "/",
//                 permanent: false,
//               },
//             };
//           }
//           console.log("hasUser: ", hasUser);
//         }
//         return {
//           props: {
//             hasUser: hasUser,
//           },
//         };
//       }
//     }
// );

export default connect(mapStateToProps)(AddRecipe);
