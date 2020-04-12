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
      className="navbar is-fixed-bottom"
      role="navigation"
      aria-label="navigation bar"
      id="navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to="/">
            <figure className="image is-32x32">
              <img src="../img/halfmoon-3.png" alt="Return to home page" />
            </figure>
          </Link>
          <div className="navbar-item is-hidden-desktop">
            <p className="title is-size-5-desktop is-size-6-tablet is-size-7-mobile has-text-light">
              Ears to the concrete.
            </p>
          </div>
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
            <Link to="/schedule" onClick={() => setMenuOpen(!menuOpen)}>
              Schedule
            </Link>
          </p>
          <p className="navbar-item">
            <Link to="/residents" onClick={() => setMenuOpen(!menuOpen)}>
              Residents
            </Link>
          </p>
          <p className="navbar-item">
            <Link to="/bio" onClick={() => setMenuOpen(!menuOpen)}>
              Bio
            </Link>
          </p>
          <div className="navbar-item has-dropdown has-dropdown-up">
            <a className="navbar-link" onClick={() => setMenuOpen(!menuOpen)}>
              Content
            </a>
            <div className="navbar-dropdown">
              <div
                className="navbar-item"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Recent Mixes
              </div>
              <a
                href="#"
                className="navbar-item"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Live Events
              </a>
              <a
                href="#"
                className="navbar-item"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Features
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end is-hidden-touch">
          <div className="navbar-item">
            <p className="title is-size-6-desktop is-size-7-touch has-text-light">
              Ears to the concrete.
            </p>
          </div>
          <a
            href="https://www.mixcloud.com/HalfMoonbk/"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faMixcloud} size="lg" />
            </span>
          </a>
          <a
            href="https://www.instagram.com/halfmoonbk/"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </span>
          </a>
          <a
            href="https://twitter.com/halfmoonbk"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </span>
          </a>
        </div>
        <hr className="navbar-divider"></hr>
        <div className="navbar-end is-hidden-desktop">
          <a
            href="https://www.mixcloud.com/HalfMoonbk/"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faMixcloud} size="lg" />
            </span>
          </a>
          <a
            href="https://www.instagram.com/halfmoonbk/"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </span>
          </a>
          <a
            href="https://twitter.com/halfmoonbk"
            className="navbar-item"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="icon is-medium">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
