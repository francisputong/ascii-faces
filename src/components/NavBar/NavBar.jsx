import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import SortMenu from "../SortMenu";
import useStyles from "./styles";

const NavBar = ({ setSort }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ASCII FACES
          </Typography>
          <SortMenu setSort={setSort} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
