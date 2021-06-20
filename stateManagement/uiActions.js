import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
  TOGGLE_LEFT_TAB,
  SET_MODAL_INSTANCE,
  SET_NAV_HEIGHT,
} from "./TYPES";

export const toggleModal = () => (dispatch) => {
  if (typeof window !== "undefined") {
    dispatch({
      type: TOGGLE_MODAL,
    });
  }
};

export const setNavbarHeight = () => async (dispatch) => {
  if (typeof window !== "undefined") {
    const em = document.getElementById("navbarOuterWrapper");
    if (em) {
      const styles = window.getComputedStyle(em);
      const height = Math.ceil(
        parseFloat(styles.height.slice(0, styles.height.length - 2))
      );
      dispatch({
        type: SET_NAV_HEIGHT,
        payload: height,
      });
    }
    if (!em) {
      dispatch({
        type: SET_NAV_HEIGHT,
        payload: 0,
      });
    }
  }
};

export const toggleLeftTab = () => (dispatch) => {
  if (typeof window !== "undefined") {
    dispatch({
      type: TOGGLE_LEFT_TAB,
    });
  }
};

export const setModalContent =
  ({ modalHeader, modalText, isConfirmation }) =>
  async (dispatch) => {
    dispatch({
      type: SET_MODAL_CONTENT,
      payload: { modalHeader, modalText, isConfirmation },
    });
  };

export const setModalInstance = (instance) => (dispatch) => {
  dispatch({
    type: SET_MODAL_INSTANCE,
    payload: instance,
  });
};
