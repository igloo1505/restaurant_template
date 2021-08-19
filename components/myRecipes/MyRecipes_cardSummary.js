/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
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
    // backgroundColor: theme.palette.common.paperLight,
    backgroundColor: theme.palette.primary.light,
  },
  expandOuter: {
    // height: "80%",
  },
  addBackground: {
    backgroundColor: "#f0f3f5",
    transition: theme.transitions.create(["background"], {
      duration: 500,
    }),
  },
  innerContainer: {
    margin: "0.5rem",
    padding: "0.5rem",
    height: "calc(100% - 1rem)",
    borderRadius: "4px",
    width: "100%",
    // boxShadow: `2px 2px 4px ${theme.palette.grey[500]}, -2px -2px 4px ${theme.palette.grey[100]}`,
    // boxShadow: "3px 3px 10px #4589d9, -3px -3px 10px #5db9ff",
    boxShadow: "2px 2px 5px #3a74b8, -2px -2px 5px #68ceff",
    // border: "1px solid rgba(255, 255, 255, 0.2)",
    backgroundColor: theme.palette.primary.light,
    // border: `1px solid ${theme.palette.primary.main}`,
    transition: theme.transitions.create(["box-shadow"], { duration: 250 }),
    "&:hover": {
      boxShadow: "1px 1px 4px #3a74b8, -1px -1px 4px #68ceff",
      transition: theme.transitions.create(["box-shadow"], { duration: 450 }),
      cursor: "pointer",
    },
  },
  topDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  minutesText: { color: theme.palette.grey[200] },
}));

const useTitleStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
  },
}));
const useTimeIconStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
    marginRight: "5px",
    transform: "translateY(2px)",
    color: "#fff",
    // marginBottom: "0px",
    // marginTop: "auto",
  },
}));

const MyRecipes_cardSummary = ({
  props: { recipe, cardId, summaryOpen, setSummaryOpen, index },
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
    let cardHeight = document
      .getElementById(cardId)
      .getBoundingClientRect().height;
    let summaryHeight = document
      .getElementById(summaryCardId)
      .getBoundingClientRect().height;
    let innerSummaryHeight = document
      .getElementById(innerSummaryId)
      .getBoundingClientRect().height;
    let imageSectionHeight = document
      .getElementById(`card-image-container-${index}`)
      .getBoundingClientRect().height;
    // console.log("innerSummaryHeight: ", innerSummaryHeight);
    let lowerHeight = cardHeight - imageSectionHeight - 16;
    console.log("lowerHeight: ", lowerHeight);
    // console.log("summaryHeight: ", summaryHeight);
    let _extended = cardHeight - 14;
    console.log("_extended: ", _extended);

    setAdjustedHeight({
      extended: {
        height: _extended,
        // transition: theme.transitions.create(["height"], { duration: 450 }),
        transition: "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      collapsed: {
        // height: "24px",
        height: lowerHeight,
        transition: "height 550ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    });
  }, []);
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
        <div className={classes.topDiv}>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
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
