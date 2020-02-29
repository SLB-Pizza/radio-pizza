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
    <nav className="navbar is-fixed-bottom" id="bottom-color-test">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <p className="navbar-item">HalfmoonBK</p>
          <span className="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div className="navbar-start">
            <p className="navbar-item">
              <Link to="/schedule-page">Schedule</Link>
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
            <a href="/two-bar-layout" className="navbar-item">
              <span className="icon is-medium has-text-dark">
                <FontAwesomeIcon icon={faMixcloud} size="2x" />
              </span>
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              <span className="icon is-medium has-text-dark">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </span>
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              <span className="icon is-medium has-text-dark">
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
