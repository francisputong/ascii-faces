import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useStyles from "./styles.js";

const ProductCard = ({ product: { size, price, face, date } }) => {
  const classes = useStyles();
  const fontsize = { fontSize: `${size}px` };

  const toCents = (price) => {
    return (price / 100).toFixed(2);
  };

  const getDuration = (seconds) => {
    const epochSeconds = {
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let second in epochSeconds) {
      const interval = Math.floor(seconds / epochSeconds[second]);
      if (interval > 0) {
        return {
          interval,
          second,
        };
      }
    }
  };

  const fromNow = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const { interval, second } = getDuration(seconds);
    const isPlural = interval === 1 ? "" : "s";
    if (interval > 7 && second === "day") return date;
    return `${interval} ${second}${isPlural} ago`;
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
              {fromNow(date)}
            </Typography>
          )}
        </div>
      </CardContent>
      <CardActions className={classes.floatRight}>
        <Button
          color="primary"
          variant="contained"
          startIcon={date && <ShoppingCartIcon />}
        >
          {date ? "Buy" : "View Ad"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
