import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useBannerStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gridArea: "banner",
  },
  bannerRoot: {
    width: "fit-content",
    padding: "10px 20px",
    borderRadius: "8px",
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    // transform: "translateY(-50%)",
    color: "#fff",
  },
  bannerPaper: {
    width: "fit-content",
    height: "fit-content",
    borderRadius: "8px",
    marginTop: "10px",
    transform: "translateY(0px)",
    background: theme.palette.secondary.dark,
    boxShadow: "none",
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
  },
  bannerPaperBoxShadow: {
    boxShadow: "6px 3px 12px #9d400b, -6px -3px 12px #ff8015",
    boxShadow: "2px 2px 2px #cf540e, -2px -2px 2px #ff6c12",
    background: "linear-gradient(145deg, #d4560e, #fb6711)",
    // boxShadow: "5px 5px 10px #c5510d, -5px -5px 10px #ff6f13",
    border: `1px solid ${theme.palette.secondary.light}`,
    transition: theme.transitions.create(["box-shadow", "transform"], {
      duration: 500,
    }),
    "&::before": {
      content: '""',
      position: "absolute",
      height: "calc(100% - 4px)",
      width: "calc(100% - 4px)",
      marginTop: "2px",
      marginLeft: "2px",
      borderRadius: "8px",
      // boxShadow: "inset 5px 5px 8px #cc540e, inset -5px -5px 8px #ff6c12",
      boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
      transition: theme.transitions.create(
        ["box-shadow", "transform", "background-color"],
        {
          duration: 500,
        }
      ),
    },
  },
  bannerTransform: { transform: "translateY(-50%)" },
}));

const FormBanner = ({ children }) => {
  const [bannerLifted, setBannerLifted] = useState(false);
  const [bannerTransformed, setBannerTransformed] = useState(false);
  useEffect(() => {
    setTimeout(() => setBannerLifted(true), 500);
    // setTimeout(() => setBannerTransformed(true), 700);
  }, []);
  const classes = useBannerStyles();
  return (
    <div className={classes.container}>
      <Paper
        elevation={3}
        className={clsx(
          classes.bannerPaper,
          bannerLifted && classes.bannerPaperBoxShadow,
          bannerTransformed && classes.bannerTransform
        )}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          className={classes.bannerRoot}
        >
          {children}
        </Typography>
      </Paper>
    </div>
  );
};

export default FormBanner;
