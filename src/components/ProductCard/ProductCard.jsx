import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useStyles from "./styles.js";
import { toCents, getRelativeTime } from "../../util/dataFormat";

const ProductCard = ({ product: { size, price, face, date } }) => {
  const classes = useStyles();
  const fontsize = { fontSize: `${size}px` };

  const handleClick = (text) => {
    console.log("WEWE");
    alert(`${text}\nYou bought me!`);
  };

  return (
    <Card className={classes.root} raised>
      <CardContent className={classes.content}>
        <div style={fontsize} className={classes.ascii}>
          {date ? (
            face
          ) : (
            <Typography variant="h5" color="primary" component="p">
              {face}
            </Typography>
          )}
        </div>
        <div className={classes.details}>
          <div className={classes.size}>
            <Typography gutterBottom variant="h6" component="h2">
              {date ? `$${toCents(price)}` : "Advertisement"}
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="p">
              {date ? `${size}px` : "Please buy me"}
            </Typography>
          </div>
          {date && (
            <Typography variant="body2" color="textSecondary" component="p">
              {getRelativeTime(date)}
            </Typography>
          )}
        </div>
      </CardContent>
      <CardActions className={classes.floatRight}>
        <Button
          color="primary"
          variant="contained"
          startIcon={date && <ShoppingCartIcon />}
          onClick={() => handleClick(face)}
        >
          {date ? "Buy" : "View Ad"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
