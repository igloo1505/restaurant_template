import React, { useEffect, Fragment, useState } from "react";
import axios from "axios";
import Navbar from "../components/portalAuthenticated/Navbar";
import SnackbarSwitcher from "../components/modalsAndAlerts/SnackbarSwitcher";
import SimpleBooleanSnackbar from "../components/SimpleBooleanSnackbar";
import Alert from "../components/modalsAndAlerts/Modal";
import Grocery_navbarMenu from "../components/portalAuthenticated/Grocery_navbarMenu";
import Bookmarks_navbarMenu from "../components/portalAuthenticated/Bookmarks_navbarMenu";
import AddRecipeKeyboardShortcuts from '../components/modalContent/AddRecipeKeyboardShortcuts';
import SettingsModal from '../components/modalsAndAlerts/SettingsModal';
import SetShortcutsBackdrop from '../components/modalsAndAlerts/SetKeyboardShortcutBackdrop';
import RecipeReviewModal from "../components/modalsAndAlerts/RecipeReviewModal";
import Drawer from "../components/portalAuthenticated/Drawer";
import ReviewRecipeBeforeSubmission from '../components/modalsAndAlerts/ReviewRecipeBeforeSubmission';
import AccountIconMenu from "../components/portalAuthenticated/AccountIconMenu";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { useRouter } from "next/router"
import store, { wrapper } from "../stateManagement/store";
import { removeBoxShadow } from "../stateManagement/uiActions";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "../styles/MUITheme";
// import { tryAutoLogin } from "../stateManagement/userActions";
import * as userActions from "../stateManagement/userActions";
import setAuthToken from "../stateManagement/setAuth";
// import { sw } from "../util/serviceWorker-main";
import { settingKeysKeyup, settingKeysKeydown, handleEventListeners } from "../util/SettingShortcutsListeners"
import * as Types from "../stateManagement/TYPES";

const cache = createCache({
  key: "css",
  prepend: true,
});
cache.compat = true;







function MyApp({ Component, pageProps, ...rest }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const [localState, setAppState] = useState({})

  const setLocalState = (par) => {
    console.log('par: ', par);
    let state = store.getState();
    console.log("setting setLocalState p-b", localState);
    console.log('state before setting p-b: ', state);
    setAppState({ ...state })
  }
  useEffect(() => {
    const unSubscribe = store.subscribe(setLocalState)
    return () => {
      unSubscribe()
    }
  }, [])

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // useEffect(() => {
  //   // store.
  //   store.subscribe(setLocalState)

  //   return {
  //   }
  // }, [])

  let state = store.getState();
  const router = useRouter();



  useEffect(() => {
    console.log('state?.UI?.settingsModal?.settingKeysBackdrop: ', state?.UI?.settingsModal?.settingKeysBackdrop);
    if (typeof window !== "undefined") {
      handleEventListeners()
    }
  }, [state?.UI?.settingsModal?.settingKeysBackdrop, state?.user?.userSettings?.allowKeyboardShortcuts]);

  const setViewPortDimensions = () => {
    if (typeof window !== "undefined") {
      store.dispatch({ type: Types.IS_CLIENT });
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      store.dispatch({
        type: Types.SET_VIEWPORT_DIMENSIONS,
        payload: {
          width: vw,
          height: vh,
        },
      });
    }
  };
  const setNavbarHeight = () => {
    if (typeof window !== "undefined") {
      let em = document.getElementsByClassName("MuiAppBar-root");
      if (em.length > 0) {
        let height = getComputedStyle(em[0]);
        height = Math.ceil(
          parseFloat(height.height.slice(0, height.height.length - 2))
        );
        store.dispatch({ type: Types.SET_NAV_HEIGHT, payload: height });
      }
    }
  };
  // Set viewport dimensions and add listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewPortDimensions();
      setNavbarHeight();
      window.addEventListener("resize", () => {
        setViewPortDimensions();
        setNavbarHeight();
      });
    }
  }, []);

  // Remove autofill styling
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("animationstart", (e) => {
        if (e.animationName === "mui-auto-fill") {
          e.stopPropagation();
        }
      });
    }
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Drawer />
          <RecipeReviewModal />
          <SetShortcutsBackdrop />
          <SettingsModal />
          <Grocery_navbarMenu />
          <AddRecipeKeyboardShortcuts />
          <Bookmarks_navbarMenu />
          <AccountIconMenu />
          <ReviewRecipeBeforeSubmission />
          <Alert />
          <SnackbarSwitcher />
          <SimpleBooleanSnackbar />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default wrapper.withRedux(MyApp);

// <Navbar />
// <CacheProvider value={cache}>
