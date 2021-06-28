import React, { useEffect, Fragment } from "react";
import Navbar from "../components/portalAuthenticated/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../stateManagement/store";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import theme from "../styles/MUITheme";
import setAuthToken from "../stateManagement/setAuth";

import {
  SET_VIEWPORT_DIMENSIONS,
  SET_NAV_HEIGHT,
} from "../stateManagement/TYPES";

const cache = createCache({
  key: "css",
  prepend: true,
});
cache.compat = true;

function MyApp({ Component, pageProps }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const setViewPortDimensions = () => {
    if (typeof window !== "undefined") {
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
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Fragment>
  );
}

export default MyApp;

// <Navbar />
// <CacheProvider value={cache}>
