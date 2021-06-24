import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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
  const [heightOffsetStyle, setHeightOffsetStyle] = useState({});
  useEffect(() => {
    let style = {
      marginTop: `${navHeight}px`,
    };
    if (navHeight !== 0 && deviceWidth >= 1920) {
      // setMobileOpen(true);
      setHeightOffsetStyle(style);
    }
  }, [navHeight]);
  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.outerContainer} style={heightOffsetStyle}>
      <Divider />
      <List className={classes.listRoot}>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text} classes={{ root: classes.listItemRoot }}>
            <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
