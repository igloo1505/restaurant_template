import React, { useState, useEffect, Fragment, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NotWhatThisWasIntendedForButItsMoreVisible from "@material-ui/icons/Exposure";
import { FaBalanceScale as ScaleIcon } from "react-icons/fa";
import Tooltip from "@material-ui/core/Tooltip";
import Grow from "@material-ui/core/Grow";

export const PrimaryTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontSize: 11,
    boxShadow: "6px 6px 54px #5e2606, -6px -6px 54px #ff9a1a",
  },
}))(Tooltip);
