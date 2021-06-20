import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
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
const useStylesAppbar = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("xl")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("xl")]: {
      width: "100vw",
      backgroundColor: theme.palette.primary.main,
      zIndex: 1301,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  hideMenuButton: {
    display: "none",
  },
  appbarShifted: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: 1301,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appbarLabelText: {
    color: "#fff",
  },
  toolbarRoot: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xl")]: {
      width: "100vw",
      backgroundColor: theme.palette.primary.main,
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  },
  toolbarIcon: {
    color: "pink",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  menuButtonRoot: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  menuButtonLabel: {
    color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "transparent",
    // border: "1px solid red",
  },
  menuIconRoot: {
    backgroundColor: "transparent",
  },
}));
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
  },
  props,
}) {
  const [toolbarOffsetStyle, setToolbarOffsetStyle] = useState({
    marginLeft: 0,
  });
  const [shouldHideMenuButton, setShouldHideMenuButton] = useState(false);

  const { window } = props;
  const classes = useStyles();
  const appbarClasses = useStylesAppbar();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (deviceWidth >= 1920) {
      setShouldHideMenuButton(true);
    }
    if (deviceWidth < 1920) {
      setShouldHideMenuButton(false);
    }
  }, [deviceWidth]);

  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setShouldHideMenuButton(false);
    }
    if (!mobileOpen) {
      setShouldHideMenuButton(true);
    }
    setMobileOpen(!mobileOpen);
  };

  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="primary"
        classes={{ root: appbarClasses.appBar }}
        className={clsx(
          appbarClasses.appBar,
          mobileOpen && appbarClasses.appbarShifted
        )}
      >
        <Toolbar
          classes={{ root: appbarClasses.toolbarRoot }}
          // className={clsx(mobileOpen && appbarClasses.appbarShifted)}
          // TODO ADD STYLE TWEAKS BACK IN
          // style={shouldHideMenuButton ? { paddingLeft: "16px" } : {}}
        >
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            classes={{
              root: appbarClasses.menuButtonRoot,
              label: appbarClasses.menuButtonLabel,
            }}
            // TODO ADD STYLE TWEAKS BACK IN
            // className={clsx(
            //   shouldHideMenuButton && appbarClasses.hideMenuButton
            // )}
          >
            <MenuIcon
              className={clsx(
                appbarClasses.menuIconRoot,
                shouldHideMenuButton && appbarClasses.hideMenuButton
              )}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            classes={{ root: appbarClasses.appbarLabelText }}
          >
            Developers'
            <span
              style={{
                backgroundColor: "transparent",
                fontSize: "1.5rem",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              R
            </span>
            'us
          </Typography>
        </Toolbar>
      </AppBar>
      <DrawerSwitcher
        classes={classes}
        appbarClasses={appbarClasses}
        deviceWidth={deviceWidth}
        setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </Fragment>
  );
}

const DrawerSwitcher = (props) => {
  const {
    deviceWidth,
    classes,
    appbarClasses,
    handleDrawerToggle,
    mobileOpen,
    setMobileOpen,
  } = props;
  const [ios, setiOs] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const iOS =
        process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
      setiOs(iOS);
    }
  }, []);
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
          <div className={appbarClasses.toolbarIcon}>
            <IconButton onClick={handleDrawerToggle}>
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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps)(ResponsiveDrawer);
