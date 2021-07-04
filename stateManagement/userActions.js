import {
  AUTHENTICATE_USER,
  LOGOUT,
  AUTO_LOGIN_SUCCESS,
  AUTO_LOGIN_FAIL,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  USER_ERROR,
  USER_ERROR_WITH_DIALOGUE,
  REMOVE_USER,
  ERROR_WITH_MODAL,
  UPDATE_USER_INFO,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
} from "./TYPES";
import axios from "axios";
import useAxios from "./useAxios";
import cookie from "json-cookie";
import store from "../stateManagement/store";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const {
  user: {
    triedAutoLogin,
    self: { _id: idInState },
  },
} = store.getState();

export const authenticateUser = (user) => async (dispatch) => {
  // try {
  // const res = await useAxios(axios.post("/api/portal/login", user, config));
  let res = await useAxios({
    method: "post",
    url: "/api/portal/login",
    data: user,
  });
  console.log("RES: ", res);
  if (res.status === 200) {
    dispatch({
      type: AUTHENTICATE_USER,
      payload: res.data,
    });
  }
  if (res.status !== 200) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: "User authentication error.",
    });
  }
  // } catch (error) {
  // dispatch({
  //   type: AUTHENTICATION_ERROR,
  //   payload: "Error from catch block.",
  // });
  // }
};

export const tryAutoLogin = () => async (dispatch) => {
  console.log("Running autoLogin...");
  if (typeof window !== "undefined") {
    let rememberMe = cookie.get("rememberMe");
    if (rememberMe && !triedAutoLogin) {
      try {
        let res = await useAxios({
          method: "get",
          url: "/api/portal/autoLogin",
        });
        if (res.status === 200) {
          dispatch({
            type: AUTO_LOGIN_SUCCESS,
            payload: res.data,
          });
        }
        if (res.status !== 200) {
          dispatch({
            type: AUTO_LOGIN_FAIL,
          });
        }
        return { msg: "what the flying fuck" };
      } catch (error) {
        console.log("ERROR: ", error);
      }
    }
  }
};

export const addNewUser = (user) => async (dispatch) => {
  console.log("fired addNewUser with: ", user);
  const res = await axios.post("/api/portal/newUser", user, config);
  if (res.status === 200) {
    dispatch({
      type: REGISTER_NEW_USER,
      payload: res.data,
    });
    return true;
  }
  if (res.status !== 200) {
    dispatch({
      type: ERROR_WITH_MODAL,
      payload: {
        error,
        modalText:
          "There was an error adding that user. Check to make sure that 'username' is available.",
        modalHeader: "Server Error",
        isConfirmation: false,
        isOpen: true,
      },
    });
    return false;
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/portal/", config);
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const removeUser = (userID) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/removeUser/", userID, config);
    dispatch({
      type: REMOVE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};

export const updateUserInfo = (user) => async (dispatch) => {
  try {
    const res = await axios.post("api/portal/updateUserInfo", user, config);
    dispatch({
      type: UPDATE_USER_INFO,
      payload: res.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
  return false;
};

export const validatePassword = (password) => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const spec = [
    ".",
    "?",
    ">",
    "<",
    ",",
    ":",
    ";",
    `"`,
    "}",
    "{",
    "[",
    "]",
    "|",
    "+",
    "=",
    "-",
    "_",
    ")",
    "(",
    "*",
    "&",
    "^",
    "%",
    "$",
    "#",
    "@",
    "!",
  ];
  let f = nums.filter((n) => password.includes(n));
  let z = spec.filter((s) => password.includes(s));
  if (f.length > 0 && z.length > 0) {
    console.log("true");
    return true;
  } else {
    console.log("false");
    return false;
  }
};

export const logOut = () => (dispatch) => {
  console.log("logging out...");
  cookie.delete("rememberMe");
  dispatch({ type: LOGOUT });
};

export const forgotPassword = () => async (dispatch) => {
  let props = { email: "aiglinski@icloud.com" };
  console.log("Running forgotPassword");
  try {
    let res = axios.post("/api/forgotPassword", props, config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL });
  }
};
