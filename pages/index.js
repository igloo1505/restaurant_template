import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { tryAutoLogin } from "../stateManagement/userActions";
import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
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
  hasUser,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hasUser: ", hasUser);
    if (hasUser) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
      });
    }
  }, [hasUser]);

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

export const getServerSideProps = async (ctx) => {
  let _user = await autoLoginOnFirstRequest(ctx.req, ctx.res);
  return {
    props: {
      hasUser: _user,
    },
  };
};
