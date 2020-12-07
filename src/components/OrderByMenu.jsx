import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const OrderByMenu = ({ setOrderBy, orderBy }) => {
  const handleChange = (event) => {
    setOrderBy(event.target.value);
  };

  return (
    <Select
      labelId="order"
      id="order-select"
      value={orderBy}
      onChange={handleChange}
    >
      <MenuItem value={"asc"}>Ascending</MenuItem>
      <MenuItem value={"desc"}>Descending</MenuItem>
    </Select>
  );
};

export default OrderByMenu;
