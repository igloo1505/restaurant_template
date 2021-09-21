/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListAddIcon from "@material-ui/icons/PlaylistAdd";
import ListCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { handleGroceryItem } from "../../stateManagement/userActions";

const useClasses = makeStyles((theme) => ({
  outerContainer: {
    width: "100%",
    // padding: "calc(0.5rem + 1px)",
    padding: "0.5rem",
    // border: "1px solid rgba(0, 0, 0, 0.5)",
    marginTop: "0.5rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    "&:hover": {
      padding: "0.5rem",
      //   border: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "1px 1px 2px #cc540e, -1px -1px 2px #ff6c12",
      //   boxShadow: "inset 3px 3px 6px #cc540e, inset -3px -3px 6px #ff6c12",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 250,
      }),
    },
  },
  optionalText: {
    color: theme.palette.grey[50],
    fontSize: "0.8rem",
    fontStyle: "italic",
    marginLeft: "0.75rem",
  },
  bagIconCheck: {
    // color: "green",
    height: "1.5rem",
    width: "auto",
    color: "#fff",
  },
  bagIconAdd: {
    height: "1.5rem",
    width: "auto",
    // color: theme.palette.primary.dark,
    color: "#fff",
    "&:hover": {
      cursor: "pointer",
    },
  },
  bagIconContainer: {},
  nameTextRoot: {
    color: "#fff",
  },
}));

const Details_IngredientItem = ({
  props: { item, recipeId },
  groceries: { myGroceries },
  user: {
    loggedIn,
    self: { _id: userId },
  },
  handleGroceryItem,
}) => {
  const [inGroceries, setInGroceries] = useState(false);
  useEffect(() => {
    if (myGroceries) {
      let _myGroceries = [];
      myGroceries.forEach((gi, i, a) => {
        _myGroceries.push(gi.ingredient.name.toLowerCase().trim());
      });
      // if(_myGroceries.includes(item.name.toLowerCase().trim()))
      setInGroceries(_myGroceries.includes(item.name.toLowerCase().trim()));
    }
    // if (!myGroceries) {
    //   setInGroceries(false);
    // }
  }, [myGroceries]);
  let itemUnit = item.unit;
  if (item.quantity <= 1 && itemUnit[itemUnit.length - 1] === "s") {
    console.log("change here");
    itemUnit = itemUnit.slice(0, itemUnit.length - 1);
  }
  console.log("item: ", item);
  const classes = useClasses();

  const handleGroceryItemClick = () => {
    if (loggedIn && userId) {
      console.log("Add here");
      if (inGroceries) {
        handleGroceryItem({
          ingredientId: inGroceries._id,
          method: "remove",
        });
      }
      if (!inGroceries) {
        handleGroceryItem({
          ingredientId: item._id,
          method: inGroceries ? "remove" : "add",
        });
      }
    }
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.bagIconContainer}>
        {inGroceries ? (
          <ListCheckIcon
            className={classes.bagIconCheck}
            onClick={handleGroceryItemClick}
          />
        ) : (
          <ListAddIcon
            className={classes.bagIconAdd}
            onClick={handleGroceryItemClick}
          />
        )}
      </div>
      <div className={classes.nameContainer}>
        <Typography classes={{ root: classes.nameTextRoot }}>
          {item.quantity} {itemUnit} {item.name}
        </Typography>
        {item.optional && (
          <Typography classes={{ root: classes.optionalText }}>
            Optional
          </Typography>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state, props) => ({
  user: state.user,
  groceries: state.groceries,
  props: props,
});

export default connect(mapStateToProps, { handleGroceryItem })(
  Details_IngredientItem
);
