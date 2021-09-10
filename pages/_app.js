import React, { useEffect, Fragment } from "react";
import axios from "axios";
import Navbar from "../components/portalAuthenticated/Navbar";
import SnackbarSwitcher from "../components/modalsAndAlerts/SnackbarSwitcher";
import SimpleBooleanSnackbar from "../components/SimpleBooleanSnackbar";
import Alert from "../components/modalsAndAlerts/Modal";
import Grocery_navbarMenu from "../components/portalAuthenticated/Grocery_navbarMenu";
import RecipeReviewModal from "../components/modalsAndAlerts/RecipeReviewModal";
import Drawer from "../components/portalAuthenticated/Drawer";
import AccountIconMenu from "../components/portalAuthenticated/AccountIconMenu";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
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
import { sw } from "../util/serviceWorker-main";
import {
  SET_VIEWPORT_DIMENSIONS,
  SET_NAV_HEIGHT,
  IS_CLIENT,
} from "../stateManagement/TYPES";

const cache = createCache({
  key: "css",
  prepend: true,
});
cache.compat = true;

const reallyTryAutoLogin = () => {
  // tryAutoLogin();
};

function MyApp({ Component, pageProps, ...rest }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== undefined && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("../util/serviceWorker-main.js", { scope: "./" })
        .then((reg) => {
          // registration worked
          console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch((error) => {
          // registration failed
          console.log("Registration failed with " + error);
        });
    }
  }, []);

  const setViewPortDimensions = () => {
    if (typeof window !== "undefined") {
      store.dispatch({ type: IS_CLIENT });
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      store.dispatch({
        type: SET_VIEWPORT_DIMENSIONS,
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
        store.dispatch({ type: SET_NAV_HEIGHT, payload: height });
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
          <Grocery_navbarMenu />
          <AccountIconMenu />
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
