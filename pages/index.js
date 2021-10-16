import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { tryAutoLogin } from "../stateManagement/userActions";
import * as Types from "../stateManagement/TYPES";
import { autoLoginOnFirstRequest } from "../util/autoLoginOnFirstRequest";
import {
  UnderNavbar,
  AdjustForDrawerContainer,
} from "../components/UIComponents";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import dynamic from "next/dynamic"
const MainCanvas = dynamic(() =>  import('../components/landingPage/MainCanvas'), {
  ssr: false,
});



const useClasses = makeStyles((theme) => ({
  mainCanvasContainer: {
    
  }
}))



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
  const classes = useClasses()
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
      <div className={classes.mainCanvasContainer} id="main-canvas-container">
      <MainCanvas />
      </div>
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
