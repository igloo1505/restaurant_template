import * as Types from "./TYPES";
import useAxios from "./useAxios";
import axios from "axios";
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

export const addNewRecipe = (recipe) => async (dispatch) => {
  let userId = getUserId();
  console.log("userId: ", userId);
  console.log("!!! recipe !!!", recipe);
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message: "To add a recipe you must be signed in.",
        variant: "warning",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 4000,
      },
    });
  }
  let res = await useAxios({
    method: "post",
    url: "/api/portal/recipes/newRecipe",
    data: { ...recipe, createdBy: userId },
  });
  switch (res.status) {
    case 200:
      return dispatch({
        type: Types.ADD_NEW_RECIPE_SUCCESS,
        payload: res.data,
      });
    case 401:
      return dispatch({ type: Types.AUTHENTICATION_ERROR, payload: res.data });
    default:
      return dispatch({
        type: Types.ADD_NEW_RECIPE_ERROR,
        payload: res?.data?.error,
      });
  }
};

export const getAllRecipesFromUser = (userId) => async (dispatch) => {
  try {
    let res = await useAxios({
      method: "get",
      url: "/api/portal/recipes/userCreatedRecipes",
      data: { createdBy: userId },
    });
    switch (res.status) {
      case 200:
        return dispatch({
          type: Types.GET_USER_RECIPES_SUCCESS,
          payload: res.data,
        });
      case 401:
        return dispatch({
          type: Types.AUTHENTICATION_ERROR,
          payload: res.data,
        });
      default:
        return dispatch({ type: Types.GET_USER_RECIPES_FAIL });
    }
  } catch (error) {}
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
  let userId = getUserId();
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message:
          "There was an error removing that recipe. Please try signing in again.",
        variant: "error",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 4000,
      },
    });
  }
  let res = await useAxios({
    method: "post",
    url: "/api/portal/recipes/deleteRecipe",
    data: { recipeId },
  });

  switch (res.status) {
    case 200:
      return dispatch({
        type: Types.REMOVE_RECIPE_SUCCESS,
        payload: res.data,
      });
    case 401:
      return dispatch({
        type: Types.REMOVE_RECIPE_ERROR,
        payload: res.data,
      });
    default:
      return dispatch({ type: Types.REMOVE_RECIPE_ERROR });
  }
};

export const getOwnRecipes = () => async (props) => {
  let userId = getUserId();
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message:
          "There was an error retrieving recipes. Please try signing in again.",
        variant: "error",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 4000,
      },
    });
  }
  let res = await useAxios({
    method: "get",
    url: "/api/portal/recipes/userCreatedRecipes",
    data: { userId },
  });

  switch (res.status) {
    case 200:
      return dispatch({
        type: Types.GET_OWN_RECIPES_SUCCESS,
        payload: res.data,
      });
    case 401:
    default:
      return dispatch({
        type: Types.GET_OWN_RECIPES_ERROR,
        payload: res.data,
      });
  }
};

const sendUploadProgress = (progress) => (dispatch) => {
  dispatch({
    type: Types.SEND_UPLOAD_PROGRESS,
    payload: { progress: progress },
  });
};

export const addRecipeImage = (formData) => async (dispatch) => {
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
        console.log("progress: ", progress);
        sendUploadProgress(progress);
      },
    };
    const res = await axios.post(
      "/api/portal/recipes/addRecipeImage",
      formData,
      config
    );

    dispatch({ type: Types.ADD_RECIPE_IMAGE, payload: res.data });
  } catch (error) {
    dispatch({ type: Types.ADD_RECIPE_IMAGE_ERROR, payload: error });
  }
};

export const handleFavorite = (fav) => async (dispatch) => {
  console.log("fav: ", fav);

  let userId = getUserId();
  if (!userId) {
    return dispatch({
      type: Types.SHOW_SNACKBAR,
      payload: {
        message: "You must be logged in to favorite that.",
        variant: "error",
        vertical: "top",
        horizontal: "center",
        transitionDirection: "down",
        hideIn: 3000,
      },
    });
  }
  let route = fav.method === "add" ? "addFavorite" : "removeFavorite";
  let _type =
    fav.method === "add"
      ? Types.ADD_RECIPE_FAVORITE
      : Types.REMOVE_RECIPE_FAVORITE;
  let res = await useAxios({
    method: "post",
    url: `/api/portal/recipes/${route}`,
    data: {
      recipeId: fav.recipeId,
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
        type: Types.RECIPE_FAVORITE_ERROR,
        payload: res.data,
      });
  }
};
