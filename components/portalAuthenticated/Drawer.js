import React, { useEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import DrawerContent from "./DrawerContent";

const drawerWidth = 240;
const breakpoint = 1920;

// TODO Switch to permanent drawer based on viewport only if authenticated

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
          onOpen={handleDrawerToggle}
          swipeAreaWidth={mobileOpen ? 0 : 20}
          SwipeAreaProps={{ id: "swipeAreaDiv" }}
          disableBackdropTransition={!ios}
          disableDiscovery={ios}
          classes={{
            paper: classes.drawerPaper,
            root: classes.drawerRoot,
          }}
          ModalProps={{
            keepMounted: true,
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
  drawer: state.drawer,
  props: props,
});

export default connect(mapStateToProps)(ResponsiveDrawer);
