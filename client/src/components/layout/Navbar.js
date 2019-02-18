import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userActions";

import icon from "../../assets/img/icon.png";
import "./Navbar.css";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();

    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.user;
    const authLinks = (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink-333"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          href=""
        >
          <img
            src={user.avatar}
            className="rounded-circle z-depth-0"
            alt={user.name}
            height="35"
          />
        </a>
        <div
          className="dropdown-menu dropdown-menu-right dropdown-default"
          aria-labelledby="navbarDropdownMenuLink-333"
        >
          <Link className="dropdown-item" to="/edit">
            Edit
          </Link>
          <a className="dropdown-item" href="" onClick={this.onLogoutClick}>
            Logout
          </a>
        </div>
      </li>
    );

    const guestLinks = (
      <li className="nav-item items">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    );

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark scrolling-navbar">
          <a className="navbar-brand" href="/">
            <img src={icon} alt="logo" width={40} className="icon" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item items">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item items">
                <Link className="nav-link" to="/locations">
                  Locations
                </Link>
              </li>
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
