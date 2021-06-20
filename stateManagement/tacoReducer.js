import {
  AUTHENTICATE_USER,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  USER_ERROR,
  ERROR_WITH_MODAL,
  REMOVE_USER,
  RETURN_SINGLE_ITEM,
  UPDATE_USER_INFO,
  GET_ALL_TACO_INGREDIENTS,
  TACO_ERROR,
  ADD_TACO_INGREDIENT
} from "./TYPES";

const initialState = {
  tacoIngredients: {
    toppings: [],
    proteins: [],
    addOns: [],
    tortillas: [],
  },
  error: null,
};

export default function tacoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TACO_INGREDIENTS:
      let { toppings, proteins, addOns, tortillas } = action.payload;
      return {
        ...state,
        tacoIngredients: {
          ...state.tacoIngredients,
          toppings: toppings,
          proteins: proteins,
          addOns: addOns,
          tortillas: tortillas,
        },
      };
    case ADD_TACO_INGREDIENT:
      const {type} = action.payload
      return {
        ...state,
        tacoIngredients: {
          ...state.tacoIngredients,
          toppings: type === "toppings" ? [...state.tacoIngredients.toppings, action.payload] : state.tacoIngredients.toppings,
          proteins: type === "proteins" ? [...state.tacoIngredients.proteins, action.payload] : state.tacoIngredients.proteins,
          toppings: type === "toppings" ? [...state.tacoIngredients.toppings, action.payload] : state.tacoIngredients.toppings,
          tortillas: type === "tortillas" ? [...state.tacoIngredients.tortillas, action.payload] : state.tacoIngredients.tortillas,
        }
      }
    case TACO_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
