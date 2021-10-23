/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";


const useClasses = makeStyles((theme) => ({
    outermostContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }
}))

const SectionTwoMain = () => {
    const classes = useClasses()
    return (
        <div className={classes.outermostContainer}>
            <Typography style={{fontSize: "10rem"}} >
            Section two here
            </Typography>
        </div>
    )
}

export default SectionTwoMain
