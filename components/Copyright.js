import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <div style={{ backgroundColor: "transparent" }}>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        style={{ backgroundColor: "transparent" }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          IglooDevelopment
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  );
};

export default Copyright;
