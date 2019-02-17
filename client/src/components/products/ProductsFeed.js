import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductsItem from "./ProductsItem";

class ProductsFeed extends Component {
  render() {
    const { products } = this.props;

    return products.map(product => (
      <ProductsItem key={product._id} product={product} />
    ));
  }
}

ProductsFeed.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductsFeed;
