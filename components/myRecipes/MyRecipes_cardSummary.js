/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import MyRecipes_cardDescription from "./MyRecipes_cardDescription";
import clsx from "clsx";
import { useRouter } from "next/router";
import { getFormattedTime } from "../../util/getFormattedTime";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TimerIcon from "@material-ui/icons/Timer";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    bottom: 0,
    zIndex: 1,
    backgroundColor: theme.palette.common.paperLight,
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
  expandOuter: {
    borderTop: "none",
  },
  addBackground: {
    backgroundColor: "#f0f3f5",
    transition: theme.transitions.create(["background"], {
      duration: 500,
    }),
  },
  innerContainer: {
    margin: "0.5rem",
    // padding: "0.5rem",
    // height: "calc(100% - 1rem)",
    height: "auto",
    borderRadius: "4px",
    // borderRadius: "0.5rem",
    width: "100%",
    boxShadow: `3px 3px 4px ${theme.palette.grey[400]}, -3px -3px 4px #ffffff`,
    transition: theme.transitions.create(["box-shadow"], { duration: 250 }),
    // overflow: "hidden",
    "&:hover": {
      boxShadow: `1px 1px 3px ${theme.palette.grey[500]}, -1px -1px 3px #ffffff`,
      transition: theme.transitions.create(["box-shadow"], { duration: 450 }),
      cursor: "pointer",
    },
  },
  topDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "3rem",
    borderRadius: "4px",
    backgroundColor: theme.palette.primary.light,
    border: `1px solid #b3d6ff`,
    padding: "0.5rem",
    opacity: 1,
    // transition: theme.transitions.create(["height", "opacity"], {
    //   duration: 250,
    // }),
    transition:
      "height 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 450ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  adjustForDrawer: {
    "& > *": {
      opacity: 0,
      transition: theme.transitions.create(["opacity"], {
        duration: 450,
      }),
    },
  },
  topDivOpen: {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
    height: "auto",
    width: "calc(100% + 4px)",
    margin: "0px -2px",
    boxShadow: `0px 2px 5px ${theme.palette.grey[400]}, 2px 3px 8px ${theme.palette.grey[400]}, -2px -3px 8px ${theme.palette.grey[200]}`,
    transition: theme.transitions.create(["height"], {
      duration: 250,
      delay: 550,
    }),
  },
  timeContainer: {
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    // alignItems: "center",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  hoursText: {
    lineHeight: "auto",
    color: "#fff",
  },
  minutesText: {
    color: theme.palette.grey[100],
    // color: "#fff",
  },
}));

const useTitleStyles = makeStyles((theme) => ({
  root: {
    // color: "#fff",
    // color: theme.palette.grey[900],
    color: "#fff",
  },
}));
const useTimeIconStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
    marginRight: "5px",
    transform: "translateY(2px)",
    // color: "#000",
    color: "#fff",
    // marginBottom: "0px",
    // marginTop: "auto",
  },
}));

const MyRecipes_cardSummary = ({
  props: { recipe, cardId, summaryOpen, setSummaryOpen, index },
  viewport: { width: deviceWidth },
  UI: {
    mainDrawer: { open: drawerOpen },
  },
}) => {
  const router = useRouter();
  const summaryCardId = `summary-card-container-${index}`;
  const innerSummaryId = `summary-inner-div-${index}`;
  const [adjustedHeight, setAdjustedHeight] = useState({
    extended: {},
    collapsed: {},
  });

  const [addBackground, setAddBackground] = useState(false);
  const { title, createdBy, description, servings } = recipe;
  useEffect(() => {
    let overlap = 0;
    let cardHeight = document
      .getElementById(`myRecipes-card-${index}`)
      .getBoundingClientRect().height;
    let summaryContainerHeight = document
      .getElementById(`summary-card-container-${index}`)
      .getBoundingClientRect().height;

    let imageSectionHeight = document
      .getElementById(`card-image-container-${index}`)
      .getBoundingClientRect().height;
    console.log("imageSectionHeight: ", imageSectionHeight, index);
    // let lowerHeight = cardHeight - imageSectionHeight + overlap;
    // TODO Make sure this is responsive to title length. This is needed to allow transition but will need to take different approach to accommodate longer titles.
    let lowerHeight = "3rem";
    let _extended = summaryContainerHeight + imageSectionHeight - 12;
    console.log("_extended: ", _extended);
    if (index === 0) {
      console.log(
        "_extended: ",
        index,
        _extended,
        lowerHeight,
        imageSectionHeight,
        cardHeight
      );
    }
    setAdjustedHeight({
      extended: {
        height: _extended,

        transition:
          "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      // extendedOuter: {
      //   height: outerHeight,
      // },
      collapsedOuter: {},
      collapsed: {
        height: lowerHeight,
        transition:
          "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }, [deviceWidth]);
  useEffect(() => {
    setTimeout(() => {
      setAddBackground(true);
    }, 600);
  }, []);
  const classes = useStyles();
  const titleClasses = useTitleStyles();
  const timeIconClasses = useTimeIconStyles();

  return (
    <div
      className={clsx(
        classes.outerContainer,
        summaryOpen && classes.expandOuter
      )}
      id={summaryCardId}
      style={
        summaryOpen
          ? adjustedHeight.extendedOuter
          : adjustedHeight.collapsedOuter
      }
    >
      <div
        className={clsx(
          classes.innerContainer,
          addBackground && classes.addBackground,
          summaryOpen && classes.expandInner
        )}
        style={summaryOpen ? adjustedHeight.extended : adjustedHeight.collapsed}
        id={innerSummaryId}
        onClick={(e) => {
          console.log("e: ", e);
          setSummaryOpen(!summaryOpen);
          router.prefetch(`/editRecipe/${recipe._id}`);
          router.prefetch(`/recipeDetails/${recipe._id}`);
          console.log("summaryOpen: ", summaryOpen);
        }}
      >
        <div
          className={clsx(
            classes.topDiv,
            summaryOpen && classes.topDivOpen,
            Boolean(drawerOpen && deviceWidth < 960) && classes.adjustForDrawer
          )}
        >
          <Typography classes={titleClasses} variant="h6">
            {title.length > 15 ? `${title.slice(0, 12)}...` : title}
          </Typography>
          {Boolean(recipe?.time?.prepTime && recipe?.time?.cookTime) && (
            <CardTimeSection
              classes={classes}
              timeIconClasses={timeIconClasses}
              recipe={recipe}
              index={index}
            />
          )}
        </div>
        <MyRecipes_cardDescription
          recipe={recipe}
          summaryOpen={summaryOpen}
          index={index}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(MyRecipes_cardSummary);

const CardTimeSection = ({ classes, recipe, timeIconClasses, index }) => {
  const formattedTime = getFormattedTime(recipe);
  return (
    <div className={classes.timeContainer}>
      <TimerIcon classes={timeIconClasses} />
      {formattedTime?.hours && (
        <Typography classes={{ root: classes.hoursText }}>
          {formattedTime.hours}
        </Typography>
      )}
      {formattedTime?.minutes && (
        <Typography variant="caption" classes={{ root: classes.minutesText }}>
          <Fragment>{formattedTime?.hours && ":"}</Fragment>
          {formattedTime.minutes}
          <Fragment>{!formattedTime?.hours && " mins"}</Fragment>
        </Typography>
      )}
    </div>
  );
};
