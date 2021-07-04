import * as Types from "./TYPES";
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
  timeElapsedInLoadState: {
    isInitial: null,
    time: null,
  },
};

const modalReducer = createReducer(initialState, (builder) => {
  builder.addCase(Types.IS_LOADING, (state, action) => {
    return {
      ...state,
      loading: action.payload.isLoading,
      timeElapsedInLoadState: {
        isInitial: true,
        time: action.payload.timeStart,
      },
    };
  });
  builder.addCase(Types.NETWORK_RESPONSE, (state, action) => {
    return {
      ...state,
      response: action.payload.data,
      error: null,
      loading: false,
      timeElapsedInLoadState: {
        isInitial: false,
        time: state.timeElapsedInLoadState.time - action.payload.time,
      },
    };
  });
  builder.addCase(Types.NETWORK_ERROR, (state, action) => {
    return {
      ...state,
      response: null,
      error: action.payload.error,
      loading: false,
      timeElapsedInLoadState: {
        isInitial: false,
        time: state.timeElapsedInLoadState.time - action.payload.time,
      },
    };
  });
  builder.addCase(Types.TIMER_START, (state, action) => {
    return {
      ...state,
      timeElapsedInLoadState: {
        ...state.timeElapsedInLoadState,
        isInitial: true,
        time: action.payload,
      },
    };
  });
  builder.addCase(Types.TIMER_END, (state, action) => {
    return {
      ...state,
      timeElapsedInLoadState: {
        ...state.timeElapsedInLoadState,
        isInitial: true,
        time: action.payload - state.timeElapsedInLoadState.time,
      },
    };
  });
});

export default modalReducer;
