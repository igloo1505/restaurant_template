import React, { useEffect } from "react";
import RecipeCard from "./publicProfileRecipeCard";
import RecipeCardNoImage from "./PublicProfileCardNoImage";
import { makeStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";

const useClasses = makeStyles((theme) => ({
  createdRecipesContainer: {
    marginTop: "1rem",
    width: "100%",
    display: "grid",
    gap: "10px",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
  },
}));

const createdRecipes = ({ userCreatedRecipes }) => {
  const classes = useClasses();
  useEffect(() => {
    staggerEntrance();
  }, []);
  return (
    <div className={classes.createdRecipesContainer}>
      {userCreatedRecipes?.map((r, i) =>
        r.imgUrl ? (
          <RecipeCard recipe={r} index={i} key={`createdRecipe-${i}`} />
        ) : (
          <RecipeCardNoImage recipe={r} index={i} key={`createdRecipe-${i}`} />
        )
      )}
    </div>
  );
};

export default createdRecipes;

export const staggerEntrance = () => {
  gsap.from(".userCreatedRecipeCard", {
    stagger: 0.35,
    scale: 0.1,
    duration: 1.5,
    // ease: "back.out(1.7)"
    ease: "elastic.out(1, 0.3)",
  });
};
