import React from "react";
import { Link } from "gatsby";
import {
  faMixcloud,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BottomNav() {
  return (
    <nav
      className="navbar is-fixed-bottom is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container is-fluid">
        <div className="navbar-brand">
          <div className="navbar-item">
            <figure className="image is-1by1">
              <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
            </figure>
          </div>
          <span
            className="navbar-burger burger"
            role="button"
            aria-label="menu"
            aria-expanded="false"
            data-target="nav-menu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div className="navbar-menu" id="nav-menu">
          <div className="navbar-start">
            <p className="navbar-item">
              <Link to="/schedule">Schedule</Link>
            </p>

            <a className="navbar-item">Link 2</a>

            <div className="navbar-item has-dropdown has-dropdown-up is-hoverable">
              <a className="navbar-link">Link Dropdown</a>

              <div className="navbar-dropdown">
                <a className="navbar-item">Category 1</a>
                <a className="navbar-item">Category 2</a>
                <a className="navbar-item">Category 3</a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <a href="#" className="navbar-item">
              <span className="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faMixcloud} size="2x" />
              </span>
            </a>
            <a href="#" className="navbar-item">
              <span className="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </span>
            </a>
            <a href="#" className="navbar-item">
              <span className="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </span>
            </a>
            <p className="navbar-item">Ears to the concrete.</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
