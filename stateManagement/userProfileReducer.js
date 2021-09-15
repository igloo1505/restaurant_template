import * as Types from "./TYPES";
import store from "./store";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  aboutMe: null,
  inspiredBy: null,
  skillLevel: null,
  location: {
    city: null,
    country: null,
  },
  favoriteCuisine: null,
  roundedImg: false,
};

const userProfileReducer = createReducer(initialState, (builder) => {
  builder.addCase(Types.AUTO_LOGIN_SUCCESS, (state, action) => {
    return {
      ...state,
      ...(action.payload?.userProfileData && {
        ...action.payload.userProfileData,
      }),
    };
  });
  builder.addCase(Types.AUTHENTICATE_USER, (state, action) => {
    return {
      ...state,
      ...(action.payload?.userProfileData && {
        ...action.payload.userProfileData,
      }),
    };
  });
  builder.addCase(Types.UPDATE_PROFILE_DATA_SUCCESS, (state, action) => {
    return {
      ...state,
      ...(action.payload?.profileData && {
        ...action.payload.profileData,
      }),
    };
  });
});

export default userProfileReducer;
