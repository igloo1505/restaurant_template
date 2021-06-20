import React, { useEffect } from "react";
import styles from "../../styles/ItemDisplaySection.module.scss";
import { removeUser } from "../../stateManagement/userActions";
import { connect, useDispatch } from "react-redux";
import {
  TRIGGER_MODAL,
  TOGGLE_MODAL,
  MODAL_CONFIRMED,
  MODAL_DISMISSED,
} from "../../stateManagement/TYPES";
import dayjs from "dayjs";
import store from "../../stateManagement/store";

const UserItem = ({
  user: { allUsers },
  UI: {
    isEditing,
    modal: { isOpen },
  },
  props: { item, handleEditState, selectedItem, formData },
  removeUser,
}) => {
  const { userName, firstName, lastName, createdAt, updatedAt, _id } = item;
  const dispatch = useDispatch();

  const handleDeleteUser = () => {
    dispatch({
      type: TRIGGER_MODAL,
      payload: {
        modalText: `Are you sure you want to delete ${userName}?`,
        modalHeader: "Are you sure?",
        isConfirmation: true,
        isOpen: true,
      },
    });
    let confirm = document.getElementById("modalConfirmationButton");
    let denied = document.getElementById("modalDeniedButton");
    let deniedX = document.getElementById("modalDeniedButtonX");
    // if (isOpen) {
    denied.addEventListener("click", (e) => {
      dispatch({ type: MODAL_DISMISSED });
    });
    deniedX.addEventListener("click", (e) => {
      dispatch({ type: MODAL_DISMISSED });
    });
    confirm.addEventListener("click", (e) => {
      removeUser({ userID: _id });
      dispatch({ type: MODAL_CONFIRMED });
    });
    // }
  };

  const dispatchFromModalConfirmation = (isConfirmed) => {
    if (!isConfirmation) {
      dispatch({ type: TOGGLE_MODAL });
    }
    isConfirmed
      ? dispatch({
          type: MODAL_CONFIRMED,
        })
      : dispatch({
          type: MODAL_DISMISSED,
        });
  };

  const handleEditStateChange = () => {
    let selected = allUsers.filter((user) => user._id === _id);
    handleEditState(selected[0]);
  };

  const isSelectedAndEditing = () => {
    if (isEditing && selectedItem._id === _id) {
      return true;
    } else return false;
  };

  return (
    <div className="card bg-light">
      <div className={styles.cardUserNameText}>
        {isSelectedAndEditing() ? selectedItem.Username : userName}
      </div>
      <div className={styles.givenNameText}>
        {isSelectedAndEditing() ? selectedItem["Last Name"] : lastName},{" "}
        {isSelectedAndEditing() ? selectedItem["First Name"] : firstName}
      </div>
      <div className={styles.timeStamp}>
        Created on: {dayjs(createdAt).format("MM/DD/YYYY")}
      </div>
      <div className={styles.cardButtonContainer}>
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
          onClick={handleDeleteUser}
        >
          Delete
        </button>
      </div>
      <style jsx>
        {`
          .card {
            width: 90%;
            min-height: 150px;
            padding: 16px;
            margin: 12px 5%;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
            border-radius: 5px;
          }
          .card:hover {
            box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
          }
          @media only screen and (min-width: 1650px) {
            .card {
              margin: 10px;
              width: auto;
              // height: 100%;
              margin: 0.7rem;
            }
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.user,
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps, { removeUser })(UserItem);
