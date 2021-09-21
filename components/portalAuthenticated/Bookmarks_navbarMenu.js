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
import { handleBookmark } from "../../stateManagement/recipeActions";
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
const Bookmarks_navbarMenu = ({
  props,
  UI: {
    Bookmarks_navbarMenu: { shouldBeVisible },
  },
  recipes: { myBookmarks },
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  useEffect(() => {
    console.log("Bookmarks_navbarMenu shouldBeVisible: ", shouldBeVisible);
    if (shouldBeVisible) {
      let menuAnchor = document.getElementById("favoriteIconButton");
      setAnchor(menuAnchor);
    }
  }, [shouldBeVisible]);

  const closeMenu = () => {
    dispatch({ type: Types.DISPOSE_BOOKMARK_MENU });
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
            {myBookmarks?.map((bi, i, a) => (
              <BookmarkMenuItem bi={bi} i={i} a={a} classes={classes} />
            ))}
            {Boolean(myBookmarks?.length && myBookmarks.length > 0) && (
              <MenuItem classes={{ root: classes.viewAll }}>View All</MenuItem>
            )}
            {Boolean(!myBookmarks?.length && myBookmarks.length === 0) && (
              <MenuItem classes={{ root: classes.viewAll }} disabled>
                No Bookmarks
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
  recipes: state.recipes,
  props: props,
});

export default connect(mapStateToProps)(Bookmarks_navbarMenu);

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

const trimTitle = (title) => {
  if (title?.length > 30) {
    return `${title.slice(0, 30)}...`;
  }
  return title;
};

const BookmarkMenuItem = ({ bi: { title, _id: recipeId }, i, a, classes }) => {
  const itemClasses = useMenuItemClasses();
  const dispatch = useDispatch();
  const router = useRouter();
  const removeItem = () => {
    dispatch(
      handleBookmark({
        recipeId: recipeId,
        method: "remove",
      })
    );
  };

  const redirectToRecipe = () => {
    router.push(`/recipeDetails/${recipeId}`);
    dispatch({ type: Types.DISPOSE_BOOKMARK_MENU });
  };

  return (
    <Fragment>
      <MenuItem
        classes={
          i < 5
            ? { root: itemClasses.itemRoot }
            : { root: itemClasses.hideItem }
        }
        onClick={redirectToRecipe}
      >
        <CancelIcon
          classes={{ root: itemClasses.cancelIcon }}
          onClick={removeItem}
        />
        <Typography classes={{ root: itemClasses.textRoot }}>
          {trimTitle(title)}
        </Typography>
      </MenuItem>
      {i < 5 && <Divider />}
    </Fragment>
  );
};
