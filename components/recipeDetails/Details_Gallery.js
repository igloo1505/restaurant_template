/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getFormattedTimeIndividual } from "../../util/getFormattedTime";
import styles from "./DetailsBanner.module.scss";

const useImageClasses = makeStyles((theme) => ({
  outerContainerImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    maxWidth: 645,
    marginLeft: "auto",
    marginRight: "-2.75rem",
    marginTop: "2rem",
    borderRadius: "30px",
    zIndex: 10,
    boxShadow: "12px 12px 15px #bababa",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    // border: "1px solid red",
    // backgroundColor: "rgba(235, 96, 16, 1)",
    borderRadius: "30px",
    background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
    border: `1px solid ${theme.palette.grey[300]}`,
    // border: `1px solid red`,
    // boxShadow: "12px 12px 20px #d9d9d9, -12px -12px 20px #ffffff",
    // boxShadow: "12px 12px 20px #bababa, -12px -12px 20px #ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
    // boxShadow: "4px 4px 12px #bababa, -4px -4px 12px #ffffff",
    filter: "drop-shadow(4px 4px 4px #bababa)",
    objectFit: "cover",
    padding: "0.75rem",
    borderRadius: "30px",
    // border: "1px solid white",
  },
  imageIn: {},
}));

let outerContainerId = "gallery-main-outer-container";

const Details_Gallery = ({
  props: { recipe },
  viewport: { width: deviceWidth, height: deviceHeight },
}) => {
  const [fadeIn, setFadeIn] = useState(true);
  const [aspectRatio, setAspectRatio] = useState({});
  const imageClasses = useImageClasses();
  useEffect(() => {
    if (typeof window !== "undefined") {
      let emWidth = document
        .getElementById(outerContainerId)
        .getBoundingClientRect().width;
      console.log("emWidth: ", emWidth);
      let aspectHeight = (4 / 3) * emWidth;
      setAspectRatio({
        height: `${emWidth * 0.75}px`,
      });
    }
  }, [deviceWidth, deviceHeight]);
  return (
    <div
      id={outerContainerId}
      className={imageClasses.outerContainerImage}
      style={aspectRatio}
    >
      <div className={imageClasses.innerContainer}>
        {recipe.imgUrl && (
          <img
            src={recipe.imgUrl}
            alt={"Recipe Image"}
            className={clsx(imageClasses.image, fadeIn && imageClasses.imageIn)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  viewport: state.UI.viewport,
  props: props,
});

export default connect(mapStateToProps)(Details_Gallery);
