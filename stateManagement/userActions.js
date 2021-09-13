import * as Types from "./TYPES";
import axios from "axios";
import useAxios from "./useAxios";
import cookie from "json-cookie";
import store from "./store";

const getUserId = () => {
  let state = store.getState();
  if (
    typeof state.user?.self?._id !== "undefined" &&
    typeof state.user?.self?._id !== null
  ) {
    return state.user.self._id;
  } else {
    return false;
  }
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
// const {
//   user: {
//     triedAutoLogin,
//     self: { _id: idInState },
//   },
// } = store.getState();

export const authenticateUser = (user) => async (dispatch) => {
  let res = await useAxios({
    method: "post",
    url: "/api/portal/login",
    data: user,
  });
  console.log("RES: ", res);
  if (res.status === 200) {
    dispatch({
      type: Types.AUTHENTICATE_USER,
      payload: res.data,
    });
  }
  if (res.status !== 200) {
    dispatch({
      type: Types.AUTHENTICATION_ERROR,
      payload: "User authentication error.",
    });
  }
};

export const tryAutoLogin = () => async (dispatch) => {
  console.log("RUNNING AUTOLOGIN...");
  debugger;
  if (typeof window !== "undefined") {
    let rememberMe = cookie.get("rememberMe");
    let email = cookie.get("email");
    if (rememberMe && email && !triedAutoLogin) {
      try {
        let res = await useAxios({
          method: "get",
          url: "/api/portal/autoLogin",
        });
        if (res.status === 200) {
          dispatch({
            type: Types.AUTO_LOGIN_SUCCESS,
            payload: res.data,
          });
          return res.data;
        }
        if (res.status !== 200) {
          dispatch({
            type: Types.AUTO_LOGIN_FAIL,
          });
          return res.data;
        }
        return { msg: "what the flying fuck" };
      } catch (error) {
        console.log("ERROR: ", error);
        return error;
      }
    }
  }
};

export const addNewUser = (user) => async (dispatch) => {
  console.log("fired addNewUser with: ", user);
  const res = await axios.post("/api/portal/newUser", user, config);
  if (res.status === 200) {
    dispatch({
      type: Types.REGISTER_NEW_USER,
      payload: res.data,
    });
    return true;
  }
  if (res.status !== 200) {
    dispatch({
      type: Types.ERROR_WITH_DIALOGUE,
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
  // try {
  //   const res = await axios.get("/api/portal/", config);
  //   dispatch({
  //     type: Types.GET_ALL_USERS,
  //     payload: res.data,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: Types.USER_ERROR,
  //     payload: error,
  //   });
  // }
};

export const removeUser = (userID) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/removeUser/", userID, config);
    dispatch({
      type: Types.REMOVE_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: Types.USER_ERROR,
      payload: error,
    });
  }
};

export const updateUserInfo = (user) => async (dispatch) => {
  try {
    const res = await axios.post("api/portal/updateUserInfo", user, config);
    dispatch({
      type: Types.UPDATE_USER_INFO,
      payload: res.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: Types.USER_ERROR,
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

export const logOut = () => async (dispatch) => {
  console.log("logging out...");
  cookie.delete("rememberMe");
  cookie.delete("userId");
  cookie.delete("token");
  dispatch({ type: Types.LOGOUT });
  await axios.post("/api/clearLogin", config);
};

export const forgotPassword = () => async (dispatch) => {
  let props = { email: "aiglinski@icloud.com" };
  console.log("Running forgotPassword");
  try {
    let res = await axios.post("/api/forgotPassword", props, config);
    dispatch({ type: Types.FORGOT_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: Types.FORGOT_PASSWORD_FAIL });
  }
};

export const handleGroceryItem = (item) => async (dispatch) => {
  let userId = getUserId();
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message: "You must be logged in to add a grocery item.",
        variant: "error",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 2500,
      },
    });
  }
  let route = item.method === "add" ? "addGroceryItem" : "removeGroceryItem";
  let _type =
    item.method === "add" ? Types.ADD_GROCERY_ITEM : Types.REMOVE_GROCERY_ITEM;
  let res = await useAxios({
    method: "post",
    url: `/api/portal/recipes/${route}`,
    data: {
      ingredientId: item.ingredientId,
      userId: userId,
    },
  });
  switch (res.status) {
    case 200:
      return dispatch({
        type: _type,
        payload: res.data,
      });
    case 401:
    default:
      return dispatch({
        type: Types.GROCERY_ITEM_ERROR,
        payload: res.data,
      });
  }
};

const sendUploadProgress = (progress) => {
  console.log("progress: ", progress);
};

export const addProfileImage = (formData) => async (dispatch) => {
  // console.log("formData: ", formData);
  let userId = getUserId();
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message:
          "There was an error adding that image. Please try signing in again.",
        variant: "error",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 4000,
      },
    });
  }
  try {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        let progress = Math.round((event.loaded * 100) / event.total);
        sendUploadProgress(progress);
      },
    };
    const res = await axios.post(
      "/api/portal/addProfileImage",
      formData,
      config
    );

    dispatch({ type: Types.ADD_PROFILE_IMAGE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: Types.ADD_PROFILE_IMAGE_FAIL, payload: error });
  }
};
