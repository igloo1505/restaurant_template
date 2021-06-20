import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { FcOk, FcApproval, FcHighPriority } from "react-icons/fc";
import { DISPOSE_ALERT } from "../stateManagement/TYPES";

const Alert = ({ alert: { alertText, alertType, isOpen } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        dispatch({ type: DISPOSE_ALERT });
      }, 3000);
    }
  }, [isOpen]);
  switch (alertType) {
    case "success":
      return (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
          style={
            isOpen
              ? { display: "block", position: "absolute", top: 0, right: 0 }
              : { display: "none" }
          }
        >
          <FcOk style={{ fontSize: "1.5rem" }} />
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>
            {alertText}
          </div>
        </div>
      );
    case "danger":
      return (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
          style={
            isOpen
              ? { display: "block", position: "absolute", top: 0, right: 0 }
              : { display: "none" }
          }
        >
          <FcHighPriority style={{ fontSize: "1.5rem" }} />
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>
            {alertText}
          </div>
        </div>
      );
    case "info":
      return (
        <div
          className="alert alert-primary d-flex align-items-center"
          role="alert"
          style={
            isOpen
              ? { display: "block", position: "absolute", top: 0, right: 0 }
              : { display: "none" }
          }
        >
          <div style={{ marginRight: "10px", marginLeft: "10px" }}>
            {alertText}
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
  alert: state.UI.alert,
});

export default connect(mapStateToProps)(Alert);
