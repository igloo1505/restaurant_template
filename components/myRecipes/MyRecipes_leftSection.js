import React, { forwardRef, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import MyRecipes_searchBar from "./MyRecipes_searchBar";
import MyRecipes_searchFilterAccordian from "./MyRecipes_searchFilterAccordian";

// I finally understand that error after 142 unnecessary forwardRefs

const useClasses = makeStyles((theme) => ({
  formContainer: {
    padding: "16px",
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    height: "fit-content",
    minWidth: "min(350px, 75vw)",
    transition: theme.transitions.create(
      ["box-shadow", "background-color", "padding"],
      {
        duration: 350,
      }
    ),
    [theme.breakpoints.down(960)]: {
      width: "min(500px, 80vw)",
      display: "flex",
      flexDirection: "column-reverse",
    },
  },
  addBoxShadow: {
    boxShadow: `2px 2px 5px ${theme.palette.grey[400]}, -2px 2px 5px ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.common.paperLight,
    transition: theme.transitions.create(
      ["box-shadow", "background-color", "padding"],
      {
        duration: 350,
      }
    ),
  },
}));

const MyRecipes_leftSection = forwardRef((props, ref) => {
  const [hasShadow, setHasShadow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasShadow(true);
    }, 650);
  }, []);
  const classes = useClasses();
  return (
    <div
      ref={ref}
      className={clsx(classes.formContainer, hasShadow && classes.addBoxShadow)}
    >
      <MyRecipes_searchFilterAccordian />
      <MyRecipes_searchBar />
    </div>
  );
});

MyRecipes_leftSection.displayName = "MyRecipesLeftSection";

export default MyRecipes_leftSection;
