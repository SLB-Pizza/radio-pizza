import React from "react";
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
          <p class="navbar-item">HalfmoonBK</p>
          <span className="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">Link 1</a>

            <a class="navbar-item">Link 2</a>

            <div class="navbar-item has-dropdown has-dropdown-up is-hoverable">
              <a class="navbar-link">Link Dropdown</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">Category 1</a>
                <a class="navbar-item">Category 2</a>
                <a class="navbar-item">Category 3</a>
              </div>
            </div>
          </div>
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
