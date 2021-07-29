import {
  TOGGLE_MODAL,
  SET_MODAL_CONTENT,
  TOGGLE_LEFT_TAB,
  SET_NAV_HEIGHT,
  SHOW_MODAL,
  HIDE_MODAL,
} from "./TYPES";

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

export const showModal = (data) => (dispatch) => {
  // let data = {
  //   show: Boolean,
  // variant: String to insert children accordingly
  // }
  dispatch({
    type: SHOW_MODAL,
    payload: instance,
  });
};

export const hideModal = () => (dispatch) => {
  dispatch({
    type: HIDE_MODAL,
  });
};
// const idArray = ["login_email_input", "login_password_input"];
// export const removeBoxShadow = () => {
//   let count = 0;
//   let ems = {};
//   idArray.forEach((id) => {
//     let em = document.getElementById(id);
//     if (em) {
//       let styles = getComputedStyle(em);
//       console.log("styles!!!", styles["box-shadow"]);
//     }
//   });
// };
