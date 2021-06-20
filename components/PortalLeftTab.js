import React, { useState, useEffect } from "react";
import styles from "../styles/PortalLeftTab.module.scss";
import { connect } from "react-redux";
const portalLeftTab = ({
  props: {
    category,
    setSelectedCategory,
    hasNestedCategories,
    index,
    selected,
  },
  form: { data, as: currentSubCategory, inputs },
}) => {
  const [classList, setClassList] = useState(
    `${styles.portalLeftTab} ${styles.portalLeftTabHover}`
  );
  useEffect(() => {
    if (index === 0 && hasNestedCategories) {
      return setClassList(`${styles.portalLeftTab} ${styles.disabledLeftTab}`);
    }
    if (hasNestedCategories && category === currentSubCategory) {
      return setClassList(
        `${styles.portalLeftTab} ${styles.portalLeftTabHover} ${styles.currentActiveTab}`
      );
    } else {
      return setClassList(
        `${styles.portalLeftTab} ${styles.portalLeftTabHover}`
      );
    }
  }, [currentSubCategory, hasNestedCategories, selected]);

  const handleClick = () => {
    // debugger;
    if (hasNestedCategories && category === selected.name) {
      return;
    }
    console.log(category);
    setSelectedCategory(category);
  };
  return (
    <div className={classList} key={category} onClick={handleClick}>
      <span>{category ? category : ""}</span>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  form: state.UI.form,
  props: props,
});

export default connect(mapStateToProps)(portalLeftTab);
