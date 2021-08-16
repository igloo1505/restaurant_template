import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../stateManagement/recipeActions";
import * as Types from "../../stateManagement/TYPES";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { addRecipeImage } from "../../stateManagement/recipeActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const hiddenInput = "hiddenInput";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    padding: "0px 1rem 1rem 1rem",
  },
  innerContainer: {
    minWidth: "300px",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  confirmTextContainer: {},
  titleText: { fontStyle: "italic" },
  warningText: {
    fontStyle: "italic",
    fontSize: "0.7rem",
    color: theme.palette.error.main,
    width: "calc(100% - 20px)",
    textAlign: "right",
    margin: "5px 10px 10px",
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: theme.palette.common.paperLight,
    // backgroundColor: "transparent",
  },
  input: {
    // zIndex: -9999,
    marginLeft: theme.spacing(1),
    flex: 1,
    "&:hover": {
      cursor: "pointer !important",
    },
  },
  inputOverlay: {
    zIndex: 999999,
    "&:hover": {
      cursor: "pointer !important",
    },
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const useDeleteButtonClasses = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    transition: theme.transitions.create(["background-color"], {
      duration: 350,
    }),
    "&:hover": {
      cursor: "default",
    },
  },
  label: {},
  text: {
    color: theme.palette.primary.main,
    transition: theme.transitions.create(["color"], {
      duration: 350,
    }),
  },
}));
const useDeleteValueButtonClasses = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(["background-color"], {
      duration: 350,
    }),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  label: {},
  text: {
    color: "#fff",
    transition: theme.transitions.create(["color"], { duration: 350 }),
  },
}));
const useDismissClasses = makeStyles((theme) => ({
  //   root: {},
  //   label: {},
  //   text: {},
}));

const Modal_addRecipeImage = ({
  modal: { isOpen, relevantId },
  recipes: { myRecipes, recipeImageUpload },
  user: {
    self: { _id: userId },
  },
  deleteRecipe,
  addRecipeImage,
}) => {
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();
  const handleUpload = (e) => {
    if (!image || !relevantId) {
      return;
    }
    const formData = new FormData();
    formData.append("recipeImage", image);
    formData.append("recipeId", relevantId);
    formData.append("userId", userId);
    addRecipeImage(formData);
  };
  const classes = useStyles();
  const deleteClasses = useDeleteButtonClasses();
  const deleteClassesWithValue = useDeleteValueButtonClasses();
  const dismissClasses = useDismissClasses();
  const closeModal = () => {
    dispatch({ type: Types.HIDE_ALERT });
    setTimeout(() => {
      dispatch({ type: Types.RESET_ALERT });
    }, 1000);
  };
  const handleDelete = () => {
    closeModal();
    deleteRecipe(relevantId);
  };
  const handleDismiss = () => {
    closeModal();
  };

  return (
    <div className={classes.outerContainer}>
      <DialogContent>
        <FileInput
          classes={classes}
          image={image}
          setImage={setImage}
          recipeImageUpload={recipeImageUpload}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => handleDismiss()}
          color="primary"
          classes={dismissClasses}
        >
          Dismiss
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          autoFocus
          classes={image ? deleteClassesWithValue : deleteClasses}
        >
          Upload
        </Button>
      </DialogActions>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  modal: state.alert.addImageModal,
  dialog: state.alert.dialog,
  user: state.user,
  recipes: state.recipes,
  props: props,
});

const useTypographyClasses = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[500],
    width: "100%",
    marginLeft: "5px",
    "&:hover": {
      cursor: "pointer !important",
    },
  },
}));

export default connect(mapStateToProps, { deleteRecipe, addRecipeImage })(
  Modal_addRecipeImage
);

const FileInput = ({ classes, image, setImage, recipeImageUpload }) => {
  const typographyClasses = useTypographyClasses();
  const [displayText, setDisplayText] = useState("Click to select:");
  const [imageUrl, setImageUrl] = useState(null);
  const launchFilePicker = (e) => {
    e.preventDefault();
    document.getElementById(hiddenInput).click();
  };
  const handleFileChange = (e) => {
    console.log("fileChange ", e.target.files[0]);
    setDisplayText(e.target.files[0].name);
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleClearFile = (e) => {
    setDisplayText("Click to select:");
    setImage(null);
  };
  return (
    <Fragment>
      {image && !recipeImageUpload && (
        <ImageComponent image={image} imageUrl={imageUrl} />
      )}
      {recipeImageUpload && (
        <ProgressComponent
          image={image}
          imageUrl={imageUrl}
          recipeImageUpload={recipeImageUpload}
        />
      )}
      <Paper component="form" className={classes.root}>
        <input
          type="file"
          id={hiddenInput}
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        ></input>
        {image && (
          <IconButton
            className={classes.iconButton}
            aria-label="menu"
            onClick={handleClearFile}
          >
            <ClearIcon />
          </IconButton>
        )}
        <Typography
          fullWidth
          classes={typographyClasses}
          onClick={launchFilePicker}
        >
          {displayText}
        </Typography>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="secondary"
          className={classes.iconButton}
          aria-label="directions"
          onClick={launchFilePicker}
        >
          <PhotoLibraryIcon />
        </IconButton>
      </Paper>
    </Fragment>
  );
};

const useImageComponentClasses = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    maxHeight: "200px",
    maxWidth: "200px",
    margin: "0px 20px 20px 20px",
    borderRadius: "4px",
    boxShadow: "-3px -3px 7px #ffffffa6, 3px 3px 5px rgba(94, 104, 121, 0.712)",
  },
}));

const ImageComponent = ({ image, imageUrl }) => {
  const [imageSource, setImageSource] = useState(null);
  useEffect(() => {}, []);

  const imageComponentClasses = useImageComponentClasses();
  console.log("image: ", image.name);
  //   return <div>image </div>;
  return (
    <div className={imageComponentClasses.container}>
      <img
        src={imageUrl}
        alt="Your image"
        className={imageComponentClasses.image}
      />
    </div>
  );
};

const useProgressComponentStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100px",
  },
  innerContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typographyRoot: {
    position: "absolute",
    transform: "translateY(-50%)",
  },
}));
const useProgressStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    height: "60px !important",
  },
  svg: { height: "100%" },
}));

const ProgressComponent = ({ recipeImageUpload }) => {
  const classes = useProgressComponentStyles();
  const progressStyles = useProgressStyles();
  return (
    <div className={classes.outerContainer}>
      <CircularProgress
        variant="determinate"
        value={recipeImageUpload}
        classes={progressStyles}
      />
      <div className={classes.innerContainer}>
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
          classes={{ root: classes.typographyRoot }}
        >{`${Math.round(recipeImageUpload)}%`}</Typography>
      </div>
    </div>
  );
};
