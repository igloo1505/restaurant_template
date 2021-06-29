import React, { useEffect, useState } from "react";
import styles from "../styles/Portal.module.scss";
import PortalLogin from "../components/PortalLogin";
import PortalSignIn from "../components/PortalSignIn";
import PortalAuthenticated from "../components/portalAuthenticated/PortalAuthenticated";
import Drawer from "../components/portalAuthenticated/Drawer";
import { connect } from "react-redux";
import { getAllUsers } from "../stateManagement/userActions";
import { setNavbarHeight } from "../stateManagement/uiActions";
import { getAllRecipes } from "../stateManagement/recipeActions";
import { GET_ALL_USERS, USER_ERROR } from "../stateManagement/TYPES";
import Alert from "../components/Alert";
import AccountIconMenu from "../components/portalAuthenticated/AccountIconMenu";

const Portal = ({
  user: {
    loggedIn,
    self: { _id: userID, allUsers },
  },
  getAllUsers,
  getAllRecipes,
  setNavbarHeight,
}) => {
  useEffect(async () => {
    await setNavbarHeight();
    await getAllRecipes();
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
      <Alert />
      <AccountIconMenu />
      <Drawer />
      {loggedIn && userID ? (
        <PortalAuthenticated toggleModal={toggleModal} />
      ) : (
        <LoginSwitcher />
      )}
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getAllRecipes,
  setNavbarHeight,
})(Portal);

const LoginSwitcher = () => {
  const [login, setLoginState] = useState(true);
  const setLogin = () => {
    setLoginState(!login);
  };
  return login ? (
    <PortalLogin setLogin={setLogin} />
  ) : (
    <PortalSignIn setLogin={setLogin} />
  );
};
