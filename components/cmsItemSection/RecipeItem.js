import React, { useEffect } from "react";
import styles from "../../styles/ItemDisplaySection.module.scss";
import { connect, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { GiCampfire, GiWheat } from "react-icons/gi";
import { FcHighPriority, FcCancel } from "react-icons/fc";
import {
  TRIGGER_MODAL,
  TOGGLE_MODAL,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
} from "../../stateManagement/TYPES";
import { deleteRecipe } from "../../stateManagement/recipeActions";

const RecipeItem = ({
  UI: { isEditing },
  recipes: { allRecipes },
  props: { item, key, handleEditState, selectedItem, formData },
  deleteRecipe,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }
    console.log("selectedItem", selectedItem);
  }, []);
  let {
    isHot,
    isGlutenFree,
    isInStock,
    _id,
    category,
    name,
    description,
    price,
    createdAt,
    updatedAt,
  } = item;

  // if (selectedItem["Gluten Free"]) {
  //   isGlutenFree = selectedItem["Gluten Free"];
  // }
  // if (selectedItem["In Stock"]) {
  //   isInStock = selectedItem["In Stock"];
  // }
  // if (selectedItem.Spicy) {
  //   isHot = selectedItem.Spicy;
  // }

  const handleEditStateChange = () => {
    let selected = allRecipes.filter((recipe) => recipe._id === _id);
    handleEditState(selected[0]);
  };

  const isSelectedAndEditing = () => {
    console.log(selectedItem);
    if (isEditing && selectedItem._id === _id) {
      return true;
    } else return false;
  };

  const handleDeleteRecipe = () => {
    dispatch({
      type: TRIGGER_MODAL,
      payload: {
        modalText: `Are you sure you want to delete ${name}?`,
        modalHeader: "Are you sure?",
        isConfirmation: true,
        isOpen: true,
      },
    });
    let confirm = document.getElementById("modalConfirmationButton");
    let denied = document.getElementById("modalDeniedButton");
    let deniedX = document.getElementById("modalDeniedButtonX");
    denied.addEventListener("click", (e) => {
      dispatch({ type: MODAL_DISMISSED });
    });
    deniedX.addEventListener("click", (e) => {
      dispatch({ type: MODAL_DISMISSED });
    });
    confirm.addEventListener("click", (e) => {
      deleteRecipe({ id: _id });
      dispatch({ type: MODAL_CONFIRMED });
    });
  };

  const getDescription = (strang) => {
    let x;
    let limit = 400;
    if (strang) {
      if (strang.length < limit) {
        return strang;
      }
      if (!isEditing) {
        x = strang.slice(0, limit - 3);
        x = x + "...";
        return x;
      }
      if (isEditing) {
        return strang;
      }
    }
  };

  return (
    <div className="card bg-light">
      <div className={styles.recipeCardGrid}>
        <div className={styles.recipeCardUserNameText}>
          {isSelectedAndEditing() ? selectedItem.Title : name}
          <br />
          {isSelectedAndEditing() ? selectedItem.Price : price}
        </div>
        <div className={styles.recipeCardDescription}>
          {isSelectedAndEditing()
            ? getDescription(selectedItem.Description)
            : getDescription(description)}
        </div>
        <div className={styles.timeStamp}>
          Created on: {dayjs(createdAt).format("MM/DD/YYYY")} <br /> Updated on:{" "}
          {dayjs(updatedAt).format("MM/DD/YYYY")}
        </div>
        {isEditing && (
          <div className={styles.badgeContainer}>
            {selectedItem.Spicy && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Item is spicy"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isHot" }}
              >
                <GiCampfire style={{ color: "red" }} />
              </span>
            )}
            {!selectedItem["In Stock"] && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Currently set to 'out of stock'"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isInStock" }}
              >
                <FcHighPriority />
              </span>
            )}
            {selectedItem["Gluten Free"] && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Item is Gluten Free"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isGlutenFree" }}
              >
                <GiWheat style={{ color: "green" }} />
              </span>
            )}
          </div>
        )}
        {!isEditing && (
          <div className={styles.badgeContainer}>
            {isHot && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Item is spicy"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isHot" }}
              >
                <GiCampfire style={{ color: "red" }} />
              </span>
            )}
            {!isInStock && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Currently set to 'out of stock'"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isInStock" }}
              >
                <FcHighPriority />
              </span>
            )}
            {isGlutenFree && (
              <span
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title="Item is Gluten Free"
                className={styles.badgeSpanWrapper}
                style={{ gridArea: "isGlutenFree" }}
              >
                <GiWheat style={{ color: "green" }} />
              </span>
            )}
          </div>
        )}

        <div className={styles.recipeCardButtonContainer}>
          <button
            type="button"
            className="btn btn-outline-warning"
            style={isEditing ? { display: "none" } : { marginRight: "5px" }}
            onClick={handleEditStateChange}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            style={isEditing ? { display: "none" } : { marginLeft: "5px" }}
            onClick={handleDeleteRecipe}
          >
            Delete
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .card {
            box-sizing: border-box;
            min-height: 150px;
            height: max(280px, fit-content);
            padding: 16px;
            margin: 12px 5%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            border-radius: 5px;
          }
          .card:hover {
            box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  recipes: state.recipes,
  props: props,
});
export default connect(mapStateToProps, { deleteRecipe })(RecipeItem);
