import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  root: {
    width: "100%",
  },
  content: {
    paddingBottom: 0,
  },
  ascii: {
    fontSize: "12px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
  },
  size: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  floatRight: {
    float: "right",
  },
});
