import React, { useState, useEffect, forwardRef, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gsap } from 'gsap'
import * as Types from "../../stateManagement/TYPES";
import clsx from 'clsx'
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import { useTheme } from '@material-ui/styles';
import PhotoCameraIcon from "@material-ui/icons/PhotoCameraRounded"


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    summaryDirectionItem: {
        boxShadow: `3px 3px 7px ${theme.palette.grey[300]}, -3px 3px 7px ${theme.palette.grey[200]}`,
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
        boxShadow: "none",
    },
    accordionSummaryRoot: {
        justifyContent: "flex-start",
        minHeight: "fit-content !important",
        "&:hover": {
            cursor: "default !important",
        }
    },
    accordionSummaryContent: {
        flexGrow: "unset",
        margin: "0px !important",
        "&:hover": {
            cursor: "pointer",
        }
    },
    subRecipeTitleText: {
        fontSize: "1.5rem",
        float: "left",
        margin: "0.75rem"
    },
    ingredientSectionWrapper: {
        width: "50%",
        display: "flex",
        flexDirection: "row",
        gap: "0.75rem",
        width: "min(1280px, 80vw)",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        flexWrap: "wrap",
    },
    directionSectionWrapper: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        width: "min(1280px, 80vw)",
        marginLeft: "50%",
        transform: "translateX(-50%)",
        flexWrap: "wrap",

    },
    textSectionWrapper: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        width: "min(1280px, 80vw)",
        marginLeft: "50%",
        transform: "translateX(-50%)",

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    photoIcon: {
        color: theme.palette.primary.main,
        fontSize: "3rem",
        "&:hover": {
            cursor: "pointer",
        }
    },
    summaryDetailsContainer: {
        width: "fit-content",
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
    summaryNoTime: {
        fontSize: "1rem",
        color: theme.palette.grey[500],
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
    const [_show, setShow] = useState({ description: true, ingredients: true, directions: true })
    const classes = useStyles();
    useEffect(() => {
        setShouldOpenModal(showRecipeSummary);
    }, [showRecipeSummary])

    const toggleSection = (section) => {
        setShow({ ..._show, [section]: !_show[section] })
    }
    const theme = useTheme();
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
    }, [relevantRecipe, formData, showRecipeSummary]);

    useEffect(() => {
        animateIngredientItem(theme)
    }, [_show.ingredients])



    const handleClose = (e) => {
        e.stopPropagation();
        dispatch({
            type: Types.SHOW_RECIPE_SUMMARY_FULLSCREEN_MODAL,
            payload: {
                showRecipeSummary: false,
            },
        });
    };

    const handlePhotoIconClick = (e) => {
        console.log("Handle photo in original recipe submission on both back and front end... literally have done none of that yet")
    }

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
                        {!currentRecipe.imgUrl && <PhotoCameraIcon src={currentRecipe.imgUrl} alt="recipe" className={classes.photoIcon} onClick={handlePhotoIconClick} />}
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
                                {Boolean(parseInt(currentRecipe?.time?.prepTime) > 0 ||
                                    parseInt(currentRecipe?.time?.cookTime) > 0 ||
                                    parseInt(currentRecipe?.time?.totalTime) > 0) ? <div className={classes.timeContainerOuter}>
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
                                    :
                                    <Typography variant="h5" className={classes.summaryNoTime}>
                                        N/A
                                    </Typography>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Accordion classes={{ root: classes.accordionRoot }}
                expanded={_show.description}
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon id="expandSummaryIcon" onClick={() => toggleSection("description")} />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="summary-description-header"
                    classes={{ root: classes.accordionSummaryRoot, content: classes.accordionSummaryContent }}

                // onClick={() => {
                //     setIsEditing(false);
                // }}
                >
                    <Typography variant="h6" onClick={() => toggleSection("description")}>Description: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.textSectionWrapper}>
                        {currentRecipe?.description?.split(/\r?\n/).map((t, i) => (
                            <Typography variant="h6" className={classes.summaryDetailsTextLabel}>
                                {currentRecipe?.description}
                            </Typography>
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion classes={{ root: classes.accordionRoot }}
                expanded={_show.ingredients}
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon id="expandSummaryIcon-ingredients" onClick={() => toggleSection("ingredients")} />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="summary-description-header"
                    classes={{ root: classes.accordionSummaryRoot, content: classes.accordionSummaryContent }}
                >
                    <Typography variant="h6" onClick={() => toggleSection("ingredients")}>Ingredients: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.ingredientSectionWrapper}>
                        {currentRecipe?.ingredients && currentRecipe?.ingredients.map((ingredient, index) => (<IngredientItem ingredient={ingredient} key={index} />))}
                        {currentRecipe?.subRecipes?.length > 0 && currentRecipe?.subRecipes.map((subRecipe, index) => (<SubRecipeIngredientList classes={classes} subRecipe={subRecipe} key={index} index={index} />))}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion classes={{ root: classes.accordionRoot }}
                expanded={_show.directions}
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon id="expandSummaryIcon-directions" onClick={() => toggleSection("directions")} />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="summary-description-header"
                    classes={{ root: classes.accordionSummaryRoot, content: classes.accordionSummaryContent }}
                >
                    <Typography variant="h6" onClick={() => toggleSection("directions")}>Directions: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.directionSectionWrapper}>
                        {currentRecipe?.directions && currentRecipe?.directions.map((direction, index) => (<DirectionItem classes={classes} index={index} direction={direction} key={index} />))}
                    </div>
                </AccordionDetails>
            </Accordion>
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

    useEffect(() => {
        let newTimeString = time > 60 ? `${Math.floor(time / 60)}h ${time % 60}m` : `${time} m`
        setTimeString(newTimeString)
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


const useIngredientItemClasses = makeStyles((theme) => ({
    ingredientItemText: {
        lineHeight: "initial"

    },
    ingredientItem: {
        width: "calc(45% - 1rem)",
        minWidth: "calc(45% - 1rem)",
        border: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: "6px",
        padding: "0.75rem",
        boxShadow: `2px 2px 4px ${theme.palette.grey[300]}, -2px 2px 4px ${theme.palette.grey[200]}`,
    },
    optionalText: {
        color: theme.palette.secondary.main,
        fontSize: "0.8rem",
        paddingLeft: "0.5rem",
    },
}))


const animateIngredientItem = (theme) => {
    gsap.fromTo(".animateIngredientItem", {

        stagger: 0.09,
        // scaleY: 0.0001,
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
        duration: 1.5,
        ease: "elastic.out(1.3, 0.9)",
    },
        {
            stagger: 0.09,
            // scaleY: 1,
            boxShadow: `2px 2px 5px ${theme.palette.grey[300]}, -2px 2px 5px ${theme.palette.grey[200]}`,
            duration: 1.5,
            ease: "elastic.out(1.3, 0.9)",
        })
}

const IngredientItem = ({ ingredient }) => {
    console.log('ingredient: ', ingredient);
    const classes = useIngredientItemClasses();
    const theme = useTheme()
    let ingredientText = ingredient.text || ingredient.name || ingredient.ingredient
    console.log('ingredientText: ', ingredientText);
    const checkAmount = (amount, unit) => {
        if (parseFloat(amount) === 1) {
            if (unit.charAt(unit.length - 1).toLowerCase() === "s") {
                return unit.slice(0, unit.length - 1);
            }
            return unit;
        } else {
            return unit;
        }
    };
    return (
        <div className={clsx(classes.ingredientItem, "animateIngredientItem")}>
            <Typography variant="h6" classes={{ root: classes.ingredientItemText }}>
                {ingredient.amount}
                {" "}
                {checkAmount(ingredient.amount, ingredient.unit.long)}
                {" "}
                {ingredientText}
            </Typography>
            {ingredient?.optional && <Typography variant="subtitle1" classes={{ root: classes.optionalText }}>
                Optional
            </Typography>}
        </div>
    )
}

const SubRecipeIngredientList = ({ subRecipe, index, classes }) => {
    console.log('subRecipe: ', subRecipe);
    return (
        <div className="subRecipeIngredientList">
            <Typography variant="h6" className={classes.subRecipeTitleText}>
                {subRecipe.title}
            </Typography>
            <div className={classes.ingredientSectionWrapper}>
                {subRecipe.ingredients && subRecipe.ingredients.map((ingredient, index) => (<IngredientItem ingredient={ingredient} key={index} />))}
            </div>
        </div>
    )
}

const DirectionItem = ({ direction, index, classes }) => {
    return (
        <div className={clsx(classes.directionItemContainer, "summaryDirectionItem")}>
            <Typography variant="h6" className="directionItemText">
                {index + 1}. {direction}
            </Typography>
        </div>
    )
}