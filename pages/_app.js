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
import * as KeyIcons from "../components/modalsAndAlerts/KeyIcons"
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
import * as Types from "../stateManagement/TYPES";

const cache = createCache({
  key: "css",
  prepend: true,
});
cache.compat = true;



const settingKeysModal = (state) => {
  return state?.UI?.settingsModal?.settingKeysBackdrop
}

const allowKeys = (state) => {
  return state?.user?.userSettings?.allowKeyboardShortcuts
}



const disallowKeys = [
  "CapsLock",
  "Tab",
  "Enter",
]

const _specialKeys = {
  "Shift": {
    booleanCheck: "shiftKey",
    icon: KeyIcons.ShiftIcon,
    isSpecialKey: true,
    isActive: false
  },
  "Alt": {
    booleanCheck: "altKey",
    icon: KeyIcons.AltIcon,
    isActive: false,
    isSpecialKey: true,
  },
  "Meta": {
    booleanCheck: "metaKey",
    icon: KeyIcons.CommandIcon,
    isActive: false,
    isSpecialKey: true,
  },
  "Control": {
    booleanCheck: "ctrlKey",
    icon: KeyIcons.ControlIcon,
    isActive: false,
    isSpecialKey: true,
  },
}



const SpecialKeys = (_localState) => {
  let state = store.getState();
  let currentKeys = state?.user?.userSettings?.currentActiveKeys
  let _currentKeys = _localState?.user?.userSettings?.currentActiveKeys
  // console.log('state.user.userSettings.currentActiveKeys: ', state.user.userSettings.currentActiveKeys);
  console.log('currentKeys: ', currentKeys);
  console.log('localState currentKeys: ', _currentKeys);
  const setSpecialKeys = (newKeys) => {
    store.dispatch({
      type: Types.SET_CURRENT_ACTIVE_KEYS,
      payload: newKeys,
    })
  }

  return {
    "Shift": {
      pressed: state?.user?.userSettings?.skListeners?.shiftPressed,
      setPressed: (newValue, event) => {
        // RESUME Pick this back up here and move icons into a switch component and just pass a string to redux ["cmd", "shft", "ctrl", "alt", "standard"]
        store.dispatch({
          type: Types.SET_LISTENER_KEY,
          payload: { shiftKey: newValue, _e: event }
        })

        let newKeys = state?.userSettings?.currentActiveKeys.filter((sk) => !sk?.isSpecialKey)
        if (newKeys?.length >= 2) {
          newKeys = newKeys?.splice(-2)
        }
        setSpecialKeys([
          _specialKeys.Shift
        ]
        )
      }
    },
    "Alt": {
      pressed: state?.user?.userSettings?.skListeners?.altPressed,
      setPressed: (newValue, event) => {
        store.dispatch({
          type: Types.SET_LISTENER_KEY,
          payload: { altKey: newValue, _e: event }
        })

        let newKeys = state?.userSettings?.currentActiveKeys.filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
        if (newKeys?.length >= 2) {
          newKeys = newKeys?.splice(-2)
        }
        console.log('newKeys: ', newKeys);
        setSpecialKeys([
          _specialKeys.Alt
        ]
        )
      }
    },
    "Meta": {
      pressed: state?.user?.userSettings?.skListeners?.metaPressed,
      setPressed: (newValue, event) => {
        store.dispatch({
          type: Types.SET_LISTENER_KEY,
          payload: { metaKey: newValue, _e: event }
        })
        let newKeys = state?.userSettings?.currentActiveKeys.filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
        if (newKeys?.length >= 2) {
          newKeys = newKeys?.splice(-2)
        }
        setSpecialKeys([
          _specialKeys.Meta
        ]
        )
      }
    },
    "Control": {
      pressed: state?.user?.userSettings?.skListeners?.controlPressed,
      setPressed: (newValue, event) => {
        store.dispatch({
          type: Types.SET_LISTENER_KEY,
          payload: { ctrlKey: newValue, _e: event }
        })
        let newKeys = state?.userSettings?.currentActiveKeys.filter((sk) => !sk?.isSpecialKey)?.slice(newKeys?.length - 2, newKeys?.length)
        if (newKeys?.length >= 2) {
          newKeys = newKeys?.splice(-2)
        }
        setSpecialKeys([
          _specialKeys.Control
        ]
        )
      }
    },
    setSpecialKeys: (newKeys) => {
      setSpecialKeys(newKeys)
    }
  }
}



function MyApp({ Component, pageProps, ...rest }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const [localState, set_appState] = useState({})

  const setLocalState = () => {
    let state = store.getState();
    set_appState(state)
    console.log('sks', state?.user?.userSettings.skListeners);
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

  const settingKeyDownListener = (e) => {
    const bypassKeys = ["Escape", "Tab", "Enter"]
    if (!bypassKeys.includes(e.key)) {
      e.preventDefault()
    }
    if (e.repeat) {
      return
    };
    if (SpecialKeys(localState)[e.key]) {
      SpecialKeys(localState)[e.key].setPressed(true)
    }

    if (!SpecialKeys(localState)[e.key]) {
      if (disallowKeys.includes(e.key) || e.key === "" || e.key.length > 1) {
        return;
      }
      let newSpecialKeys = localState?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.isSpecialKey)
      console.log('newSpecialKeys: ', newSpecialKeys);
      console.log('newSpecialKeys factors: ', localState?.user?.userSettings?.currentActiveKeys);
      console.log('localState', localState);
      console.log('sks', localState?.user?.userSettings.skListeners, e.repeat);
      let forSomeReasonINeedThis = localState?.user?.userSettings?.currentActiveKeys?.filter((sk) => sk.keyCode === e.keyCode)
      console.log('forSomeReasonINeedThis: ', forSomeReasonINeedThis);
      if (forSomeReasonINeedThis?.length > 0 || newSpecialKeys?.length >= 2) {
        return
      }
      console.log('Types.SET_CURRENT_ACTIVE_KEYS: 245', Types.SET_CURRENT_ACTIVE_KEYS);
      store.dispatch({
        type: Types.SET_CURRENT_ACTIVE_KEYS,
        payload: [
          // ...newSpecialKeys,
          {
            keyCode: e.keyCode,
            key: e.key,
            code: e.code,
            isActive: true,
            isSpecialKey: false,
          }
        ]
      })
    }
  }
  const settingKeyUpListener = (e) => {
    e.preventDefault()
    if (e.repeat) {
      return
    };

    if (SpecialKeys()[e.key]) {
      
      SpecialKeys()[e.key].setPressed(false, e)
    }
    if (!SpecialKeys()[e.key]) {
      let newKeys = localState?.user?.userSettings?.currentActiveKeys.filter((sk) => sk.key !== e.key)
      console.log('newKeys: ', newKeys, e.key, localState);
      SpecialKeys(localState).setSpecialKeys(newKeys)
    }
  }

  useEffect(() => {
    console.log('state?.UI?.settingsModal?.settingKeysBackdrop: ', state?.UI?.settingsModal?.settingKeysBackdrop);
    if (typeof window !== "undefined") {
      if (state?.user?.userSettings?.allowKeyboardShortcuts || state?.UI?.settingsModal?.settingKeysBackdrop) {
        document.addEventListener("keydown", settingKeyDownListener);
        document.addEventListener("keyup", settingKeyUpListener);
      }
      if (!state?.user?.userSettings?.allowKeyboardShortcuts || !state?.UI?.settingsModal?.settingKeysBackdrop) {
        document.removeEventListener("keydown", settingKeyDownListener);
        document.removeEventListener("keyup", settingKeyUpListener);
      }
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
