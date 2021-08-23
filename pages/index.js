import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import { tryAutoLogin } from "../stateManagement/userActions";
import * as Types from "../stateManagement/TYPES";
import mongoose from "mongoose";
import Cookies from "cookies";
import User from "../models/User";
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
  console.log("ctx: ", Object.keys(ctx));
  let cookies = new Cookies(ctx.req, ctx.res);
  let rememberMe = cookies.get("rememberMe");
  let userId = cookies.get("userId");
  let token = cookies.get("token");
  console.log("cookies: ");
  let returnUser;
  if (rememberMe && userId && token) {
    let _user = await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(async () => {
        let user = await User.findById(userId).select(
          "-password -otp -oneTimePassword"
        );
        if (user) {
          returnUser = user;
        }
      });
    return {
      props: {
        hasUser: JSON.parse(JSON.stringify(returnUser)),
      },
    };
  } else {
    return {
      props: {
        hasUser: false,
      },
    };
  }
};
