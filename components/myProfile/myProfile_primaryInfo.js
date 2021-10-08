import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import EditIcon from "@material-ui/icons/Edit";
import SettingsIcon from "@material-ui/icons/Settings"
import { useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useClasses = makeStyles((theme) => ({
  primaryInfoContainer: {
    width: "100%",
    position: "relative",
    minWidth: "400px",
    minHeight: "100px",
    borderRadius: "5px",
    padding: "0.75rem",
    backgroundColor: theme.palette.primary.light,
    transition: theme.transitions.create(["box-shadow"], {
      duration: 350,
    }),
  },
  transitionDiv: {
    width: "100%",
    minWidth: "400px",
    height: "100px",
  },
  addBoxShadow: {
    boxShadow: `6px 6px 12px ${theme.palette.grey[400]}, -6px 6px 12px ${theme.palette.grey[300]}`,
  },
  nameTypographyRoot: {
    color: "#fff",
  },
  settingsIconContainer: {
    position: "absolute",
    right: "8px",
    bottom: "8px",
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    }
  },
  locationDiv: {
    display: "flex",
    flexDirection: "row",
    // gap: "0.35rem",
  },
  locationIcon: {
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  editIcon: {
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  skillDiv: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "5px",
    right: "5px",
    gap: "0.5rem",
  },
}));

const myProfile_primaryInfo = ({
  user: {
    self: { _id, firstName, lastName },
  },
  profile: {
    location: { city, country },
    skillLevel,
  },
}) => {
  const classes = useClasses();
  const dispatch = useDispatch();
  const [addBoxShadow, setAddBoxShadow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAddBoxShadow(true);
    }, 350);
  }, []);

  const launchEditLocationModal = () => {
    dispatch({
      type: Types.SHOW_EDIT_LOCATION_MODAL,
      payload: {
        userId: _id,
      },
    });
  };
  const launchSkillModal = () => {
    dispatch({
      type: Types.SHOW_EDIT_SKILL_MODAL,
      payload: {
        userId: _id,
      },
    });
  };
  const handleSettingsClick = () => {
    dispatch({
      type: Types.TOGGLE_SETTINGS_MODAL,
    });
  };


  return (
    <Slide in={true} direction="left">
      <div className={classes.transitionDiv}>
        <div
          className={clsx(
            classes.primaryInfoContainer,
            addBoxShadow && classes.addBoxShadow
          )}
        >
          <div className={classes.nameDiv}>
            <Typography
              variant="h5"
              classes={{ root: classes.nameTypographyRoot }}
            >
              {firstName}
            </Typography>
          </div>
          {city ? (
            <div className={classes.locationDiv}>
              <Typography
                variant="h6"
                classes={{ root: classes.nameTypographyRoot }}
              >
                {city}, {country}
              </Typography>
              <EditLocationIcon
                className={classes.locationIcon}
                onClick={launchEditLocationModal}
              />
            </div>
          ) : (
            <div className={classes.locationDiv}>
              <Typography
                variant="h6"
                classes={{ root: classes.nameTypographyRoot }}
              >
                Add Location
              </Typography>
              <EditLocationIcon
                className={classes.locationIcon}
                onClick={launchEditLocationModal}
              />
            </div>
          )}
          <div className={classes.skillDiv}>
            <Typography
              variant="h6"
              classes={{ root: classes.nameTypographyRoot }}
            >
              {skillLevel ? skillLevel : "Skill Level"}
            </Typography>
            <EditIcon className={classes.editIcon} onClick={launchSkillModal} />
          </div>
          <div className={classes.settingsIconContainer}>
            <SettingsIcon onClick={handleSettingsClick} />
          </div>
        </div>
      </div>
    </Slide>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  profile: state.userProfile,
  props: props,
});

export default connect(mapStateToProps)(myProfile_primaryInfo);
