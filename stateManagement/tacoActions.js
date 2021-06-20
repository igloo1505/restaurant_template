import { GET_ALL_TACO_INGREDIENTS, TACO_ERROR, ADD_TACO_INGREDIENT } from "./TYPES";
import axios from "axios";
import store from "./store";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllTacoIngredients = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/portal/tacos", config);
    console.log("resssss", res.data);
    dispatch({
      type: GET_ALL_TACO_INGREDIENTS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: TACO_ERROR,
      payload: error,
    });
  }
};

export const addNewTacoIngredient = (item) => async (dispatch) => {
  try {
    const res = await axios.post("/api/portal/tacos", item, config);
    dispatch({ type: ADD_TACO_INGREDIENT, payload: res.data });
  } catch (error) {
    dispatch({
      type: TACO_ERROR,
      payload: error,
    });
  }
};
