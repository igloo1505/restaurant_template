import {
  AUTHENTICATE_USER,
  AUTO_LOGIN_SUCCESS,
  AUTHENTICATION_ERROR,
  REGISTER_NEW_USER,
  GET_ALL_USERS,
  AUTO_LOGIN_FAIL,
  USER_ERROR,
  REMOVE_USER,
  RETURN_SINGLE_ITEM,
  UPDATE_USER_INFO,
  LOGOUT,
} from "./TYPES";
import { getAllRecipesFromUser } from "./recipeActions";
import store from "./store";

const initialState = {
  loggedIn: false,
  triedAutoLogin: false,
  allUsers: [],
  filtered: null,
  loading: false,
  self: {
    token: null,
    _id: null,
    userName: null,
  },
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTO_LOGIN_SUCCESS:
    case AUTHENTICATE_USER:
      return {
        ...state,
        loggedIn: true,
        triedAutoLogin: true,
        loading: false,
        self: action.payload,
      };
    case LOGOUT:
      return initialState;
    case AUTO_LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false,
        triedAutoLogin: true,
        loading: false,
      };

    case RETURN_SINGLE_ITEM:
      return {
        ...state,
        self: { ...state.self },
        filtered: state.allUsers.filter((u) => u._id === action.payload._id),
      };
    case GET_ALL_USERS:
      return {
        ...state,
        self: { ...state.self },
        allUsers: action.payload.user,
      };
    case UPDATE_USER_INFO:
      const filteredUsers = state.allUsers.filter(
        (u) => u._id !== action.payload._id
      );
      filteredUsers.push(action.payload);
      return {
        ...state,
        self: { ...state.self },
        allUsers: filteredUsers,
      };
    case REMOVE_USER:
      let filter = state.allUsers.filter(
        (u) => u._id !== action.payload.user._id
      );
      return {
        ...state,
        self: { ...state.self },
        allUsers: filter,
      };
    case USER_ERROR:
      return {
        ...state,
        self: { ...state.self },
        error: action.payload,
      };
    case REGISTER_NEW_USER:
      console.log("addnewUser in reducer", action.payload);
      return {
        ...state,
        loggedIn: true,
        loading: false,
        allUsers: [...state.allUsers, action.payload._doc],
        self: action.payload,
      };
    case AUTHENTICATION_ERROR:
      console.log(action.payload);
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        self: { ...state.self },
        error: action.payload,
      };
    default:
      return state;
  }
}
