import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import clsx from "clsx";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import { useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { LocationCity, PersonPinCircle } from "@material-ui/icons";

const useClasses = makeStyles((theme) => ({
  primaryInfoContainer: {
    width: "100%",
    position: "relative",
    minWidth: "400px",
    minHeight: "100px",
    borderRadius: "5px",
    padding: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
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
  locationDiv: {
    display: "flex",
    flexDirection: "row",

    // gap: "0.35rem",
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
    // top: "0.75rem",
    top: "0.25rem",
    right: "0.75rem",
    gap: "0.5rem",
  },
}));

const publicPrimaryInfo = ({
  city,
  country,
  firstName,
  lastName,
  showFullName,
  createdAt,
  skillLevel,
}) => {
  const [addBoxShadow, setAddBoxShadow] = useState(false);
  const classes = useClasses();
  useEffect(() => {
    setTimeout(() => {
      setAddBoxShadow(true);
    }, 300);
  }, []);

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
          {city && (
            <div className={classes.locationDiv}>
              <Typography
                variant="h6"
                classes={{ root: classes.nameTypographyRoot }}
              >
                {city}, {country}
              </Typography>
            </div>
          )}
          {skillLevel && (
            <div className={classes.skillDiv}>
              <Typography
                variant="subtitle1"
                classes={{ root: classes.nameTypographyRoot }}
              >
                {skillLevel}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Slide>
  );
};

export default publicPrimaryInfo;
