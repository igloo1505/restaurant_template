import React, { useEffect, useState } from "react";
import styles from "../styles/Portal.module.scss";
import Loader from "../components/Loader";
import PortalLogin from "../components/PortalLogin";
import PortalSignUp from "../components/PortalSignUp";
import PortalAuthenticated from "../components/portalAuthenticated/PortalAuthenticated";
import Drawer from "../components/portalAuthenticated/Drawer";
import { connect } from "react-redux";
import { getAllUsers, tryAutoLogin } from "../stateManagement/userActions";
import store from "../stateManagement/store";
import * as Types from "../stateManagement/TYPES";
import { setNavbarHeight } from "../stateManagement/uiActions";

const Portal = ({
  user: {
    loggedIn,
    self: { _id: userID, allUsers },
  },
  UI: {
    login: { isSignUp },
  },
  network: { loading: isLoading },
  getAllUsers,
  setNavbarHeight,
}) => {
  useEffect(async () => {
    console.log(userID, loggedIn);
    await setNavbarHeight();
    await getAllUsers();
  }, []);

  if (isLoading) {
    return <Loader type="loginScreen" size={100} sizeInner={80} />;
  }
  if (!isLoading) {
    return (
      <div className={styles.portalOuterWrapper} id="portalPageWrapper">
        {loggedIn && userID && !isLoading ? (
          <PortalAuthenticated />
        ) : (
          <LoginSwitcher isSignUp={isSignUp} />
        )}
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  network: state.network,
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
