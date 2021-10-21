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
        position: "relative"
    },
    dotIoTarget: {
        width: "2px",
        height: "2px",
        margin: "0px 0.5rem",
        backgroundColor: "#fff",
    },
}))


const coverBackground = {
        position: "absolute",
        display: "flex",
        height: "40%",
        width: "100%",
        backgroundColor: "#268AFF",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        top: 0
}

const landingPageBanner = () => {
    const classes = useClasses();
    
    useEffect(() => {
        let targets = document.getElementsByClassName("i-hover-target")
        console.log('targets: iTargets', targets);
        for(var i = 0; i < targets.length; i ++){
            console.log("Target i iTargets", targets[i])
        }
    }, [])



    return (
        <div className={classes.landingpageBannerContainer}>
        <div className={classes.titleTextWrapper}>
        {[..."Radish"].map((ch, i) => {
            return (
                <Typography variant="h1" className={clsx(classes.titleTextMain, `title-character-${ch}`)} key={`title-${ch}-${i}`}>
                {ch === "i" && 
                <div style={coverBackground}  >
                <div className="i-hover-target" style={{backgroundColor: "#fff", width: "2px", height: "2px"}}></div>
                </div>
                    }
                {ch}
                </Typography>
            )
        })}
        <div className={classes.dotIoTarget} id="dot-io-target"></div>
        <Typography variant="h1" className={classes.titleTextMain}>
            <div style={coverBackground}  >
                <div className="i-hover-target" style={{backgroundColor: "#fff", width: "2px", height: "2px"}}></div>
            </div>
        i
        </Typography>
        <Typography variant="h1" className={classes.titleTextMain}>
        o
        </Typography>
        </div>
        </div>
    )
}

export default landingPageBanner
