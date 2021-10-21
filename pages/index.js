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
import LandingPageBanner from '../components/landingPage/landingPageBanner';
import clsx from "clsx";

import dynamic from "next/dynamic"
const MainCanvas = dynamic(() =>  import('../components/landingPage/MainCanvas'), {
  ssr: false,
});



const useClasses = makeStyles((theme) => ({
  mainCanvasContainer: {
    width: "100%",
    height: "calc(100vh - 64px)",
    minHeight: "calc(100vh - 64px)",
    maxHeight: "fit-content",
    position: "absolute",
    top: "64px",
    left: 0,
    // border: "5px solid blue",
    // backgroundColor: "#51a1ff"
    backgroundColor: "transparent"
  },
  container: {
    maxWidth: "1280px",
    // marginLeft: "50%",

    // transform: "translateX(-50%)"
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
      <AdjustForDrawerContainer customStyles={{justifyContent: "center", alignItems: "flex-start", display: "flex"}} >
      <div className={classes.container}>
      <div className={classes.mainCanvasContainer} id="main-canvas-container">
      <MainCanvas />
      </div>
      <LandingPageBanner/>
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
