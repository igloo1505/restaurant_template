import React, { useEffect, useState, Fragment } from "react";
import ClientSidePortal from "./ClientSidePortal";
import { logOut as logOutUser } from "../../stateManagement/userActions";
import { useRouter } from "next/router";
import * as Types from "../../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    position: "fixed",
    zIndex: "1303 !important",
    inset: "0px",
    backgroundColor: "transparent",
    transform: "translate(-30px, 30px)",
  },
  itemRoot: {
    "&:hover": {
      backgroundColor: " rgba(251,	201,	92, 0.3)",
    },
  },
}));
const AccountIconMenuLocal = ({
  props,
  UI: {
    accountMenu: { shouldBeVisible },
  },
  logOutUser,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  useEffect(() => {
    if (shouldBeVisible) {
      let menuAnchor = document.getElementById("accountIconButton");
      setAnchor(menuAnchor);
    }
    // if (!shouldBeVisible) {
    //   setAnchor(null);
    // }
  }, [shouldBeVisible]);

  const closeMenu = () => {
    dispatch({ type: Types.DISPOSE_ACCOUNT_MENU });
  };

  const logOut = () => {
    closeMenu();
    // dispatch({ type: Types.LOGOUT });
    logOutUser();
  };

  const handleItemClick = (path) => {
    closeMenu();
    router.push(path);
  };

  return (
    <>
      {shouldBeVisible && (
        <ClientSidePortal selector="#topLevelPortalContainer">
          <Menu
            id="account-menu"
            anchorEl={anchor}
            keepMounted
            open={shouldBeVisible}
            onClose={closeMenu}
            PopoverClasses={{ root: classes.popoverRoot }}
          >
            <MenuItem
              classes={{ root: classes.itemRoot }}
              onClick={() => handleItemClick("/myProfile")}
            >
              Profile
            </MenuItem>
            <MenuItem classes={{ root: classes.itemRoot }} onClick={logOut}>
              Logout
            </MenuItem>
          </Menu>
        </ClientSidePortal>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

export default connect(mapStateToProps, { logOutUser })(AccountIconMenuLocal);
