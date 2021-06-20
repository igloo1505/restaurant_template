import React, { useState, useEffect } from "react";
import styles from "../styles/PortalLogin.module.scss";
import { authenticateUser, addNewUser } from "../stateManagement/userActions";
import { setNavbarHeight } from "../stateManagement/uiActions";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";

const PortalLogin = ({
  userState,
  UI: {
    viewport: { navHeight },
  },
  props,
  authenticateUser,
  addNewUser,
}) => {
  useEffect(() => {
    console.log(navHeight);
  }, []);
  const [user, setUser] = useState({});
  const handlePortalLogin = async () => {
    // authenticateUser(user);
    // addNewUser(user);
    authenticateUser(user);
  };
  return (
    <div
      className={styles.PortalLoginContainer}
      style={{ height: `calc(100vh - ${navHeight}px)` }}
    >
      <div className={styles.portalLoginCard}>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Username
            </label>
            <TextField
              type="email"
              autofocus={true}
              required={true}
              className="form-control"
              id="portalLoginEmail"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Password
            </label>
            <TextField
              type="password"
              className="form-control"
              required={true}
              id="portalLoginPassword"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={() => handlePortalLogin()}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state, initialProps) => ({
  userState: state.user,
  UI: state.UI,
  props: state.props,
});

export default connect(mapStateToProps, { authenticateUser, addNewUser })(
  PortalLogin
);
