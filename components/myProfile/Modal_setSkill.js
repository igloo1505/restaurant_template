/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import { updateProfileData } from "../../stateManagement/userActions";
import Button from "@material-ui/core/Button";
import { current } from "immer";

// NOTE make sure this continues to match array in profileData model.
const skillArray = [
  "I burn everything",
  "Just learning",
  "Beginner",
  "Home cook",
  "It's my job",
  "Professionally Trained",
];

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    minWidth: "400px",
    minHeight: "150px",
    padding: "0.75rem 0.75rem 0.75rem 0.75rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0.75rem",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

const Modal_editLocation = ({ profile: { skillLevel } }) => {
  const classes = useClasses();
  const dispatch = useDispatch();

  const handleItemClick = (index) => {
    dispatch(
      updateProfileData({
        skillLevel: skillArray[index],
      })
    );
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        {skillArray.map((s, i) => (
          <SkillButton
            skill={s}
            index={i}
            key={`skill-${i}`}
            currentSkillSetting={skillLevel}
            handleItemClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  profile: state.userProfile,
  props: props,
});

export default connect(mapStateToProps)(Modal_editLocation);

const useButtonStyles = makeStyles((theme) => ({}));
const useCurrentButtonStyles = makeStyles((theme) => ({
  root: {
    boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
  },
}));

const SkillButton = ({
  skill,
  index,
  currentSkillSetting,
  handleItemClick,
}) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const buttonClasses = isCurrent
    ? useCurrentButtonStyles()
    : useButtonStyles();
  useEffect(() => {
    setIsCurrent(skill === currentSkillSetting);
  }, [currentSkillSetting]);
  return (
    <Button
      classes={buttonClasses}
      variant={isCurrent ? "contained" : "outlined"}
      color="secondary"
      onClick={() => handleItemClick(index)}
    >
      {skill}
    </Button>
  );
};
