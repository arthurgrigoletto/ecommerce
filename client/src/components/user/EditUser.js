import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import isEmpty from "../../validation/is-empty";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      street: "",
      number: "",
      zip: "",
      city: "",
      state: "",
      birthday: ""
    };
  }

  componentDidMount() {
    const user = this.props;

    this.setState({
      name: user.name,
      email: user.email,
      street: user.addess.street,
      number: user.addess.number,
      zip: user.addess.zip,
      city: user.addess.city,
      state: user.addess.state,
      birthday: user.birthday
    });
  }
  render() {
    return <div className="edit-user" />;
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(EditUser);
