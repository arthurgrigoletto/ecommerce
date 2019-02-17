import axios from "axios";
import { PRODUCT_LOADING, GET_PRODUCTS } from "./types";

// Get Products
export const getProducts = () => dispatch => {
  dispatch(setProductLoading());

  axios.get("/api/products").then(res =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data.docs
    })
  );
};

// Set loading state
export const setProductLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
