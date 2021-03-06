import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { addNewUser } from "../stateManagement/userActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../components/Copyright";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
	container: {
		position: "absolute",
		top: "50vh",
		left: "50vw",
		zIndex: -1,
		transform: "translate(-50%, -50%)",
		[theme.breakpoints.down(960)]: {
			maxWidth: "min(400px, 75vw)",
		},
	},
	labelClass: {
		backgroundColor: "#fff",
		paddingLeft: "5px",
		paddingRight: "5px",
	},
	paper: {
		// marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	buttonText: {
		backgroundColor: "transparent",
	},
	textFieldRoot: {
		overflow: "visible",
	},
	gridPadding: {
		padding: "1rem 0",
	},
	adornmentRoot: {
		height: "100%",
		zIndex: 1,
		overflow: "hidden",
	},
	gridItemRoot: {
		[theme.breakpoints.down(960)]: {
			padding: "8px 12px !important",
		},
	},
}));

const idArray = [
	"signIn_password_input",
	"signIn_email_input",
	"signIn_lastName_input",
	"signIn_firstName_input",
];

const PortalSignUp = ({
	user,
	props: { setLogin },
	viewport: { width: deviceWidth },
	addNewUser,
}) => {
	const [formData, setFormData] = useState({
		password: "",
		firstName: "",
		lastName: "",
		email: "",
		allowEmails: true,
		rememberMe: true,
	});
	const [showPassword, setShowPassword] = useState(false);

	const initialFocusState = {
		password: {
			shrink: Boolean(formData.password.length !== 0),
			focus: false,
		},
		firstName: {
			shrink: Boolean(formData.firstName.length !== 0),
			focus: false,
		},
		lastName: {
			shrink: Boolean(formData.lastName.length !== 0),
			focus: false,
		},
		email: {
			shrink: Boolean(formData.email.length !== 0),
			focus: false,
		},
	};

	const [focusState, setFocusState] = useState(initialFocusState);
	const addListeners = () => {
		idArray.forEach((id) => {
			let em = document.getElementById(id);
			em.addEventListener("focus", (e) => {
				setFocusState({
					...initialFocusState,
					[e.target.name]: {
						focus: true,
						shrink: Boolean(formData[e.target.name].length !== 0),
					},
				});
			});
			em.addEventListener("blur", (e) => {
				setFocusState({
					...focusState,
					[e.target.name]: {
						focus: false,
						shrink: Boolean(formData[e.target.name].length !== 0),
					},
				});
			});
		});
	};
	useEffect(() => {
		addListeners();
	}, []);
	const [validated, setValidated] = useState({
		firstName: false,
		lastName: false,
		email: false,
		password: false,
	});

	const classes = useStyles();
	const router = useRouter();
	const handleChange = (e) => {
		if (e.target.value !== "") {
			setFocusState({
				...focusState,
				[e.target.name]: { focus: true, shrink: true },
			});
		}
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleChangeBoolean = (e) => {
		setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
	};

	const handleSubmit = () => {
		console.log(formData);
		const didAddUser = addNewUser(formData);
		if (didAddUser) {
			router.push("/");
		}
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			className={clsx(classes.container)}
		>
			<div className={clsx(classes.paper)}>
				<Avatar className={clsx(classes.avatar)}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={clsx(classes.form)} noValidate>
					<Grid
						container
						spacing={3}
						classes={{
							root: clsx(classes.gridPadding),
						}}
					>
						<Grid item xs={12} sm={6} className={classes.gridItemRoot}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								margin={deviceWidth < 960 ? "dense" : "normal"}
								id="signIn_firstName_input"
								label="First Name"
								autoFocus
								value={formData.firstName}
								classes={{
									root: clsx(classes.textFieldRoot),
								}}
								onChange={handleChange}
								InputLabelProps={{
									focused: focusState.firstName.focus,
									shrink: Boolean(formData.firstName.length !== 0),
									classes: { root: classes.labelClass },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} className={classes.gridItemRoot}>
							<TextField
								variant="outlined"
								required
								fullWidth
								margin={deviceWidth < 960 ? "dense" : "normal"}
								id="signIn_lastName_input"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={formData.lastName}
								classes={{
									root: clsx(classes.textFieldRoot),
								}}
								InputLabelProps={{
									focused: focusState.lastName.focus,
									shrink: Boolean(formData.lastName.length !== 0),
									classes: { root: classes.labelClass },
								}}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItemRoot}>
							<TextField
								variant="outlined"
								required
								fullWidth
								margin={deviceWidth < 960 ? "dense" : "normal"}
								id="signIn_email_input"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={formData.email}
								classes={{
									root: clsx(classes.textFieldRoot),
								}}
								InputLabelProps={{
									focused: focusState.email.focus,
									shrink: Boolean(formData.email.length !== 0),
									classes: { root: classes.labelClass },
								}}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItemRoot}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								margin={deviceWidth < 960 ? "dense" : "normal"}
								type={showPassword ? "text" : "password"}
								id="signIn_password_input"
								autoComplete="current-password"
								value={formData.password}
								classes={{
									root: clsx(classes.textFieldRoot),
								}}
								InputLabelProps={{
									focused: focusState.password.focus,
									shrink: Boolean(formData.password.length !== 0),
									classes: { root: classes.labelClass },
								}}
								onChange={handleChange}
								InputProps={{
									endAdornment: passwordInputAdornment(
										showPassword,
										setShowPassword,
										classes.adornmentRoot
									),
								}}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItemRootCheckbox}>
							<FormControlLabel
								style={{ backgroundColor: "transparent" }}
								control={
									<Checkbox
										value={formData.rememberMe}
										checked={formData.rememberMe}
										name="rememberMe"
										onChange={handleChangeBoolean}
										color="primary"
										disabled={Object.keys(validated).every((x) => x === true)}
									/>
								}
								label="Remember me"
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItemRoot}>
							<FormControlLabel
								style={{ backgroundColor: "transparent" }}
								control={
									<Checkbox
										value={formData.allowEmails}
										color="primary"
										checked={formData.allowEmails}
										name="allowEmails"
										onChange={handleChangeBoolean}
									/>
								}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						classes={{ root: classes.submit, label: classes.buttonText }}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2" onClick={setLogin}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	drawer: state.drawer,
	alert: state.alert,
	viewport: state.UI.viewport,
	props: props,
});

export default connect(mapStateToProps, { addNewUser })(PortalSignUp);

const passwordInputAdornment = (
	showPassword,
	setShowPassword,
	adornmentClass
) => {
	return (
		<InputAdornment position="start" classes={{ root: adornmentClass }}>
			<IconButton
				aria-label="toggle password visibility"
				onClick={() => setShowPassword(!showPassword)}
				onMouseDown={(e) => e.preventDefault()}
			>
				{showPassword ? (
					<Visibility style={{ color: "#eb6010" }} />
				) : (
					<VisibilityOff />
				)}
			</IconButton>
		</InputAdornment>
	);
};
