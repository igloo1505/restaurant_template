/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react";
import NextLink from "next/link";
import { connect, useDispatch } from "react-redux";
import { useRouter } from "next/router"
import * as Types from "../../stateManagement/TYPES";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { gsap } from 'gsap'
import IconButton from "@material-ui/core/IconButton";
import MyAccountIcon from "./AccountIcon";
import MenuIcon from "@material-ui/icons/Menu";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import GroceryIcon from "@material-ui/icons/LocalGroceryStore";
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
      // transition: "margin-left 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      transition: "width 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  accountIconButton: {},
  accountIconButtonPermanent: {},
  accountIconButtonLabel: {
    color: "#fff",
    backgroundColor: "transparent",
  },
  accountIconRoot: {
    fill: theme.palette.secondary.main,
  },
  favoriteIconButton: { marginRight: "4px", "&:hover": { cursor: "default" } },
  groceryIcon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  bookmarkIcon: {
    color: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
  groceryIconButton: {
    marginLeft: "auto",
    marginRight: "4px",
    "&:hover": { cursor: "default" },
  },
  groceryIconButtonPermanent: { marginLeft: "auto" },
  favoriteIconButtonLabel: { color: "#fff", backgroundColor: "transparent" },
  hideMenuButton: {
    display: "none",
  },
  appbarShifted: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    zIndex: 1299,
    // transition: "margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
    backgroundColor: "transparent",
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

  // }
}));
const drawerWidth = 240;

const Navbar = ({
  isOpen,
  loggedIn,
  isSignUp,
  user: { _id },
  viewport: { width: deviceWidth, height: deviceHeight },
  userSettings: {
    settingProgress: {
      elapsedTime,
      toggle: _currentToggleValue,
      originalValue: originalTimerValue
    }
  }
}) => {
  // debugger
  const dispatch = useDispatch();
  console.log("userRouter avoiding redirect", useRouter)
  let router = useRouter();


  const handleSignInClick = () => {
    console.log("Router avoiding redirect", router)
    if (router.pathname === "/portal" && isSignUp) {
      dispatch({ type: Types.TOGGLE_SIGNUP_FORM });
    }
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
  const handleBookmarkClick = () => {
    dispatch({
      type: Types.SHOW_BOOKMARK_MENU,
    });
  };
  const showGroceries = () => {
    dispatch({
      type: Types.SHOW_GROCERY_MENU,
    });
  };

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
      <NotificationBanner />
      <AppBar
        position="fixed"
        color="primary"
        classes={{
          root: clsx(
            appbarClasses.appBar,
            isOpen && appbarClasses.appbarShifted,
            "navbar-background-shift"
          ),
        }}
      >
        <Toolbar
          classes={{
            root: clsx(
              appbarClasses.toolbarRoot,
              shiftAppbar && appbarClasses.toolbarRootOpen,
              "navbar-background-shift"
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
                shiftAppbar && appbarClasses.hideMenuButton,
                "navbar-background-shift"
              ),
              label: clsx(appbarClasses.menuButtonLabel, "navbar-foreground-shift"),
            }}
          >
            <MenuIcon
              className={clsx(
                appbarClasses.menuIconRoot,
                shouldHideMenuButton && appbarClasses.hideMenuButton,
                "navbar-foreground-shift"
              )}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            classes={{ root: clsx(appbarClasses.appbarLabelText, "navbar-foreground-shift") }}
          >
            Rad<span className="navbar_italic">-ish</span>
          </Typography>
          {loggedIn && (
            <IconButton
              color="secondary"
              aria-haspopup="true"
              aria-controls="grocery-menu"
              id="groceryIconButton"
              edge="end"
              onClick={(e) => showGroceries()}
              classes={{
                root: clsx(
                  !isPermanent
                    ? appbarClasses.groceryIconButton
                    : appbarClasses.groceryIconButtonPermanent
                ),
                label: appbarClasses.groceryIconButtonLabel,
              }}
            >
              <GroceryIcon
                fontSize="large"
                classes={{ root: appbarClasses.groceryIcon }}
              />
            </IconButton>
          )}
          {loggedIn && (
            <IconButton
              color="secondary"
              aria-haspopup="true"
              id="favoriteIconButton"
              edge="end"
              onClick={handleBookmarkClick}
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
                classes={{ root: appbarClasses.bookmarkIcon }}
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
                label: clsx(appbarClasses.accountIconButtonLabel, "navbar-foreground-shift"),
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
  isOpen: state.UI.mainDrawer.open,
  user: state.user.self,
  loggedIn: state.user.loggedIn,
  viewport: state.UI.viewport,
  isSignUp: state.UI.login.isSignUp,
  userSettings: state.user.userSettings
});

const useStylesNotificationBanner = makeStyles((theme) => ({
  notificationBannerOuter: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    // zIndex: theme.zIndex.drawer + 1,
    zIndex: 99999999999999,
    height: "0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    "&.success": {
      backgroundColor: "#00E676",
    },
    "&.error": {
      backgroundColor: "#FF1744",
    },
    "&.social": {
      backgroundColor: "#D500F9",
    },
  },
  bannerCharacter: {
    fontSize: "2rem",
    marginRight: "0.5rem",
    display: "inline-block",
    color: "#fff"
  }
}))

const _mapStateToProps = (state, props) => ({
  props: props,
  bannerStuff: state.UI.notificationBanner,
  user: state.user,
});

const NotificationBanner = connect(_mapStateToProps)(({
  bannerStuff: {
    isOpen,
    variant,
    message,
    delay
  },
  user: {
    userSettings: {
      currentActiveKeys
    }
  }
}) => {
  const classes = useStylesNotificationBanner();
  const dispatch = useDispatch();
  const [animationInProgress, setAnimationInProgress] = useState([])

  useEffect(() => {
    if (isOpen) {
      let tl = animateBannerEntrance();
      setAnimationInProgress([tl]);
      setAnimationInProgress([...animationInProgress, tl]);
    }
  }, [isOpen])
  useEffect(() => {
    if (isOpen && currentActiveKeys.length < 3) {
      dispatch({
        type: Types.CLEAR_SET_SHORTCUTS_TIMER,
      })
    }
  }, [currentActiveKeys])

  useEffect(() => {
    if (isOpen) {
      const handleDismissal = () => {
        setTimeout(() => {
          dispatch({
            type: Types.HIDE_TOP_NOTIFICATION_BAR
          })
        }, delay)
      }
      setTimeout(() => {
        hideBanner({ handleDismissal })
      }, delay - 1500)
    }
  }, [isOpen, variant, message, delay])


  return (
    <div className={clsx(classes.notificationBannerOuter, "notification-banner-outer-container", variant && `${variant}`)}>
      <div className={classes.bannerTextContainer}>
        {message && [...message].map((ch, index) => {
          return (<Typography variant="h6" className={clsx(classes.bannerCharacter, "notification-banner-text")} key={`notification-banner-${index}`}>
            {ch}
          </Typography>)
        })}
      </div>
    </div>
  )
}
)


const animateBannerEntrance = () => {
  let tl = gsap.timeline()
  tl.fromTo(".notification-banner-outer-container", {
    height: "0px",
    // opacity: 0.,
    duration: 0.5,
    ease: "back.out(1.2, 0.2)"
  }, {
    height: "64px",
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.2, 0.2)"
  })
  tl.fromTo(".notification-banner-text", {
    x: 200,
    stagger: 0.1,
    opacity: 0,
    duration: 0.5,
    ease: "back.out(1.2, 0.2)"
  }, {
    x: 0,
    stagger: 0.1,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.2, 0.2)"
  })
  return tl
}


const hideBanner = ({ handleDismissal, immediate }) => {
  if (immediate) {
    let tl = gsap.timeline()
    tl.to(".notification-banner-outer-container", {
      height: "0px",
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.2, 0.2)"
    })
    tl.to(".notification-banner-text", {
      stagger: 0.1,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.2, 0.2)"
    })
    return tl
  }
  let tl = gsap.timeline()
  tl.fromTo(".notification-banner-text",
    {
      x: 0,
      stagger: 0.1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.2, 0.2)",
      // onComplete: handleDismissal,
    },
    {
      x: -200,
      stagger: 0.1,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.2, 0.2)",
      // onComplete: handleDismissal,
    }
  )
  // }
  tl.fromTo(".notification-banner-outer-container",
    {
      height: "64px",
      opacity: 1,
      duration: 0.5,
      onComplete: handleDismissal,
      ease: "back.out(1.2, 0.2)"
    },
    {
      height: "0px",
      // opacity: 0.,
      onComplete: handleDismissal,
      duration: 0.5,
      ease: "back.out(1.2, 0.2)"
    }, "+=0.2"
  )
  return tl
}


export default connect(mapStateToProps)(Navbar);