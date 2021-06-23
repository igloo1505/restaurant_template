import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
// import AccountIcon from "@material-ui/icons/AccountCircle";
// import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleTwoTone";
import MyAccountIcon from "./AccountIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DrawerContent from "./DrawerContent";

const drawerWidth = 240;
const breakpoint = 1920;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "transparent",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerRoot: {
    width: drawerWidth,
  },
  toolbarIconButton: {
    "&:hover": {
      backgroundColor: "rgba(120,172,233, 0.1)",
    },
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerButtonLabel: {
    backgroundColor: "transparent",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItemIcon: {
    root: {
      color: "black",
      border: "1px solid red",
    },
  },
}));

function ResponsiveDrawer({
  UI: {
    viewport: { width: deviceWidth, navHeight },
    accountMenu: { el: menuAnchor },
    portalDrawer: { open: mobileOpen },
  },
  props,
}) {
  const [isPermanent, setIsPermanent] = useState(false);
  const [shouldHideMenuButton, setShouldHideMenuButton] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    if (deviceWidth >= 1920) {
      setIsPermanent(true);
      setShouldHideMenuButton(true);
    }
    if (deviceWidth < 1920) {
      setIsPermanent(false);
      setShouldHideMenuButton(false);
    }
  }, [deviceWidth]);

  const setMenuAnchor = (e) => {
    dispatch({ type: Types.SHOW_ACCOUNT_MENU });
  };
  return (
    <Fragment>
      <DrawerSwitcher
        classes={classes}
        deviceWidth={deviceWidth}
        mobileOpen={mobileOpen}
      />
    </Fragment>
  );
}

const DrawerSwitcher = (props) => {
  const { deviceWidth, classes, appbarClasses, mobileOpen, setMobileOpen } =
    props;
  const [ios, setiOs] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const iOS =
        process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
      setiOs(iOS);
    }
  }, []);
  const handleDrawerToggle = () => {
    if (mobileOpen) {
      dispatch({ type: Types.CLOSE_DRAWER });
    }
    if (!mobileOpen) {
      dispatch({ type: Types.OPEN_DRAWER });
    }
  };
  const theme = useTheme();
  const getContainer = () => {
    if (typeof window !== "undefined") {
      return window.document.body;
    } else {
      return undefined;
    }
  };
  if (deviceWidth < breakpoint) {
    return (
      <Fragment>
        <SwipeableDrawer
          container={getContainer}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          disableBackdropTransition={!ios}
          disableDiscovery={ios}
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawerRoot,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton
              onClick={handleDrawerToggle}
              classes={{
                root: classes.toolbarIconButton,
                label: classes.drawerButtonLabel,
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <DrawerContent />
        </SwipeableDrawer>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawerRoot,
          }}
          variant="permanent"
          open
        >
          <DrawerContent setMobileOpen={setMobileOpen} />
        </Drawer>
      </Fragment>
    );
  }
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(ResponsiveDrawer);
