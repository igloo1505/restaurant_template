import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Accordion from "@material-ui/core/Accordion";
import Checked_circular from "@material-ui/icons/CheckCircleOutline";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import UncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckboxIcon from "@material-ui/icons/CheckBox";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  detailsContainer: { display: "flex", flexDirection: "column" },
  menuItemContainer: {
    width: "100%",
    paddingTop: "16px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  },
  accordianRoot: {
    // borderBottomRightRadius: "20px !important",
    // borderBottomLeftRadius: "20px !important",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
  accordianDetailsRoot: {
    padding: "0px 16px 16px 16px",
    backgroundColor: `${theme.palette.primary.light} !important`,
    borderBottomRightRadius: "20px !important",
    borderBottomLeftRadius: "20px !important",
    boxShadow: `none`,
    // transition: theme.transitions.create(["box-shadow"], {
    //   duration: 0,
    // }),
    "&.addBoxShadow": {
      boxShadow: `4px 4px 15px ${theme.palette.grey[500]}, -4px -4px 15px ${theme.palette.grey[50]}`,
      transition: theme.transitions.create(["box-shadow"], {
        duration: 350,
      }),
    },
  },
  outerContainer: {
    marginBottom: "16px",
    [theme.breakpoints.down(960)]: {
      marginBottom: "0px",
    },
  },
  addBoxShadow: {
    boxShadow: `4px 4px 9px ${theme.palette.grey[400]}, -4px -4px 9px ${theme.palette.grey[50]}`,
    transition: theme.transitions.create(["box-shadow"], {
      duration: 350,
    }),
    "&:hover": {
      boxShadow: `2px 2px 9px ${theme.palette.grey[500]}, -2px -2px 9px ${theme.palette.grey[100]}`,
      transition: theme.transitions.create(["box-shadow"], {
        duration: 250,
      }),
    },
  },
  addBoxShadowSummaryExtended: {
    boxShadow: `0px 3px 5px ${theme.palette.grey[600]}, 2px 4px 15px ${theme.palette.grey[600]}, -2px -4px 15px ${theme.palette.grey[200]}`,
    transition: theme.transitions.create(["box-shadow"], {
      // duration: 250,
      duration: 250,
    }),
    "&:hover": {
      boxShadow: `0px 2px 3px ${theme.palette.grey[600]}, 1px 2px 10px ${theme.palette.grey[600]}, -1px -2px 10px ${theme.palette.grey[200]}`,
      transition: theme.transitions.create(["box-shadow"], {
        duration: 450,
      }),
    },
  },
}));
const useSummaryClasses = makeStyles((theme) => ({
  root: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
    border: `1px solid ${theme.palette.secondary.main}`,
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
  },
  expanded: { borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px" },
  focused: {
    color: "#fff",
  },
}));

const menuItems = [
  { text: "Recipe Title" },
  { text: "Ingredients" },
  { text: "Category" },
  { text: "Prep Time" },
  { text: "Cook Time" },
];
const MyRecipes_searchFilterAccordian = ({ props }) => {
  const [hasShadow, setHasShadow] = useState(false);
  const [detailsHasShadow, setDetailsHasShadow] = useState(false);
  const [extended, setExtended] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasShadow(true);
    }, 850);
  }, []);

  const toggleAccordian = () => {
    if (!extended) {
      setHasShadow(true);
      setTimeout(() => {
        setExtended(true);
      }, 250);
      setTimeout(() => {
        setDetailsHasShadow(true);
      }, 450);
    }
    if (extended) {
      setExtended(false);
      setDetailsHasShadow(false);
    }
  };

  const classes = useStyles();
  const [focusState, setFocusState] = useState(false);
  const summaryClasses = useSummaryClasses();
  return (
    <div className={classes.outerContainer}>
      <Accordion
        classes={{
          root: clsx(
            classes.accordianRoot,
            focusState && classes.accordianFocused
          ),
          expanded: classes.accordianExpanded,
        }}
        expanded={extended}
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
      >
        <AccordionSummary
          expandIcon={<ExpandIcon />}
          onClick={() => {
            toggleAccordian();
          }}
          classes={{
            ...summaryClasses,
            root: clsx(
              summaryClasses.root,
              hasShadow && classes.addBoxShadow,
              extended && classes.addBoxShadowSummaryExtended
            ),
          }}
        >
          <Typography className={classes.heading}>Fields to search:</Typography>
        </AccordionSummary>
        <AccordionDetails
          classes={{
            root: clsx(
              classes.accordianDetailsRoot,
              detailsHasShadow && "addBoxShadow"
            ),
          }}
        >
          <div className={classes.menuItemContainer}>
            {menuItems.map((item, i, a) => (
              <MenuItem item={item} key={item.text} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    myRecipes: state.myRecipes,
    props: props,
  };
};

export default connect(mapStateToProps)(MyRecipes_searchFilterAccordian);

const useItemClasses = makeStyles((theme) => ({
  itemContainer: {},
  formControlRoot: {
    width: "100%",
    height: "100%",
    margin: "0px 16px 0px -11px",
    "& *": {
      color: "#fff",
    },
  },
  checkBox: {
    color: "#fff",
    backgroundColor: `${theme.palette.primary.light} !important`,
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  checked: {
    // color: "green !important",
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
}));
const MenuItem = ({ item }) => {
  const [checked, setChecked] = useState(false);
  const [checkedTransition, setCheckedTransition] = useState(false);
  const handleChange = () => {
    setCheckedTransition(!checkedTransition);
    setTimeout(() => setChecked(!checked), 250);
  };
  const classes = useItemClasses();
  return (
    <div className={classes.itemContainer}>
      <FormControlLabel
        label={item.text}
        classes={{ root: classes.formControlRoot }}
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name={item.text}
            classes={{ root: classes.checkBox, checked: classes.checked }}
            checkedIcon={<CheckedIcon checkedTransition={checkedTransition} />}
            icon={<UnCheckedIcon checkedTransition={checkedTransition} />}
          />
        }
      />
    </div>
  );
};

const useIconClasses = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#fff",
    // color: theme.palette.secondary.main,
    color: "#fff",
    // width: "18px",
    // height: "18px",
    boxShadow: "2px 2px 5px #4386d4, -2px -2px 5px #5fbcff",
    transition: theme.transitions.create(["box-shadow", "color"], {
      // duration: 350,
      duration: 550,
    }),
    borderRadius: "50%",
    "& path": {
      width: "100%",
      height: "100%",
    },
  },
  fadeDiv: {
    margin: "0px",
    padding: "0px",
  },
}));
const useUncheckedIconClasses = makeStyles((theme) => ({
  root: {
    color: "#e0e0e0",
    boxShadow: "inset 2px 2px 5px #4386d4, inset -2px -2px 5px #5fbcff",
    transition: theme.transitions.create(["box-shadow", "color"], {
      duration: 350,
    }),
    borderRadius: "50%",
    "& path": {
      width: "100%",
      height: "100%",
    },
    "&:hover": {
      boxShadow: "inset 1px 1px 5px #4386d4, inset -1px -1px 5px #5fbcff",
      color: "#fff !important",
    },
  },
  fadeDiv: {
    margin: "0px",
    padding: "0px",
  },
}));
const CheckedIcon = ({ checkedTransition }) => {
  const iconClasses = useIconClasses();

  const timeouts = { appear: 250, enter: 250, exit: 450 };
  return (
    <Fade in={true} timeout={timeouts}>
      <span className={iconClasses.fadeDiv}>
        <Checked_circular classes={{ root: iconClasses.root }} />
      </span>
    </Fade>
  );
};

const UnCheckedIcon = (props) => {
  const iconClasses = useUncheckedIconClasses();
  // return <CheckboxIcon classes={{ root: iconClasses.root }} />;
  return (
    // <Fade>
    <span className={iconClasses.fadeDiv}>
      <UncheckedIcon classes={{ root: iconClasses.root }} />
    </span>
    // </Fade>
  );
};

const useExpandIconClasses = makeStyles((theme) => ({
  root: { color: "#fff" },
}));

const ExpandIcon = () => {
  const classes = useExpandIconClasses();

  return <ExpandMoreIcon classes={{ root: classes.root }} />;
};
