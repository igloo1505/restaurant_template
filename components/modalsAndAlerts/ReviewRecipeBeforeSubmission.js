import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES";
import clsx from 'clsx'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Accordion from "@material-ui/core/Accordion";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditRounded"
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { purple, blue, lightBlue, cyan } from "@material-ui/core/colors"
import { connect, useDispatch } from "react-redux";
import { updateProfileData } from "../../stateManagement/userActions";
import PhotoCameraIcon from "@material-ui/icons/PhotoCameraRounded"


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    toolbarRoot: {
        justifyContent: "center"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        left: 12,
    },
    title: {
        marginLeft: "1rem",
        color: "#fff",
        flex: 1,
        width: "fit-content",
        maxWidth: "fit-content",
        padding: "0.75rem"
    },
    listItemRoot: {
        padding: "0px",
    },
    accordionRoot: {
        width: "100%",
        margin: "0px !important",
    },
    textFieldWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "0.75rem",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
    },
    typographyRoot: {
        display: "block",
    },
    textContainer: {
        textIndent: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    topContentRow: {
        display: "flex",
        flexDirection: "row",
        gap: "0.5rem",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    dialogContent: {
        width: "min(100%, 980px)",
        padding: "2rem 0.75rem 0.75rem 0.75rem",
        marginLeft: "50%",
        transform: "translateX(-50%)",
    },
    recipeImageContainer: {

    },
    summaryDetailsContainer: {
        // width: "100%",
        width: "fit-content",
        // border: `1px solid ${theme.palette.grey[100]}`,
        border: "1px solid #fff",
        borderRadius: "4px",
        padding: "0.75rem",
        boxShadow: `3px 3px 7px ${theme.palette.grey[300]}, -3px 3px 7px ${theme.palette.grey[200]}`,
        border: `1px solid ${theme.palette.grey[100]}`,
    },
    timeContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "0.75rem",
        borderRadius: "4px",
        border: `1px solid ${theme.palette.grey[400]}`,
        // border: `1px solid #fff`,
        // backgroundColor: theme.palette.common.paperLight,
        backgroundColor: blue[200],
    },
    timeContainerOuter: {
        display: "flex",
        flexDirection: "row",
        padding: "0.75rem",
        borderRadius: "4px",
        gap: "0.75rem",
        border: `1px solid ${theme.palette.grey[400]}`,
        // border: `1px solid #fff`,
        // backgroundColor: theme.palette.common.paperLight,
        backgroundColor: blue[200],
        boxShadow: `3px 3px 7px ${theme.palette.grey[300]}, -3px 3px 7px ${theme.palette.grey[200]}`,
    },
    timeContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "0.75rem",
        borderRadius: "4px",
        border: `1px solid ${theme.palette.grey[400]}`,
        // border: `1px solid #fff`,
        // backgroundColor: theme.palette.common.paperLight,
        backgroundColor: blue[200],
    },
    timeContainerContent: {
        display: "flex",
        // flexDirection: "row",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0.5rem",
        // border: `1px solid ${theme.palette.grey[50]}`,
        // backgroundColor: `${theme.palette.primary.light}`,
        backgroundColor: blue[100],
        borderRadius: "4px",
        boxShadow: "4px 4px 9px #7aacd4, -4px -4px 9px #a6e8ff",
        border: `1px solid ${theme.palette.grey[400]}`,
    },
    timeColon: {
        // fontSize: "1.1rem"
        fontWeight: "bolder",
        margin: "0px 2px",
        textAlign: "center",
    },
    innerTimeContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "0.35rem"
    },
    titleText: {
        margin: "0rem 0.75rem 0.75rem 0rem"
    },
    summaryDetailsTextLabel: {
        fontSize: "1rem",
        textAlign: "center",
        // fontWeight: "bold",
        color: theme.palette.secondary.dark,
        "&:hover": {
            cursor: "pointer",
        }
    },
    summaryDetailsText: {
        textAlign: "center",
    },
    summaryTimeUnit: {
        textAlign: "center",
        fontSize: "0.8rem",
        fontWeight: "bold",
        color: theme.palette.secondary.dark,
        margin: "0px 2px",
    },
    timeContainerTitle: {
        lineHeight: "unset",
    },
    timeContainerIndividualTitle: {
        color: theme.palette.secondary.dark,
        fontWeight: "bold",
        fontSize: "1.1rem"
    },
    combinedText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "0.75rem",
        flexWrap: "wrap"
    },
    outerTextRow: {
        display: "flex",
        flexDirection: "row",
        gap: "0.25rem"
    },
    editIconRoot: {
        color: theme.palette.secondary.light,
        fontSize: "1rem",
        "&:hover": {
            cursor: "pointer",
        }
    }
}));

const useDialogClasses = makeStyles((theme) => ({
    root: {
        zIndex: "999999 !important",
    },
}));

const RecipeReviewFullscreenModal = ({
    alert: {
        fullScreenRecipeSummary: {
            showRecipeSummary,
            relevantRecipe,
        },
    },
    UI: {
        addRecipe: {
            formData
        }
    }
}) => {
    const dispatch = useDispatch();
    const [shouldOpenModal, setShouldOpenModal] = useState(false)
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const classes = useStyles();
    useEffect(() => {
        setShouldOpenModal(showRecipeSummary);
    }, [showRecipeSummary])


    let getTime = (time, unit) => {
        switch (unit?.toLowerCase()) {
            case "minutes":
                return parseFloat(time);
            case "hours":
                return parseFloat(time) * 60;
            case "days":
                return parseFloat(time) * 1440;
            default:
                return parseFloat(time);
        }
    };

    useEffect(() => {
        if (relevantRecipe) {
            return setCurrentRecipe(relevantRecipe)
        }
        if (!relevantRecipe) {
            setCurrentRecipe({
                ...formData,
                time: {
                    prepTime: getTime(formData?.prepTime, formData?.prepTimeUnit?.long),
                    cookTime: getTime(formData?.cookTime, formData?.cookTimeUnit?.long),
                }
            });
            setIsEditing(true)
        }
        setTimeout(() => {
            console.log('formData for summary ', formData);
        }, 1000);
    }, [relevantRecipe, formData, showRecipeSummary]);



    const handleClose = (e) => {
        e.stopPropagation();
        dispatch({
            type: Types.SHOW_RECIPE_SUMMARY_FULLSCREEN_MODAL,
            payload: {
                showRecipeSummary: false,
            },
        });
    };

    const closeAccordion = (_id) => {
        if (typeof window !== undefined) {
            var fauxClick = new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: false,
            });
            let em = document.getElementById(_id);
            if (em) {
                em.dispatchEvent(fauxClick);
            }
        }
    };




    return (
        <Dialog
            fullScreen
            open={shouldOpenModal}
            onClose={handleClose}
            TransitionComponent={Transition}
            classes={useDialogClasses()}
        >
            <AppBar className={classes.appBar}>
                <Toolbar classes={{ root: classes.toolbarRoot }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        className={classes.closeButton}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Summary
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.dialogContent}>
                <div className={classes.topContentRow}>
                    <div className={classes.recipeImageContainer}>
                        {currentRecipe.imgUrl && <img src={currentRecipe.imgUrl} alt="recipe" />}
                        {!currentRecipe.imgUrl && <PhotoCameraIcon src={currentRecipe.imgUrl} alt="recipe" />}
                    </div>
                    <div className={clsx(classes.summaryDetailsContainer, "animateSummaryContent")}>
                        <div className={classes.outerTextRow}>
                            {isEditing &&
                                <Fragment>
                                    <EditIcon className={classes.editIconRoot} />
                                </Fragment>
                            }
                            <div className={classes.combinedText}>
                                {isEditing &&
                                    <Fragment>
                                        <Typography variant="h5" className={classes.summaryDetailsTextLabel}>
                                            {isEditing && "Title:"}
                                        </Typography>
                                    </Fragment>
                                }
                                {currentRecipe?.title && <Typography variant="h5" className={classes.titleText}>
                                    {currentRecipe.title}
                                </Typography>
                                }
                            </div>
                        </div>
                        <div className={classes.outerTextRow}>
                            {isEditing &&
                                <Fragment>
                                    <EditIcon className={classes.editIconRoot} />
                                </Fragment>
                            }
                            <div className={classes.combinedText}>
                                {isEditing &&
                                    <Fragment>
                                        <Typography variant="h5" className={classes.summaryDetailsTextLabel}>
                                            {isEditing && "Time:"}
                                        </Typography>
                                    </Fragment>
                                }
                                <div className={classes.timeContainerOuter}>
                                    {parseInt(currentRecipe?.time?.prepTime) > 0 &&
                                        <TimeContainer time={currentRecipe?.time?.prepTime} classes={classes} title="Prep Time" />
                                    }
                                    {parseInt(currentRecipe?.time?.cookTime) > 0 &&
                                        <TimeContainer time={currentRecipe?.time?.cookTime} classes={classes} title="Cook Time" />
                                    }
                                    {parseInt(currentRecipe?.time?.totalTime) > 0 &&
                                        <TimeContainer time={currentRecipe?.time?.totalTime} classes={classes} title="Total Time" />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

const mapStateToProps = (state, props) => ({
    profile: state.userProfile,
    dialogOpen: state.UI.aboutMeFullScreenDialog,
    UI: state.UI,
    alert: state.alert,
    props: props,
});

export default connect(mapStateToProps, { updateProfileData })(
    RecipeReviewFullscreenModal
);

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const TimeContainer = ({ time, classes, title }) => {
    console.log('time in timeContainer ', time);
    const [timeString, setTimeString] = useState(null)
    const [show, setShow] = useState({
        hrs: false,
        mins: false,
        seperator: false,
        text: false
    })
    useEffect(() => {
        let newShowState = {
            hrs: time > 60,
            seperator: time > 60 && time % 60 > 0,
            mins: time % 60 > 0,
            text: time <= 60 || time % 60 === 0,
        }
        let newTimeString = time > 60 ? `${Math.floor(time / 60)}h ${time % 60}m` : `${time} m`
        setTimeString(newTimeString)
        setShow(newShowState)
    }, [time])
    return (
        <Fragment>
            <div className={classes.timeContainerContent}>
                <Typography variant="subtitle1" className={classes.timeContainerIndividualTitle}>{title}</Typography>
                <div className={classes.innerTimeContainer}>
                    <Typography variant="subtitle1" className={classes.summaryDetailsText}>
                        {timeString}
                    </Typography>
                </div>
            </div>
        </Fragment>
    )
}