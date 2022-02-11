import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import User from "../../models/User";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import { connect, useDispatch } from "react-redux";
import AboutMe from "../../components/publicProfile/aboutMe";
import UserImage from "../../components/publicProfile/userImage";
import CreatedRecipes from "../../components/publicProfile/createdRecipes";
import PublicPrimaryInfo from "../../components/publicProfile/publicPrimaryInfo";
import * as Types from "../../stateManagement/TYPES";
import Cookies from "cookies";
import mongoose from "mongoose";
import { autoLoginOnFirstRequest } from "../../util/autoLoginOnFirstRequest";
import { AdjustForDrawerContainer } from "../../components/UIComponents";

const useClasses = makeStyles((theme) => ({
  profileContainer: {
    maxWidth: "900px",
    marginLeft: "50%",
    transform: "translateX(-50%)",
    [theme.breakpoints.up(1280)]: {
      width: "900px",
    },
  },
  imageAndPrimaryContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const userPublicProfile = ({
  hasUser,
  thisUser: {
    myRecipes,
    profileImgUrl,
    firstName,
    lastName,
    userProfileData: {
      aboutMe,
      inspiredBy,
      createdAt,
      location: { city, country },
      skillLevel,
      roundedImg,
      showFullName,
    },
  },
  user: {
    loggedIn,
    self: { _id },
  },
}) => {
  const classes = useClasses();
  const dispatch = useDispatch();
  useEffect(() => {
    if (hasUser && Boolean(!loggedIn || !_id)) {
      dispatch({
        type: Types.AUTO_LOGIN_SUCCESS,
        payload: hasUser,
      });
    }
  }, [hasUser]);

  return (
    <AdjustForDrawerContainer>
      <div className={classes.profileContainer}>
        <div className={classes.imageAndPrimaryContainer}>
          <UserImage profileImgUrl={profileImgUrl} roundedImg={roundedImg} />
          <PublicPrimaryInfo
            city={city}
            country={country}
            firstName={firstName}
            lastName={lastName}
            showFullName={showFullName}
            createdAt={createdAt}
            skillLevel={skillLevel}
          />
        </div>
        <AboutMe aboutMe={aboutMe} inspiredBy={inspiredBy} />
        <CreatedRecipes userCreatedRecipes={myRecipes} />
      </div>
    </AdjustForDrawerContainer>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
});

export default connect(mapStateToProps)(userPublicProfile);

export const getServerSideProps = async (ctx) => {
  console.log("ctx: ", ctx);
  let { userId: _thisUserId } = ctx.params;
  let cookies = new Cookies(ctx.req, ctx.res);
  let hasUser = false;
  let token = cookies.get("token");
  let userId = cookies.get("userId");
  let rememberMe = cookies.get("rememberMe");
  let _userData = false;
  if (!userId || !token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (userId && token) {
    if (rememberMe) {
      hasUser = await autoLoginOnFirstRequest(ctx.req, ctx.res);
    }
    let data = await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(async () => {
        _userData = await User.findById(_thisUserId)
          .select("-otp -password -oneTimePassword")
          .populate({
            path: "myRecipes",
            options: {
              limit: 10,
              sort: { created: -1 },
              // skip: req.params.pageIndex*10
            },
            populate: {
              path: "ingredients",
            },
          });
      });
    return {
      props: {
        thisUser: JSON.parse(JSON.stringify(_userData)),
        hasUser: hasUser,
      },
    };
  }
};
