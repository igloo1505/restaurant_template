import {
  SET_LOADING,
  GET_RECIPES,
  RECIPE_ERROR,
  TOGGLE_STOCK,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  EDIT_MENU_ITEM,
  RETURN_SINGLE_RECIPE,
} from "./TYPES";

const initialState = {
  token: "",
  loading: false,
  allRecipes: [],
  filtered: null,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_MENU_ITEM:
      console.log("action.payload", action.payload);
      console.log("action.payload", action.payload);
      return {
        ...state,
        allRecipes: [...state.allRecipes, action.payload],
        loading: false,
      };

    case RETURN_SINGLE_RECIPE:
      return {
        ...state,
        filtered: state.allRecipes.filter((r) => r._id === action.payload._id),
      };
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        loading: false,
      };

    case EDIT_MENU_ITEM:
      let filteredRecipes = state.allRecipes.filter(
        (r) => r._id !== action.payload._id
      );
      filteredRecipes.push(action.payload);
      return {
        ...state,
        allRecipes: filteredRecipes,
        loading: false,
      };
    case REMOVE_MENU_ITEM:
      return {
        ...state,
        allRecipes: state.allRecipes.filter(
          (r) => r._id !== action.payload._id
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default recipeReducer;
