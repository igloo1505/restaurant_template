import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import * as Types from "../../stateManagement/TYPES";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MyAccountIcon from "./AccountIcon";
import MenuIcon from "@material-ui/icons/Menu";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import NavbarSearchInput from "./NavbarSearchInput";

const useStylesAppbar = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up("xl")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down("xl")]: {
      // width: "100vw",
      backgroundColor: theme.palette.primary.main,
      zIndex: 1303,
      transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  accountIconButton: {},
  accountIconButtonPermanent: {
    marginLeft: "auto",
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
  favoriteIconButton: { marginLeft: "auto" },
  favoriteIconButtonPermanent: {},
  favoriteIconButtonLabel: { color: "#fff", backgroundColor: "transparent" },
  hideMenuButton: {
    display: "none",
  },
  appbarShifted: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: 1299,
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
      width: `calc(100vw - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
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
  hideMenuButton: { display: "none" },
  link: {
    padding: "0 1rem !important",
    position: "absolute",
    right: "1rem",
  },
  linkTypography: {
    color: "#fff",
    fontSize: "1rem",
    position: "absolute",
    right: "2rem",
    cursor: "pointer",
  },
}));
const drawerWidth = 240;

const Navbar = ({
  isOpen,
  loggedIn,
  isSignUp,
  user: { _id },
  viewport: { width: deviceWidth, height: deviceHeight },
}) => {
  const dispatch = useDispatch();
  let router = useRouter();
  const handleSignInClick = () => {
    if (router.pathname === "/portal" && isSignUp) {
      dispatch({ type: Types.TOGGLE_SIGNUP_FORM });
    }
    console.log("router", router);
  };
  const [shiftAppbar, setShiftAppbar] = useState(false);
  useEffect(() => {
    // debugger;
    if (deviceWidth === 0) {
      let shouldShift = isOpen ? true : false;
      return setShiftAppbar(shouldShift);
    }
    if (deviceWidth >= 1920) {
      setShiftAppbar(true);
    }
    if (isOpen) {
      setShiftAppbar(true);
    }
    if (deviceWidth < 1920 || !isOpen) {
      setShiftAppbar(false);
    }
  }, [deviceWidth, isOpen]);

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

  // TODO Show favorites screen here
  const showFavorites = () => console.log("SHOW FAVORITES HERE");

  const [isPermanent, setIsPermanent] = useState(false);
  const [shouldHideMenuButton, setShouldHideMenuButton] = useState(false);
  useEffect(() => {
    if (deviceWidth >= 1920) {
      setIsPermanent(true);
      setShouldHideMenuButton(true);
      setShiftAppbar(true);
    }
    if (deviceWidth < 1920 && !isOpen) {
      setIsPermanent(false);
      setShouldHideMenuButton(false);
      setShiftAppbar(false);
    }
  }, [deviceWidth, deviceHeight]);
  const appbarClasses = useStylesAppbar();
  return (
    <Fragment>
      <AppBar
        position="fixed"
        color="primary"
        classes={{
          root: clsx(
            appbarClasses.appBar,
            isOpen && appbarClasses.appbarShifted
          ),
        }}
      >
        <Toolbar
          classes={{
            root: clsx(
              appbarClasses.toolbarRoot,
              shiftAppbar && appbarClasses.toolbarRootOpen
            ),
          }}
        >
          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            classes={{
              root: clsx(
                appbarClasses.menuButtonRoot,
                shiftAppbar && appbarClasses.hideMenuButton
              ),
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
            Ressippi
          </Typography>
          {loggedIn && (
            <IconButton
              color="secondary"
              aria-controls="account-menu"
              aria-haspopup="true"
              id="favoriteIconButton"
              edge="end"
              onClick={(e) => showFavorites()}
              classes={{
                root: clsx(
                  !isPermanent
                    ? appbarClasses.favoriteIconButton
                    : appbarClasses.favoriteIconButtonPermanent
                ),
                label: appbarClasses.favoriteIconButtonLabel,
              }}
            >
              <BookmarkIcon
                fontSize="large"
                classes={{ root: appbarClasses.accountIconRoot }}
              />
            </IconButton>
          )}
          {loggedIn && (
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
          )}
          {!loggedIn && (
            <NextLink href="/portal">
              <Typography
                variant="h6"
                noWrap
                align="right"
                classes={{ root: appbarClasses.linkTypography }}
                onClick={handleSignInClick}
              >
                Sign in
              </Typography>
            </NextLink>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  isOpen: state.UI.portalDrawer.open,
  user: state.user.self,
  loggedIn: state.user.loggedIn,
  viewport: state.UI.viewport,
  isSignUp: state.UI.login.isSignUp,
});

export default connect(mapStateToProps)(Navbar);
