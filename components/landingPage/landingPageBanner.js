import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from "three";
import { useSpring } from '@react-spring/core';
import { a as three, config } from "@react-spring/three";
import { a as web } from "@react-spring/web";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BookmarkedIcon from "@material-ui/icons/Bookmark";
import NotBookmarkedIcon from "@material-ui/icons/BookmarkBorderOutlined";


const useClasses = makeStyles((theme) => ({
    landingpageBannerContainer: {
        width: "100%",
        height: "40vh",
        backgroundColor: theme.palette.primary.main,
        padding: "1.5rem",
        borderRadius: "0.6rem",
        boxShadow: `8px 8px 12px ${theme.palette.grey[400]}, -8px 8px 12px ${theme.palette.grey[300]}`,
    },
    titleTextWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "min(50%, 800px)",
        gap: "1rem"
    },
    titleTextMain: {
        color: "#fff",
        fontSize: "7rem",
        lineHeight: "7rem",
        fontWeight: 400,
    },
    dotIoTarget: {
        width: "2px",
        height: "2px",
        margin: "0px 0.5rem",
        backgroundColor: "#fff",
    },
}))

const landingPageBanner = () => {
    const classes = useClasses();
    return (
        <div className={classes.landingpageBannerContainer}>
        <div className={classes.titleTextWrapper}>
        <Typography variant="h1" className={classes.titleTextMain}>
        Radish
        </Typography>
        <div className={classes.dotIoTarget} id="dot-io-target"></div>
        <Typography variant="h1" className={classes.titleTextMain}>
        io
        </Typography>
        </div>
        </div>
    )
}

export default landingPageBanner
