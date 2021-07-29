import * as Types from "./TYPES";
import useAxios from "./useAxios";
import store from "./store";
import cookie from "json-cookie";

export const addNewRecipe = (recipe) => async (dispatch) => {
  console.log("!!! recipe !!!", recipe);
  let res = await useAxios({
    method: "post",
    url: "/api/portal/recipes/newRecipe",
    data: recipe,
  });
  switch (res.data) {
    case 200:
      return dispatch({
        type: Types.ADD_NEW_RECIPE_SUCCESS,
        payload: res.data,
      });
    case 401:
      return dispatch({ type: Types.AUTHENTICATION_ERROR, payload: res.data });
    default:
      return dispatch({ type: Types.ADD_NEW_RECIPE_ERROR, payload: res.data });
  }
};

export const authenticateAddRecipeForm = (formData) => {
  //TODO Obviously change this
  let data = { ...formData };
  let obj = {};
  Object.keys(data).forEach((key) => {
    obj[key] = true;
  });
  return true;
};
