import { PRODUCT_LOADING, GET_PRODUCTS } from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
