import React, { forwardRef } from "react";
import MyRecipes_recipesGrid from "./MyRecipes_recipesGrid";

const MyRecipes_rightSection = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <MyRecipes_recipesGrid />
    </div>
  );
});

export default MyRecipes_rightSection;
