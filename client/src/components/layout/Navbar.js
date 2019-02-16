import React from "react";
import icon from "../../assets/img/icon.png";
import avatar from "../../assets/img/cv2.jpg";
import "./Navbar.css";

export default props => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
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
        <li className="nav-item items">Home</li>
        <li className="nav-item items">Locations</li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle p-0"
            id="navbarDropdownMenuLink-333"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            href="#"
          >
            <img
              src={avatar}
              className="rounded-circle z-depth-0"
              alt="user"
              height="35"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right dropdown-default"
            aria-labelledby="navbarDropdownMenuLink-333"
          >
            <a className="dropdown-item" href="#">
              Edit
            </a>
            <a className="dropdown-item" href="#">
              Cart
            </a>
            <a className="dropdown-item" href="#">
              Logout
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
);
