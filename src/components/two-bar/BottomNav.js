import React from "react";
import {
  faMixcloud,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BottomNav() {
  return (
    <nav className="navbar is-dark is-fixed-bottom">
      <div className="container is-fluid">
        <div className="navbar-brand">
          <p class="navbar-item">HalfmoonBK</p>
          <span className="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div className="navbar-end">
            <a href="/two-bar-layout" className="navbar-item">
              <span class="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faMixcloud} size="2x" />
              </span>
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              <span class="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </span>
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              <span class="icon is-medium has-text-light">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </span>
            </a>
            <p class="navbar-item">Ears to the concrete.</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
