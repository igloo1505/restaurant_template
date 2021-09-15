import React, { useState, useEffect, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
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
  },
  textFieldWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "0.75rem",
  },
}));

const useDialogClasses = makeStyles((theme) => ({
  root: {
    zIndex: "999999 !important",
  },
}));

const myProfile_aboutMe = ({
  profile: { aboutMe, favoriteCuisine, inspiredBy },
  updateProfileData,
}) => {
  const dialogClasses = useDialogClasses();
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [aboutMeFormData, setAboutMeFormData] = useState("");

  useEffect(() => {
    if (aboutMe) {
      setAboutMeFormData(aboutMe);
    }
  }, [aboutMe]);

  const handleAboutMeChange = (e) => {
    setAboutMeFormData(e.target.value);
  };

  const handleSaveAboutMe = () => {
    updateProfileData({
      aboutMe: aboutMeFormData,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const closeAccordion = () => {
    if (typeof window !== undefined) {
      var fauxClick = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      let em = document.getElementById("expandAboutMeIcon");
      if (em) {
        em.dispatchEvent(fauxClick);
      }
    }
  };

  useEffect(() => {
    closeAccordion();
  }, [aboutMe]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
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
              About Me
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
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSaveAboutMe}
                    >
                      Save
                    </Button>
                  </div>
                )}
                {!isEditing && (
                  <Typography
                    color="textSecondary"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {aboutMe ? aboutMe : "Tell people about yourself!"}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  profile: state.userProfile,
  props: props,
});

export default connect(mapStateToProps, { updateProfileData })(
  myProfile_aboutMe
);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
