import React, { useEffect, useState, Fragment } from "react";
import ClientSidePortal from "./ClientSidePortal";
import { handleGroceryItem } from "../../stateManagement/userActions";
import { useRouter } from "next/router";
import * as Types from "../../stateManagement/TYPES";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  popoverRoot: {
    position: "fixed",
    zIndex: "1303 !important",
    inset: "0px",
    backgroundColor: "transparent",
    transform: "translate(-30px, 30px)",
  },
  menuPaper: {
    // transform: "translateX(-50%) !important",
  },
  viewAll: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));
const Grocery_navbarMenu = ({
  props,
  UI: {
    Grocery_navbarMenu: { shouldBeVisible },
  },
  groceries: { myGroceries },
}) => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  useEffect(() => {
    console.log("shouldBeVisible: ", shouldBeVisible);
    if (shouldBeVisible) {
      let menuAnchor = document.getElementById("groceryIconButton");
      setAnchor(menuAnchor);
    }
  }, [shouldBeVisible]);

  const closeMenu = () => {
    dispatch({ type: Types.DISPOSE_GROCERY_MENU });
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
            id="grocery-menu"
            anchorEl={anchor}
            keepMounted
            open={shouldBeVisible}
            onClose={closeMenu}
            PopoverClasses={{ root: classes.popoverRoot }}
            classes={{
              paper: classes.menuPaper,
              list: classes.list,
            }}
          >
            {myGroceries?.map((gi, i, a) => (
              <GroceryMenuItem gi={gi} i={i} a={a} classes={classes} />
            ))}
            {Boolean(myGroceries?.length && myGroceries?.length > 0) && (
              <MenuItem classes={{ root: classes.viewAll }}>View All</MenuItem>
            )}
            {Boolean(!myGroceries?.length || myGroceries?.length === 0) && (
              <MenuItem classes={{ root: classes.viewAll }} disabled>
                No Items Added
              </MenuItem>
            )}
          </Menu>
        </ClientSidePortal>
      )}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  groceries: state.groceries,
  props: props,
});

export default connect(mapStateToProps)(Grocery_navbarMenu);

const useMenuItemClasses = makeStyles((theme) => ({
  itemRoot: {
    display: "flex",
    flexDirection: "row",
    padding: "6px 16px 6px 0px",
    wordWrap: "break-word",
    whiteSpace: "break-word",
    maxWidth: "450px",
    "&:hover": {
      backgroundColor: " rgba(251,	201,	92, 0.3)",
    },
  },
  hideItem: {
    display: "none",
  },
  cancelIcon: {
    color: theme.palette.secondary.main,
    height: "0.75rem",
    width: "0.75rem",
    margin: "0px 8px",
  },
  textRoot: {
    maxWidth: "100%",
    wordWrap: "break-word",
    whiteSpace: "break-spaces",
  },
}));

const GroceryMenuItem = ({ gi, i, a }) => {
  const itemClasses = useMenuItemClasses();
  const dispatch = useDispatch();
  const removeItem = () => {
    dispatch(
      handleGroceryItem({
        ingredientId: gi._id,
        method: "remove",
      })
    );
  };
  return (
    <Fragment>
      <MenuItem
        classes={
          i < 5
            ? { root: itemClasses.itemRoot }
            : { root: itemClasses.hideItem }
        }
      >
        <CancelIcon
          classes={{ root: itemClasses.cancelIcon }}
          onClick={removeItem}
        />
        <Typography classes={{ root: itemClasses.textRoot }}>
          {gi.ingredient.name}
        </Typography>
      </MenuItem>
      {i < 5 && <Divider />}
    </Fragment>
  );
};
