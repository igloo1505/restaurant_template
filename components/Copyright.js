import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        margin: "1rem 0.75rem 2rem 0.75rem",
      }}
    >
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ backgroundColor: "transparent" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.igloodevelopment.dev">
          IglooDevelopment
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
