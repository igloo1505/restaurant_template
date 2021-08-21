/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import MyRecipes_cardDescription from "./MyRecipes_cardDescription";
import clsx from "clsx";
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
    overflow: "hidden",
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
    height: "100%",
    // backgroundColor: "rgba(81,161,255,1)",
    backgroundColor: theme.palette.primary.light,
    border: `1px solid #b3d6ff`,
    padding: "0.5rem",
    // paddingBottom: "0.5rem",
  },
  topDivOpen: {
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    height: "auto",
    transition: theme.transitions.create(["height"], {
      duration: 250,
      delay: 250,
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
}) => {
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
    console.log("cardHeight: ", cardHeight, index);
    let summaryContainerHeight = document
      .getElementById(`summary-card-container-${index}`)
      .getBoundingClientRect().height;
    console.log("summaryContainerHeight: ", summaryContainerHeight, index);
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
        // transition: theme.transitions.create(["height"], { duration: 450 }),
        transition: "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        // transformOrigin: "bottom",
      },
      // extendedOuter: {
      //   height: outerHeight,
      // },
      collapsedOuter: {},
      collapsed: {
        height: lowerHeight,
        transition: "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
        onClick={() => {
          setSummaryOpen(!summaryOpen);
          console.log("summaryOpen: ", summaryOpen);
        }}
        style={summaryOpen ? adjustedHeight.extended : adjustedHeight.collapsed}
        id={innerSummaryId}
      >
        <div
          className={clsx(classes.topDiv, summaryOpen && classes.topDivOpen)}
        >
          <Typography classes={titleClasses} variant="h6">
            {title.length > 15 ? `${title.slice(0, 12)}...` : title}
          </Typography>
          {recipe?.time?.prepTime && (
            <CardTimeSection
              classes={classes}
              timeIconClasses={timeIconClasses}
              recipe={recipe}
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
  props: props,
});

export default connect(mapStateToProps)(MyRecipes_cardSummary);

const CardTimeSection = ({ classes, recipe, timeIconClasses }) => {
  const getTotalTime = () => {
    // let prepTime = recipe.time.prepTime;
    let totalTime = false;
    if (recipe?.time?.cookTime) {
      totalTime = recipe?.time?.cookTime;
    }
    if (recipe?.time?.prepTime) {
      totalTime =
        typeof totalTime === "number"
          ? totalTime + recipe?.time?.prepTime
          : recipe?.time?.prepTime;
    }
    console.log(totalTime, recipe?.time?.prepTime, recipe?.time?.cookTime);
    if (typeof totalTime !== "number") {
      return totalTime;
    }

    let formatedTime = totalTime / 60;
    let _formatedTime = totalTime % 60;
    console.log("prepTime: ", formatedTime.toFixed(), _formatedTime);
    console.log("prepTime: ", formatedTime.toFixed(), typeof _formatedTime);
    // let cookTime = recipe.time.cookTime;
    // console.log("cookTime: ", cookTime);
    return {
      hours:
        parseInt(formatedTime.toFixed()) > 0 ? formatedTime.toFixed() : null,
      minutes: _formatedTime !== 0 ? _formatedTime : null,
    };
  };
  let xyx = getTotalTime();
  console.log("xyx: ", recipe?.time?.prepTime, recipe?.time?.cookTime, xyx);
  return (
    <div className={classes.timeContainer}>
      <TimerIcon classes={timeIconClasses} />
      {getTotalTime()?.hours && (
        <Typography classes={{ root: classes.hoursText }}>
          {getTotalTime().hours}
        </Typography>
      )}
      {getTotalTime()?.minutes && (
        <Typography variant="caption" classes={{ root: classes.minutesText }}>
          <Fragment>{getTotalTime()?.hours && ":"}</Fragment>
          {getTotalTime().minutes}
          <Fragment>{!getTotalTime()?.hours && " mins"}</Fragment>
        </Typography>
      )}
    </div>
  );
};
