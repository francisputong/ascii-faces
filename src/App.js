import { useEffect, useState, useRef, useCallback } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ProductCards from "./components/ProductCards/ProductCards";
import NavBar from "./components/NavBar/NavBar";
import { getAd } from "./ads/randomAd";
import { getProducts } from "./api/products";
import useStyles from "./styles";

const App = () => {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("size");
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
        if (entries[0].isIntersecting) {
          setPageNumber(pageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setAdAppearanceCounter(0);
    getInitialProducts();
  }, [sort]);

  useEffect(() => {
    if (products.length === 0) return;
    if (!end) getMoreProducts();
  }, [pageNumber]);

  const getInitialProducts = async () => {
    setIsLoading(true);
    setProducts([]);
    setEnd(false);
    setPageNumber(0);
    try {
      const { data } = await getProducts(sort, 0);
      setProducts([...data, ...getAd()]);
      setAdAppearanceCounter(0 + data.length);

      if (data.length < 20) setEnd(true);
    } catch (err) {
      console.log(err.response);
    }
    setIsLoading(false);
  };

  const getMoreProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await getProducts(sort, pageNumber);
      setAdAppearanceCounter(adApperanceCounter + data.length);
      if (Number.isInteger(adApperanceCounter / 20) && data.length === 20) {
        setProducts([...products, ...data, ...getAd()]);
      } else {
        setProducts([...products, ...data]);
      }
      if (data.length < 20) setEnd(true);
    } catch (err) {
      console.log(err.response);
    }
    setIsLoading(false);
  };

  const classes = useStyles();

  if (products.length === 0) {
    return (
      <div>
        <NavBar setSort={setSort} />
        <div className={classes.initialLoad}>
          <CircularProgress size="40px" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar setSort={setSort} />
      <div className={classes.container}>
        <Typography variant="h6" color="textPrimary" component="p">
          Sort by: {sort.charAt(0).toUpperCase()}
          {sort.slice(1)}
        </Typography>
        <ProductCards products={products} lastProductRef={lastProductRef} />
        {loading && (
          <div className={classes.center}>
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
