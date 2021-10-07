import React, { useState, useEffect, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as Types from "../../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import { updateProfileData } from "../../stateManagement/userActions";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: "1rem",
    color: "#fff",
    flex: 1,
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
}));

const useDialogClasses = makeStyles((theme) => ({
  root: {
    zIndex: "999999 !important",
  },
}));

const myProfile_fullScreenDialog = ({
  profile: { aboutMe, favoriteCuisine, inspiredBy },
  dialogOpen: { open: _dialogOpen },
  updateProfileData,
}) => {
  const dialogClasses = useDialogClasses();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const [aboutMeFormData, setAboutMeFormData] = useState("");
  const [inspiredByFormData, setInspiredByFormData] = useState("");

  useEffect(() => {
    setAboutMeFormData(aboutMe);
  }, [aboutMe]);

  const handleAboutMeChange = (e) => {
    setAboutMeFormData(e.target.value);
  };
  const handleInspiredByFormData = (e) => {
    setInspiredByFormData(e.target.value);
  };

  const handleSaveAboutMe = () => {
    console.log("Running save aboutMe");
    updateProfileData({
      aboutMe: aboutMeFormData,
    });
  };
  const handleSaveInspiredBy = () => {
    updateProfileData({
      inspiredBy: inspiredByFormData,
    });
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    dispatch({
      type: Types.SET_ABOUTME_DIALOG,
      payload: false,
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
  useEffect(() => {
    closeAccordion("expandAboutMeIcon");
  }, [aboutMe]);

  useEffect(() => {
    closeAccordion("inspiredByIcon");
    setInspiredByFormData(inspiredBy);
  }, [inspiredBy]);

  const clearField = (field) => {
    updateProfileData({
      [field]: null,
    });
  };

  return (
    <Dialog
      fullScreen
      open={_dialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      classes={dialogClasses}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            About Me:
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button classes={{ root: classes.listItemRoot }}>
          <Accordion classes={{ root: classes.accordionRoot }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon id="expandAboutMeIcon" />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              <Typography variant="h6">About Me:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isEditing && (
                <div className={classes.textFieldWrapper}>
                  <TextField
                    color="primary"
                    multiline
                    fullWidth
                    value={aboutMeFormData}
                    onChange={handleAboutMeChange}
                  />
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSaveAboutMe}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => clearField("aboutMe")}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {!isEditing && aboutMe && (
                <div className={classes.textContainer}>
                  {aboutMe.split(/\r?\n/).map((t, i) => (
                    <Typography
                      color="textSecondary"
                      key={`aboutMe-text-${i}`}
                      onClick={() => setIsEditing(!isEditing)}
                      classes={{ root: classes.typographyRoot }}
                    >
                      {t}
                    </Typography>
                  ))}
                </div>
              )}
              {!isEditing && !aboutMe && (
                <>
                  <Typography
                    color="textSecondary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {"Tell people about yourself!"}
                  </Typography>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <Divider />
        <ListItem button classes={{ root: classes.listItemRoot }}>
          <Accordion classes={{ root: classes.accordionRoot }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon id="inspiredByIcon" />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
              onClick={() => setIsEditing(false)}
            >
              <Typography variant="h6">Who Inspired Me:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {isEditing && (
                <div className={classes.textFieldWrapper}>
                  <TextField
                    color="primary"
                    multiline
                    fullWidth
                    value={inspiredByFormData}
                    onChange={handleInspiredByFormData}
                  />
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSaveInspiredBy}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => clearField("inspiredBy")}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {!isEditing && (
                <Typography
                  color="textSecondary"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {inspiredBy
                    ? inspiredBy
                    : "Your Grandmothers Casserole? Pizza night in college? When did you find that food can bring people together?"}
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      </List>
    </Dialog>
  );
};

const mapStateToProps = (state, props) => ({
  profile: state.userProfile,
  dialogOpen: state.UI.aboutMeFullScreenDialog,
  props: props,
});

export default connect(mapStateToProps, { updateProfileData })(
  myProfile_fullScreenDialog
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
