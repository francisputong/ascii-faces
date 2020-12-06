import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SortIcon from "@material-ui/icons/Sort";

import { uppercaseFirstLetter } from "../util/dataFormat";

const sortOptions = [{ name: "size" }, { name: "price" }, { name: "date" }];

const SortMenu = ({ setSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, option) => {
    setAnchorEl(null);
    if (option.name) setSort(option.name);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        variant="contained"
        onClick={handleClick}
        startIcon={<SortIcon />}
      >
        Sort
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {sortOptions.map((option, i) => (
          <MenuItem
            key={i}
            value="size"
            onClick={(e) => handleClose(e, option)}
          >
            {uppercaseFirstLetter(option.name)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortMenu;
