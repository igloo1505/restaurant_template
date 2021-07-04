import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { tryAutoLogin } from "../stateManagement/userActions";
import * as types from "../stateManagement/TYPES";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";

const Home = ({
  viewport: { width: deviceWidth, height: deviceHeight, navHeight },
  user: {
    loggedIn,
    triedAutoLogin,
    self: { token },
  },
  network: { loading: isLoading },
  tryAutoLogin,
}) => {
  useEffect(() => {
    if (!triedAutoLogin) {
      tryAutoLogin();
    }
  }, [triedAutoLogin]);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <UnderNavbar />
      <AdjustForDrawerContainer centerAll={true}>
        <div>Welp...</div>
      </AdjustForDrawerContainer>
      <style jsx>{``}</style>
    </Fragment>
  );
};

const mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  user: state.user,
  network: state.network,
});

export default connect(mapStateToProps, { tryAutoLogin })(Home);
