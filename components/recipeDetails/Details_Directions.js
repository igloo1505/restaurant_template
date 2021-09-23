/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect, forwardRef } from "react";
import { connect, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getFormattedTimeIndividual } from "../../util/getFormattedTime";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useClasses = makeStyles((theme) => ({
  directionsOuterDiv: {
    margin: "1rem 0rem 1rem 3rem",
  },
  titleText: {
    marginLeft: "2rem",
  },
}));

const Details_Directions = ({ recipe }) => {
  const { directions } = recipe;
  const [_directions, setDirections] = useState([]);
  let __directions = [];
  useEffect(() => {
    directions.map((d, i, a) => {
      __directions.push({ string: d, checked: false });
      if (i === a.length - 1) {
        setDirections(__directions);
      }
    });
  }, [directions]);

  const classes = useClasses();
  const toggleChecked = (index) => {
    let harryStyles = [..._directions];
    harryStyles[index].checked = !harryStyles[index].checked;
    setDirections(harryStyles);
  };
  return (
    <div className={classes.directionsOuterDiv}>
      {_directions.length &&
        _directions.map((d, i, a) => (
          <DirectionItem
            direction={d}
            index={i}
            array={a}
            key={`direction-item-${i}`}
            toggleChecked={toggleChecked}
          />
        ))}
    </div>
  );
};

export default Details_Directions;

const useItemClasses = makeStyles((theme) => ({
  directionItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "0.5rem 0.75rem",
    gap: "1rem",
    margin: "0.5rem 0rem",
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: "4px",
    backgroundColor: theme.palette.common.paperLight,
  },
  indexNumberWrapper: {
    border: `1px solid ${theme.palette.grey[50]}`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "3px 3px 7px #c9cccf, -3px -3px 7px #ffffff",
    transition: theme.transitions.create(["box-shadow"], {
      duration: 250,
    }),
    "&:hover": {
      boxShadow: "2px 2px 5px #c9cccf, -2px -2px 5px #ffffff",
      cursor: "default",
      transition: theme.transitions.create(["box-shadow"], {
        duration: 250,
      }),
    },
  },
}));

const _DirectionItem = ({
  direction,
  index,
  array,

  UI: {
    viewport: { width: deviceWidth, height: deviceHeight },
  },
}) => {
  const [horriblePracticeToMakeCircle, setHorriblePracticeToMakeCircle] =
    useState({});
  const classes = useItemClasses();
  useEffect(() => {
    if (typeof window !== undefined) {
      setHorriblePracticeToMakeCircle({
        width: `${
          document
            .getElementById(`directionItem-${index}`)
            .getBoundingClientRect().height
        }px`,
        minWidth: `${
          document
            .getElementById(`directionItem-${index}`)
            .getBoundingClientRect().height
        }px`,
      });
    }
  }, [deviceHeight, deviceWidth]);
  return (
    <div className={classes.directionItemContainer}>
      <div
        className={classes.indexNumberWrapper}
        id={`directionItem-${index}`}
        style={horriblePracticeToMakeCircle}
      >
        <Typography variant="h5" className={classes.numberText}>
          {index + 1}
        </Typography>
      </div>
      <Typography variant="h6">{direction.string}</Typography>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  props: props,
});

const DirectionItem = connect(mapStateToProps)(_DirectionItem);

// TODO add this back in if adding in timer function.
// <FormControlLabel
//         style={{ backgroundColor: "transparent" }}
//         control={
//           <Checkbox
//             value={array[index].checked}
//             checked={array[index].checked}
//             name={`direction-${index}`}
//             onChange={() => toggleChecked(index)}
//             color="primary"
//           />
//         }
//       />
