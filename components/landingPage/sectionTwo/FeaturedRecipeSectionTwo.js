import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import gsap from "gsap";

const useClasses = makeStyles((theme) => ({
	outerContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		border: "5px solid white",
	},
}));

const FeaturedRecipeSectionTwo = () => {
	const classes = useClasses();
	return (
		<div className={classes.outerContainer}>
			<Typography variant="h4" style={{ color: "white" }}>
				Featured Recipe
			</Typography>
		</div>
	);
};

export default FeaturedRecipeSectionTwo;
