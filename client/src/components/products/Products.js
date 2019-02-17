import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProducts } from "../../actions/productActions";
import ProductsFeed from "./ProductsFeed";

import "./Products.css";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;

    let productItems;

    if (products === null || loading) {
      productItems = <Spinner />;
    } else if (products.length > 0) {
      productItems = (
        <div className="card-deck">
          <ProductsFeed products={products} />
        </div>
      );
    } else {
      productItems = <h4>No Products Found...</h4>;
    }
    return (
      <div className="products">
        <div className="container">{productItems}</div>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
