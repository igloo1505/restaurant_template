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
} from "./TYPES";
let Modal;
import axios from "axios";
import cookie from "json-cookie";
import store from "../stateManagement/store";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
const {
  user: {
    self: { _id: idInState },
  },
} = store.getState();

export const authenticateUser = (user) => async (dispatch) => {
  console.log(idInState);
  try {
    const res = await axios.post("/api/portal/login", user, config);
    console.log("RES: ", res);
    dispatch({
      type: AUTHENTICATE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: error,
    });
  }
};

export const autoLogin = () => async (dispatch) => {
  console.log("Running autoLogin...");
  if (typeof window !== "undefined") {
    let rememberMe = cookie.get("rememberMe");
    if (rememberMe) {
      try {
        let res = await axios.get("/api/portal/autoLogin", config);
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
