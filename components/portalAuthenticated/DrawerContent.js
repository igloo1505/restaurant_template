import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Types from "../../stateManagement/TYPES";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CategoryIcon from "@material-ui/icons/Category";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  outerContainer: {},
  listRoot: {},
  listItemRoot: {
    "&:hover": {
      backgroundColor: "rgba(120,172,233, 0.1)",
    },
  },
  listItemIconRoot: {
    zIndex: 1,
  },
  listItemTextPrimary: {
    zIndex: 1,
  },
  listItemTextRoot: {
    // zIndex: 1,
  },
}));

const DrawerContent = ({
  UI: {
    viewport: { navHeight, width: deviceWidth },
  },
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const closeDrawer = () => {
    dispatch({ type: Types.CLOSE_DRAWER });
  };
  // * Push down to be level with navbar
  const [heightOffsetStyle, setHeightOffsetStyle] = useState({
    marginTop: `${navHeight}px`,
  });
  useLayoutEffect(() => {
    let style = {
      marginTop: `${navHeight}px`,
    };
    console.log("Height, Width", navHeight, deviceWidth);
    if (navHeight !== 0 && deviceWidth >= 1920) {
      setHeightOffsetStyle(style);
    }
    if (navHeight === 0 && deviceWidth >= 1920) {
      setHeightOffsetStyle({ marginTop: "64px" });
    }
    if (navHeight === 0 && deviceWidth < 1920) {
      setHeightOffsetStyle({ marginTop: "0px" });
    }
    // if (navHeight === 0) {
    //   setHeightOffsetStyle({ marginTop: "64px" });
    // }
    console.count("Fired");
  }, [navHeight, deviceWidth]);
  const theme = useTheme();
  const classes = useStyles();
  const addRecipeAction = () => {
    // !! Handle redirect
    router.push("/addRecipe");
    closeDrawer();
  };
  let array = [
    {
      text: "Add Recipe",
      action: addRecipeAction,
      icon: <AddCircleIcon color="secondary" fontSize="large" />,
    },
  ];
  return (
    <div className={classes.outerContainer} style={heightOffsetStyle}>
      <Divider />
      <List className={classes.listRoot}>
        {array.map((a) => (
          <ListComponent item={a} classes={classes} />
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText
              primary={text}
              classes={{
                primary: classes.listItemTextPrimary,
                root: classes.listItemTextRoot,
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(DrawerContent);
// {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} above InboxIcon ln 30

const ListComponent = ({ item, classes }) => {
  let { text, action, icon } = item;
  return (
    <ListItem
      button
      key={text}
      classes={{ root: classes.listItemRoot }}
      onClick={action}
    >
      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        classes={{
          primary: classes.listItemTextPrimary,
          root: classes.listItemTextRoot,
        }}
      />
    </ListItem>
  );
};
