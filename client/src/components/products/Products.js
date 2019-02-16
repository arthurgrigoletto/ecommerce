import React, { Component } from "react";
import { connect } from "react-redux";

class Products extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  {}
)(Products);
