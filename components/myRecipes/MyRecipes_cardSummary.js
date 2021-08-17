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
    // border: "1px solid black",
    borderRadius: "4px",
    // background: "linear-gradient(145deg, #d4d8db, #fdffff)",
    // boxShadow: "5px 5px 7px #b1b4b6, -5px -5px 7px #ffffff",
    // boxShadow: "inset 3px 3px 4px #b1b4b6, inset -3px -3px 4px #ffffff",
    // display: "block",
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    width: "100%",
    boxShadow: `2px 2px 4px ${theme.palette.grey[400]}, -2px -2px 4px #ffffff`,
  },
  topDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  minutesText: { color: theme.palette.grey[700] },
}));

const useTitleStyles = makeStyles((theme) => ({
  outerContainer: {
    padding: "1rem",
  },
  innerContainer: {},
}));
const useTimeIconStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
    marginRight: "5px",
    transform: "translateY(2px)",
    // marginBottom: "0px",
    // marginTop: "auto",
  },
}));

const MyRecipes_cardSummary = ({
  props: { recipe, cardId, summaryOpen, setSummaryOpen },
}) => {
  const [addBackground, setAddBackground] = useState(false);
  const { title, createdBy, description, servings } = recipe;
  useEffect(() => {
    setTimeout(() => {
      setAddBackground(true);
    }, 600);
  }, []);
  const classes = useStyles();
  const titleClasses = useTitleStyles();
  const timeIconClasses = useTimeIconStyles();

  return (
    <div className={classes.outerContainer}>
      <div
        className={clsx(
          classes.innerContainer,
          addBackground && classes.addBackground
        )}
        onClick={() => {
          setSummaryOpen(!summaryOpen);
          console.log("summaryOpen: ", summaryOpen);
        }}
      >
        <div className={classes.topDiv}>
          <Typography className={titleClasses}>
            {title.length > 15 ? `${title.slice(0, 12)}...` : title}
          </Typography>
          {recipe.time && (
            <div className={classes.timeContainer}>
              {recipe.time.prepTime && (
                <CardTimeSection
                  classes={classes}
                  timeIconClasses={timeIconClasses}
                  recipe={recipe}
                />
              )}
            </div>
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
