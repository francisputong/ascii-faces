import React from "react";
import { Grid } from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";

import useStyles from "./styles.js";

const ProductCards = ({ products, lastProductRef }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {products.map((product, i) => {
        return (
          <Grid
            ref={products.length === i + 8 ? lastProductRef : null}
            key={i}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <ProductCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductCards;
