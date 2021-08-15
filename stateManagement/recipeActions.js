import * as Types from "./TYPES";
import useAxios from "./useAxios";
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

export const addRecipeImage = () => async (props) => {
  // let userId = getUserId();
  // if (!userId) {
  //   return dispatch({
  //     type: Types.SHOW_SNACKBAR,
  //     payload: {
  //       message:
  //         "There was an error retrieving recipes. Please try signing in again.",
  //       variant: "error",
  //       vertical: "top",
  //       horizontal: "center",
  //       transitionDirection: "down",
  //       hideIn: 4000,
  //     },
  //   });
  // }
  // let res = await useAxios({
  //   method: "get",
  //   url: "/api/portal/recipes/userCreatedRecipes",
  //   data: { userId },
  // });
  // switch (res.status) {
  //   case 200:
  //     return dispatch({
  //       type: Types.GET_OWN_RECIPES_SUCCESS,
  //       payload: res.data,
  //     });
  //   case 401:
  //   default:
  //     return dispatch({
  //       type: Types.GET_OWN_RECIPES_ERROR,
  //       payload: res.data,
  //     });
  // }
};
