import dynamic from "next/dynamic";
import {
  AUTHENTICATE_USER,
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
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const authenticateUser = (user) => async (dispatch) => {
  console.log("Did fire in here with: ", user);
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

export const addNewUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/newUser", user, config);
    dispatch({
      type: REGISTER_NEW_USER,
      payload: res.data,
    });
    return true;
  } catch (error) {
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
