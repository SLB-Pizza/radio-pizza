import React, { useState } from "react";
import { Link } from "gatsby";
import {
  faMixcloud,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="navbar is-fixed-bottom is-black"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container is-fluid">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <figure className="image is-64x64">
                <img src="../img/Halfmoon-3.png" alt="Halfmoon Logo" />
              </figure>
            </Link>
          </div>
          <span
            className={menuOpen ? "navbar-burger is-active" : "navbar-burger"}
            role="button"
            aria-label="navigation menu"
            aria-expanded={menuOpen ? "true" : "false"}
            data-target="nav-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div
          className={menuOpen ? "navbar-menu is-active" : "navbar-menu"}
          id="nav-menu"
        >
          <div className="navbar-start">
            <p className="navbar-item">
              <Link to="/schedule">Schedule</Link>
            </p>
            <p className="navbar-item">
              <Link to="/residents">Residents</Link>
            </p>
            <p className="navbar-item">
              <Link to="/bio">Bio</Link>
            </p>
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
                <FontAwesomeIcon icon={faMixcloud} size="1x" />
              </span>
            </a>
            <a href="#" className="navbar-item">
              <span className="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faInstagram} size="1x" />
              </span>
            </a>
            <a href="#" className="navbar-item">
              <span className="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </span>
            </a>
            <p className="navbar-item title is-size-6-desktop is-size-6-touch has-text-light">
              Ears to the concrete.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
