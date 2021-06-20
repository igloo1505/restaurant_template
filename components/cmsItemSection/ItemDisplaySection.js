import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserItem from "./UserItem";
import RecipeItem from "./RecipeItem";
import styles from "../../styles/ItemDisplaySection.module.scss";

const ItemDisplaySection = ({
  user,
  form: { as },
  props: {
    dataArray,
    selected,
    handleEditState,
    selectedItem,
    formData,
    hasNestedCategories,
  },
}) => {
  const [data, setData] = useState([]);

  const handleDataFilter = () => {
    if (!hasNestedCategories) {
      setData(dataArray);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    handleDataFilter();
  }, [as, dataArray, selected, hasNestedCategories]);

  if (selected.name === "User" && !hasNestedCategories) {
    return (
      <div
        className={`${styles.wrapperWithUser} ${styles.itemDisplaySectionWrapper}`}
      >
        {data.map((item) => (
          <UserItem
            item={item}
            key={item._id}
            handleEditState={handleEditState}
            selectedItem={selectedItem}
            formData={formData}
          />
        ))}
      </div>
    );
  }
  if (selected.name === "Recipes" && !hasNestedCategories) {
    return (
      <div
        className={`${styles.wrapperWithRecipes} ${styles.itemDisplaySectionWrapper}`}
      >
        {data.map((item) => (
          <RecipeItem
            item={item}
            key={item._id}
            handleEditState={handleEditState}
            selectedItem={selectedItem}
            formData={formData}
          />
        ))}
      </div>
    );
  }
  if (selected.name === "Tacos" && as === "Proteins") {
    return (
      <div
        className={`${styles.wrapperWithRecipes} ${styles.itemDisplaySectionWrapper}`}
      >
        {data.map((item) => "yuppppp!!!")}
      </div>
    );
  } else {
    return "";
  }
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  form: state.UI.form,
  props: props,
});
export default connect(mapStateToProps)(ItemDisplaySection);
