import { useEffect, useState, useRef, useCallback } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ProductCards from "./components/ProductCards/ProductCards";
import NavBar from "./components/NavBar/NavBar";
import OrderByMenu from "./components/OrderByMenu";
import { getAd } from "./ads/randomAd";
import { getProducts } from "./api/products";
import { uppercaseFirstLetter } from "../src/util/dataFormat";
import useStyles from "./styles";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cacheProducts, setCacheProducts] = useState([]);
  const [sort, setSort] = useState("size");
  const [orderBy, setOrderBy] = useState("asc");
  const [pageNumber, setPageNumber] = useState(0);
  const [adApperanceCounter, setAdAppearanceCounter] = useState(0);
  const [end, setEnd] = useState(false);
  const [loading, setIsLoading] = useState(false);

  // save reference to last product
  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting || entries[1]?.isIntersecting) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setEnd(false);
    setAdAppearanceCounter(0);
    getInitialProducts();
  }, [sort, orderBy]);

  useEffect(() => {
    if (products.length === 0) return;
    if (!end) getMoreProducts();
    const cached = cacheProducts.splice(0, cacheProducts.length);
    setProducts([...products, ...cached]);
  }, [pageNumber]);

  //Called on first page load
  const getInitialProducts = async () => {
    setIsLoading(true);
    setProducts([]);
    setPageNumber(0);
    try {
      const { data } = await getProducts(sort, 0, orderBy);
      setProducts([...data, ...getAd()]);
      setAdAppearanceCounter(0 + data.length);
      setPageNumber(1);
      if (data.length < 20) setEnd(true);
    } catch (err) {
      console.log(err.response);
    }
    setIsLoading(false);
  };

  //Called when user scrolls down
  const getMoreProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await getProducts(sort, pageNumber, orderBy);
      setAdAppearanceCounter(adApperanceCounter + data.length);
      if (Number.isInteger(adApperanceCounter / 20) && data.length === 20) {
        setCacheProducts([...data, ...getAd()]);
      } else {
        setCacheProducts(data);
      }
      if (data.length < 20) setEnd(true);
    } catch (err) {
      console.log(err.response);
    }
    setIsLoading(false);
  };

  const classes = useStyles();

  return (
    <div>
      <NavBar setSort={setSort} />
      <div className={classes.container}>
        <div className={classes.sortOrder}>
          <Typography variant="h6" color="textPrimary" component="p">
            Sort by: {uppercaseFirstLetter(sort)}
          </Typography>{" "}
          <div className={classes.order}>
            <OrderByMenu setOrderBy={setOrderBy} orderBy={orderBy} />
          </div>
        </div>
        {products.length > 0 && (
          <ProductCards products={products} lastProductRef={lastProductRef} />
        )}
        {loading && (
          <div
            className={
              products.length > 0 ? classes.center : classes.initialLoad
            }
          >
            <CircularProgress />
          </div>
        )}
        {end && (
          <div className={classes.center}>
            <Typography variant="body1" color="textSecondary" component="p">
              ~ end of catalogue ~
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
