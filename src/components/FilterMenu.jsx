import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";

const filterOptions = [{ name: "size" }, { name: "price" }, { name: "date" }];

const FilterMenu = ({ setFilter }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, option) => {
    setAnchorEl(null);
    if (option.name) setFilter(option.name);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="primary"
        variant="contained"
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filterOptions.map((option, i) => (
          <MenuItem
            key={i}
            value="size"
            onClick={(e) => handleClose(e, option)}
          >
            {`${option.name.charAt(0).toUpperCase()}${option.name.slice(1)}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterMenu;
