import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import FilterMenu from "../FilterMenu";
import useStyles from "./styles";

const NavBar = ({ setFilter }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            ASCII FACES
          </Typography>
          <FilterMenu setFilter={setFilter} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
