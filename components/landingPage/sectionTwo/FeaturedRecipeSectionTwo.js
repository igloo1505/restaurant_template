/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import gsap from "gsap";

const useClasses = makeStyles((theme) => ({
	outerContainer: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		justifyContent: "flex-start",
		alignItems: "center",
		padding: "1rem",
		border: "1px solid #fff6",
		borderRadius: "8px",
		width: "35vw",
		// height: "55vh",
		maxHeight: "100%",
		position: "absolute",
		top: "1rem",
		right: "2rem",
		backgroundColor: theme.palette.secondary.light,
		boxShadow: `5px 5px 8px ${theme.palette.grey[700]}, -5px 5px 8px ${theme.palette.grey[600]}`,
		// Make sure this matches other breakpoints... put this in just to style both for now without worrying about transitioning at proper point.
		[theme.breakpoints.down(1200)]: {
			right: "unset",
			left: "2rem",
		},
	},
	titleTypeLabel: {
		textAlign: "center",
	},
	titleTypeMain: {},
	profileLink: {
		"&:hover": {
			cursor: "pointer",
		},
	},
	topRowContainer: {
		width: "100%",
		display: "flex",
		// maxHeight: "200px",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// border: "2px solid white",
	},
	topRowLeft: {
		minWidth: "40%",
		height: "100%",
		display: "flex",
		padding: "1rem 0rem",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: "0.35rem",
	},
	topRowRight: {
		maxHeight: "100%",
		// height: ""
	},
	image: {
		objectFit: "contain",
		maxHeight: "100%",
		maxWidth: "100%",
		borderRadius: "8px",
		// boxShadow: `2px 2px 5px ${theme.palette.grey[700]}, -2px 2px 5px ${theme.palette.grey[600]}`,
		boxShadow: "4px 4px 6px #cc540e, -4px -4px 6px #ff6c12",
	},
}));

const FeaturedRecipeSectionTwo = ({
	props: { featuredRecipe, visibleSection },
	viewport: vp,
}) => {
	const [reviewLimit, setReviewLimit] = useState(3);
	useEffect(() => {
		console.log("featuredRecipe: ", featuredRecipe);
		if (!vp.height || typeof window === "undefined") {
			return;
		}
		let pnt = document
			.getElementById("section-two-left-container")
			?.getBoundingClientRect();

		if (!pnt) {
			return;
		}
		let availableSpace = window.innerHeight - pnt.top;
		console.log("viewport: ", pnt.top, window.innerHeight);
		if (availableSpace <= 600) {
			return setReviewLimit(2);
		}
		if (availableSpace > 600) {
			return setReviewLimit(3);
		}
	}, [vp?.width, vp?.height, visibleSection]);
	const { title, createdBy, imgUrl, time, servings, recipeReviews, _id } =
		featuredRecipe;
	const classes = useClasses();
	return (
		<div className={classes.outerContainer}>
			<div className={classes.titleContainer} id="featuredRecipeTitleContainer">
				<Typography
					variant="subtitle1"
					style={{ color: "white" }}
					className={classes.titleTypeLabel}
				>
					Featured Recipe:
				</Typography>
				<Typography
					variant="h4"
					style={{ color: "white" }}
					className={classes.titleTypeMain}
					id="redirectToFeaturedRecipe"
					rId={_id}
				>
					{title}
				</Typography>
			</div>
			<div className={classes.topRowContainer}>
				<div className={classes.topRowLeft}>
					{createdBy.firstName && (
						<Typography
							variant="body"
							style={{ color: "white" }}
							className={clsx(classes.titleTypeMain, classes.profileLink)}
							id="redirect-to-featured-rec-prof"
							prf={createdBy._id}
						>
							<span style={{ fontSize: "1.1rem", marginRight: "0.2rem" }}>
								Author:
							</span>
							{createdBy.firstName}{" "}
							{createdBy.lastName && `${createdBy.lastName[0]}.`}
						</Typography>
					)}
					{time.prepTime && (
						<Typography
							variant="body"
							style={{ color: "white" }}
							className={classes.titleTypeMain}
						>
							<span style={{ fontSize: "1.1rem", marginRight: "0.2rem" }}>
								Prep:
							</span>
							{time.prepTime} mins
						</Typography>
					)}
					{time.cookTime && (
						<Typography
							variant="body"
							style={{ color: "white" }}
							className={classes.titleTypeMain}
						>
							<span style={{ fontSize: "1.1rem", marginRight: "0.2rem" }}>
								Cook:
							</span>
							{time.cookTime} mins
						</Typography>
					)}
					{servings.amount && (
						<Typography
							variant="body"
							style={{ color: "white" }}
							className={classes.titleTypeMain}
						>
							<span style={{ fontSize: "1.1rem", marginRight: "0.2rem" }}>
								{`${servings.unit === "People" ? "Serves" : "Makes"}:`}
							</span>
							{`${servings.amount} ${servings.unit}`}
						</Typography>
					)}
				</div>
				<div className={classes.topRowRight}>
					{imgUrl && (
						<img
							src={imgUrl}
							alt="Recipe"
							className={classes.image}
							id="featured-recipe-image"
						/>
					)}
				</div>
			</div>
			{recipeReviews
				.slice(0, Math.min(recipeReviews.length, reviewLimit))
				.map((review, index) => (
					<IndividualReview
						review={review}
						createdBy={createdBy}
						index={index}
						key={`recipe-featured-review-${index}`}
					/>
				))}
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	user: state.user,
	viewport: state.UI.viewport,
	props: props,
});

export default connect(mapStateToProps)(FeaturedRecipeSectionTwo);

const useReviewStyles = makeStyles((theme) => ({
	reviewContainer: {
		backgroundColor: theme.palette.secondary.main,
		boxShadow: "3px 3px 4px #cc540e, -3px -3px 4px #ff6c12",
		borderRadius: "8px",
		width: "100%",
		minHeight: "100px",
		padding: "0.5rem",
		marginTop: "0.5rem",
		display: "flex",
		flexDirection: "row",
	},
	titleText: {
		color: "#fff",
		"&:hover": {
			cursor: "pointer",
		},
	},
	reviewLabelText: {
		color: "#fff",
		fontSize: "0.8rem",
	},
	reviewText: {
		color: "#fff",
	},
	reviewerName: {},
	topRowRight: {
		minWidth: "fit-content",
	},
	stars: {
		color: "#fff",
	},
	topRow: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		// justifyContent: "space-between",
	},
}));

const getStars = (v) => {
	let stars = [];
	for (let i = 0; i < Math.floor(v); i++) {
		stars.push(StarIcon);
	}
	if (v - Math.floor(v) === 0.5) {
		stars.push(StarHalfIcon);
	}
	if (stars.length < 5) {
		stars.push(StarBorderIcon);
	}
	return stars;
};

const IndividualReview = ({
	review: {
		comment,
		dateFriendly: date,
		kidFriendly: kid,
		dietFriendly: diet,
		quickSnack: quick,
		submittedBy,
	},
	createdBy,
	index,
}) => {
	let revs = [kid, diet, quick, date];
	const [displayedReview, setDisplayedReview] = useState({
		value: 0,
		stringValue: "",
	});

	useEffect(() => {
		let dr = {};
		dr.value = Math.max(...revs);
		console.log("set review", dr);
		switch (revs.indexOf(dr.value)) {
			case 0:
				dr.stringValue = "Kid Friendly";
				break;
			case 1:
				dr.stringValue = "Diet Friendly";
				break;
			case 2:
				dr.stringValue = "Quick Snack";
				break;
			case 3:
				dr.stringValue = "Date Friendly";
				break;
			default:
				dr.stringValue = "";
				break;
		}
		setDisplayedReview(dr);
	}, []);

	const classes = useReviewStyles();
	console.log("individual review", comment);
	return (
		<div className={classes.reviewContainer}>
			<div className={classes.topRow}>
				<Typography variant="h6" className={classes.titleText}>
					{`${submittedBy.firstName} ${[...submittedBy.lastName][0]}.`}
				</Typography>
				<div className={classes.reviewText}>{comment}</div>
			</div>
			<div className={classes.topRowRight}>
				<Typography variant="h6" className={classes.reviewLabelText}>
					{displayedReview?.stringValue}
				</Typography>
				{getStars(displayedReview?.value).map((star, index) => {
					let Starrrr = star;
					return (
						<Starrrr key={`star-icon-${index}`} className={classes.stars} />
					);
				})}
			</div>
		</div>
	);
};
