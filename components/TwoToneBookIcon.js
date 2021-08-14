import React from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useClasses = makeStyles((theme) => ({
  svg: {
    // color: "black",
    color: theme.palette.secondary.main,
    fill: "black",
    fontSize: "2.1875rem",
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // fontSize: "1.5rem",
    flexShrink: 0,
    "-webkit-user-select": "none",
  },
  secondPath: {
    color: theme.palette.alternative.main,
    fill: theme.palette.alternative.main,
  },
}));
const TwoToneBookIcon = () => {
  const classes = useClasses();
  return (
    <svg viewBox="0 0 24 24" className={classes.svg}>
      <path
        className={classes.firstPath}
        d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM3 18.5V7c1.1-.35 2.3-.5 3.5-.5 1.34 0 3.13.41 4.5.99v11.5C9.63 18.41 7.84 18 6.5 18c-1.2 0-2.4.15-3.5.5zm18 0c-1.1-.35-2.3-.5-3.5-.5-1.34 0-3.13.41-4.5.99V7.49c1.37-.59 3.16-.99 4.5-.99 1.2 0 2.4.15 3.5.5v11.5z"
      />
      <path
        className={classes.secondPath}
        d="M11 7.49c-1.37-.58-3.16-.99-4.5-.99-1.2 0-2.4.15-3.5.5v11.5c1.1-.35 2.3-.5 3.5-.5 1.34 0 3.13.41 4.5.99V7.49z"
      />
      <g>
        <path
          className={classes.thirdPath}
          d="M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.28 0-2.46.16-3.5.47v1.57c.99-.35 2.18-.54 3.5-.54zM17.5 13.16c.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.28 0-2.46.16-3.5.47v1.57c.99-.34 2.18-.54 3.5-.54zM17.5 15.83c.88 0 1.73.09 2.5.26v-1.52c-.79-.15-1.64-.24-2.5-.24-1.28 0-2.46.16-3.5.47v1.57c.99-.35 2.18-.54 3.5-.54z"
        ></path>
      </g>
    </svg>
  );
};

export default TwoToneBookIcon;
