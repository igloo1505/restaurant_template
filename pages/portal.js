import React, { useEffect, useState } from "react";
import styles from "../styles/Portal.module.scss";
import PortalLogin from "../components/PortalLogin";
import PortalSignUp from "../components/PortalSignUp";
import PortalAuthenticated from "../components/portalAuthenticated/PortalAuthenticated";
import Drawer from "../components/portalAuthenticated/Drawer";
import { connect } from "react-redux";
import { getAllUsers } from "../stateManagement/userActions";
import store from "../stateManagement/store";
import * as Types from "../stateManagement/TYPES";
import { setNavbarHeight } from "../stateManagement/uiActions";

import AccountIconMenu from "../components/portalAuthenticated/AccountIconMenu";

const Portal = ({
  user: {
    loggedIn,
    self: { _id: userID, allUsers },
  },
  UI: {
    login: { isSignUp },
  },
  getAllUsers,
  setNavbarHeight,
}) => {
  useEffect(async () => {
    await setNavbarHeight();
    await getAllUsers();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    modalHeader: "",
    modalText: "",
  });
  const toggleModal = ({ modalHeader, modalText }) => {
    setModalContent({
      modalHeader: modalHeader || "",
      modalText: modalText || "",
    });
    setShowModal(!showModal);
  };
  return (
    <div className={styles.portalOuterWrapper} id="portalPageWrapper">
      <AccountIconMenu />
      {loggedIn && userID ? (
        <PortalAuthenticated toggleModal={toggleModal} />
      ) : (
        <LoginSwitcher isSignUp={isSignUp} />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, {
  getAllUsers,
  setNavbarHeight,
})(Portal);

const LoginSwitcher = ({ isSignUp }) => {
  const setLogin = () => {
    store.dispatch({ type: Types.TOGGLE_SIGNUP_FORM });
  };
  return isSignUp ? (
    <PortalSignUp setLogin={setLogin} />
  ) : (
    <PortalLogin setLogin={setLogin} />
  );
};
