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
import Button from "@material-ui/core/Button"


const useClasses = makeStyles((theme) => ({
    landingpageBannerContainer: {
        width: "100%",
        height: "40vh",
        backgroundColor: theme.palette.primary.main,
        padding: "1.5rem",
        borderRadius: "0.6rem",
        boxShadow: `8px 8px 12px ${theme.palette.grey[400]}, -8px 8px 12px ${theme.palette.grey[300]}`,
        display: "flex",
        flexDirection: "row",
        gap: "1.5rem",
    },
    titleTextWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        width: "min(50%, 800px)",
        gap: "1rem",
    },
    entireTextContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "min(50%, 800px)",
        gap: "1rem",
        
    },
    titleTextMain: {
        color: "#fff",
        fontSize: "6rem",
        lineHeight: "6rem",
        fontWeight: 400,
        position: "relative",
    },
    dotIoTarget: {
        width: "0.25rem",
        height: "0.25rem",
        margin: "0px 0.5rem",
        borderRadius: "50%",
        // backgroundColor: "#fff",
    },
    textUnderline: {
        borderBottom: "2px solid #fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem"
    },
    rightDefinitionProunounce: {
        color: "#fff",
        fontStyle: "italic",
        fontSize: "1.2rem"
    },
    bannerRightContainer: {
        padding: "0.75rem"
    },
    rightDefinitionTitleContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0",
        lineHeight: 1,
        marginBottom: "1rem"
    },
    rightDefinitionTitle: {
        fontWeight: 500,
        // backgroundColor: "#FFFDD0",
        backgroundColor: "#FFF",
        width: "100%",
        padding: "0.25rem",
        textAlign: "center",
        // color: "#273c75",
        color: theme.palette.primary.dark,
        borderRadius: "4px",
        marginBottom: "1rem"
    },
    rightDefinitionNoun: {
        color: "#fff",
        fontSize: "1.2rem"
    },
    definitionContainer: {},
    definitionTitle: {
        fontSize: "1.4rem",
        color: "#fff",
        fontWeight: 400,
        margin: "0.75rem"
    },
    definitionMain: {
        fontSize: "1.1rem",
        fontWeight: 400,
        color: "#fff",
        margin: "0.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },
    informal: {
        fontSize: "1.2rem",
        fontWeight: 200,
        color: "#fff",
        margin: "0.75rem",
        fontStyle: "italic"
    },
    buttonText: {
        color: "#fff",
        fontWeight: 600,
        letterSpacing: "0.2rem",
        fontSize: "2rem",
        padding: "0.75rem",
        textTransform: "none"
    }
}))


const useButtonClasses = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "2rem"
    }
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

const handleSignupClick = (e) => {
console.log("Did click signup button target")
}

    return (
        <div className={classes.landingpageBannerContainer}>
        <div className={classes.titleTextWrapper}>
        <div className={classes.entireTextContainer}>
        <div className={classes.textUnderline}>
        {[..."Radish"].map((ch, i) => {
            return (
                <Typography variant="h1" className={clsx(classes.titleTextMain, `title-character-${ch}`)} key={`title-${ch}-${i}`}>
                {ch === "i" && 
                <div style={coverBackground}  >
                <div className="i-hover-target" style={{ width: "2px", height: "2px"}}></div>
                </div>
            }
            {ch}
            </Typography>
            )
        })}
        </div>
        <div style={{height: "100%", display: "flex", flexDirecton: "column", justifyContent: "center", alignItems: "flex-end"}}>
        <div className={classes.dotIoTarget} id="dot-io-target">
        {(() => document.getElementById("dot-io-target").hasAttribute("hasThreeHoveredEm")) && 
        (<Typography>
        .
        </Typography>)
    }
        </div>
        </div>
        <div className={classes.textUnderline}>
        <Typography variant="h1" className={classes.titleTextMain}>
        <div style={coverBackground}  >
        <div className="i-hover-target" style={{ width: "2px", height: "2px"}}></div>
        </div>
        i
        </Typography>
        <Typography variant="h1" className={classes.titleTextMain}>
        o
        </Typography>
        </div>
        </div>
        </div>
        <div className={classes.bannerRightContainer}>
        <div className={classes.rightDefinitionTitleContainer}>
        <Typography variant="h1" className={classes.rightDefinitionTitle}>
        Radish
        </Typography>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "100%", gap: "0.75rem"}}>
        <Typography variant="h1" className={classes.rightDefinitionNoun}>
        noun, adjective
        </Typography>
        <Typography variant="h1" className={classes.rightDefinitionNoun}>
        |
        </Typography>
        <Typography variant="h1" className={classes.rightDefinitionProunounce}>
        rad~ish
        </Typography>
        </div>
        </div>
        <div className={classes.definitionContainer}>
        <Typography variant="h1" className={classes.definitionTitle}>
        Definition
        </Typography>
        <Typography variant="h1" className={classes.definitionMain}>
        <Typography variant="h1" className={classes.informal}>
            informal
        </Typography>
        : to be pretty awesome. Usually in the presence of friends. 
        </Typography>
        <div style={{display: "flex", flexDirection: "column", height: "fit-content"}}>
        <Typography variant="h1" className={classes.definitionMain} style={{flexDirection: "row", alignItems: "center", margin: "0px"}}>
        <Typography variant="h1" className={classes.informal}>
        also:
        </Typography>
        a plant that produces radishes.
        </Typography>
        </div>
        </div>
        <Button variant="contained" color="secondary" classes={useButtonClasses()} onClick={handleSignupClick} id="landingPage-banner-signupButton">
        <Typography variant="h1" className={classes.buttonText}>
        Sign up
        </Typography>
        </Button>
        </div>
        
        </div>
    )
}

export default landingPageBanner
