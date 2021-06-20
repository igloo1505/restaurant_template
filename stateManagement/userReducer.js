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
} from "./TYPES";

const initialState = {
  loggedIn: true,
  token: "",
  allUsers: [],
  filtered: null,
  loading: false,
  user: {
    token: 1,
    _id: null,
    userName: "",
  },
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        user: {
          token: action.payload.token,
          _id: action.payload.userID,
          userName: action.payload.userName,
        },
      };

    case RETURN_SINGLE_ITEM:
      return {
        ...state,
        user: { ...state.user },
        filtered: state.allUsers.filter((u) => u._id === action.payload._id),
      };
    case GET_ALL_USERS:
      return {
        ...state,
        user: { ...state.user },
        allUsers: action.payload.user,
      };
    case UPDATE_USER_INFO:
      const filteredUsers = state.allUsers.filter(
        (u) => u._id !== action.payload._id
      );
      filteredUsers.push(action.payload);
      return {
        ...state,
        user: { ...state.user },
        allUsers: filteredUsers,
      };
    case REMOVE_USER:
      let filter = state.allUsers.filter(
        (u) => u._id !== action.payload.user._id
      );
      return {
        ...state,
        user: { ...state.user },
        allUsers: filter,
      };
    case USER_ERROR:
      return {
        ...state,
        user: { ...state.user },
        error: action.payload,
      };
    case REGISTER_NEW_USER:
      return {
        ...state,
        loggedIn: true,
        loading: false,
        allUsers: [...state.allUsers, action.payload._doc],
        user: {
          token: action.payload.token,
          _id: action.payload._doc._id,
          userName: action.payload._doc.userName,
        },
      };
    case AUTHENTICATION_ERROR:
      return {
        ...state,
        // loggedIn: false,
        allUsers: [],
        loading: false,
        user: { ...state.user },
        error: action.payload,
      };
    case ERROR_WITH_MODAL:
      return {
        ...state,
        // loggedIn: false,
        // allUsers: [],
        loading: false,
        user: { ...state.user },
        error: action.payload.error,
      };
    default:
      return state;
  }
}
