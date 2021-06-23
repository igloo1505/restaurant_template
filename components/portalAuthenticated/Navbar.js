import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import * as Types from "../../stateManagement/TYPES";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MyAccountIcon from "./AccountIcon";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
      transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  accountIconButton: { marginLeft: "auto" },
  accountIconButtonPermanent: {
    marginLeft: "unset",
    // position: "absolute",
  },
  accountIconButtonLabel: {
    color: "#fff",
    backgroundColor: "transparent",
    // "&:first-child": {
    // fill: theme.palette.secondary.main,
    // "&:first-child": {
    //   fill: theme.palette.alternative.main,
    // },
    // "&:nth-child(2)": {
    //   fill: theme.palette.secondary.main,
    // },
    // },
  },
  accountIconRoot: {
    fill: theme.palette.secondary.main,
    // float: "right",
  },
  hideMenuButton: {
    display: "none",
  },
  appbarShifted: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: 1301,
    transition: "margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transition: "width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
  },
  appbarLabelText: {
    color: "#fff",
  },

  toolbarRoot: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xl")]: {
      // width: "100vw",
      backgroundColor: theme.palette.primary.main,
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: 225,
      }),
    },
    [theme.breakpoints.up("xl")]: {
      width: `calc(100vw - ${drawerWidth})`,
      backgroundColor: theme.palette.primary.main,
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: 225,
      }),
    },
  },
  toolbarRootOpen: {
    backgroundColor: theme.palette.primary.main,
    width: `calc(100vw - ${drawerWidth}) !important`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: 225,
    }),
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
  toolbarIconButton: {
    "&:hover": {
      backgroundColor: "rgba(120,172,233, 0.1)",
    },
  },
  menuButtonRoot: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  menuButtonLabel: {
    // color: theme.palette.primary.contrastText,
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "transparent",
    // border: "1px solid red",
  },
  menuIconRoot: {
    backgroundColor: "transparent",
  },
}));
const drawerWidth = 240;

const Navbar = ({ isOpen, viewport }) => {
  const dispatch = useDispatch();
  const setMenuAnchor = (e) => {
    dispatch({ type: Types.SHOW_ACCOUNT_MENU });
  };
  const handleDrawerToggle = () => {
    if (isOpen) {
      dispatch({
        type: Types.CLOSE_DRAWER,
      });
    }
    if (!isOpen) {
      dispatch({
        type: Types.OPEN_DRAWER,
      });
    }
  };
  const { width: deviceWidth, height: deviceHeight } = viewport;
  const [isPermanent, setIsPermanent] = useState(false);
  const [shouldHideMenuButton, setShouldHideMenuButton] = useState(false);
  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   let em = document.getElementById("topLevelPortalContainer");
    //   if (em) {
    //     setMenuAnchor(em);
    //   }
    // }
    if (deviceWidth >= 1920) {
      setIsPermanent(true);
      setShouldHideMenuButton(true);
    }
    if (deviceWidth < 1920) {
      setIsPermanent(false);
      setShouldHideMenuButton(false);
    }
  }, [deviceWidth, deviceHeight]);
  console.log("isOpen", isOpen, viewport);
  const appbarClasses = useStylesAppbar();
  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="primary"
        classes={{ root: appbarClasses.appBar }}
        className={clsx(
          appbarClasses.appBar,
          isOpen && appbarClasses.appbarShifted
        )}
      >
        <Toolbar
          classes={{
            root: clsx(
              appbarClasses.toolbarRoot,
              isOpen && appbarClasses.toolbarRootOpen
            ),
          }}
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
          <IconButton
            color="secondary"
            aria-controls="account-menu"
            aria-haspopup="true"
            id="accountIconButton"
            edge="end"
            onClick={(e) => setMenuAnchor(e)}
            classes={{
              root: clsx(
                !isPermanent
                  ? appbarClasses.accountIconButton
                  : appbarClasses.accountIconButtonPermanent
              ),
              label: appbarClasses.accountIconButtonLabel,
            }}
          >
            <MyAccountIcon
              fontSize="large"
              classes={{ root: appbarClasses.accountIconRoot }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  isOpen: state.UI.portalDrawer.open,
  viewport: state.UI.viewport,
});

export default connect(mapStateToProps)(Navbar);
