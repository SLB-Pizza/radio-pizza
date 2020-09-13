import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import {
  faMixcloud,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  GlobalDispatchContext,
  GlobalStateContext,
} from "../context/GlobalContextProvider";
import { OutsideClick } from "./index";

/**
 * @function BottomNav
 */
function BottomNav() {
  // const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useContext(GlobalDispatchContext);
  const globalState = useContext(GlobalStateContext);

  const closeNavMenu = async () => {
    await dispatch({ type: "CLOSE_NAVMENU" });
  };

  const toggleNavMenu = async () => {
    await dispatch({ type: "TOGGLE_NAVMENU" });
  };

  /**
   * This globalState null return prevents ERROR #95313.
   * @see {@link TopNav|Related globalState situation in TopNav}
   * @see {@link https://github.com/gatsbyjs/gatsby/issues/24264#issuecomment-631995753|Re: ERROR #95313 - To stop the error immediately, add a null check for the object}
   */
  if (!globalState) return null;
  return (
    <nav
      className="navbar is-fixed-bottom"
      role="navigation"
      aria-label="navigation bar"
      id="navigation"
    >
      <OutsideClick id={"navigation"} onClick={() => closeNavMenu()}>
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item display-text"
            onClick={() => toggleNavMenu()}
          >
            Ears to the concrete.
          </Link>

          <span
            className={
              globalState.navMenuOpen
                ? "navbar-burger is-active"
                : "navbar-burger"
            }
            role="button"
            aria-label="navigation menu"
            aria-expanded={globalState.navMenuOpen ? "true" : "false"}
            data-target="nav-menu"
            onClick={() => toggleNavMenu()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div
          className={
            globalState.navMenuOpen ? "navbar-menu is-active" : "navbar-menu"
          }
          id="nav-menu"
        >
          <div className="navbar-start">
            <Link
              to="/residents"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              Residents
            </Link>

            <Link
              to="/mixes"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              Mixes
            </Link>
            <Link
              to="/events"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              Events
            </Link>
            <Link
              to="/features"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              Features
            </Link>
            <Link
              to="/about"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
            >
              About
            </Link>

            {/*
          <div className="navbar-item has-dropdown has-dropdown-up is-hoverable">
            <a className="navbar-link">Content</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" onClick={() => toggleNavMenu()}>
                Recent Mixes
              </a>
              <a
                href="#"
                className="navbar-item"
                onClick={() => toggleNavMenu()}
              >
                Live Events
              </a>
              <a
                href="#"
                className="navbar-item"
                onClick={() => toggleNavMenu()}
              >
                Features
              </a>
            </div>
          </div>
          */}
          </div>
          <div className="navbar-end is-hidden-touch">
            <a
              href="https://www.mixcloud.com/HalfMoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Mixcloud"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faMixcloud} size="lg" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Instagram"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </span>
            </a>
            <a
              href="https://twitter.com/halfmoonbk"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Twitter"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </span>
            </a>
          </div>
          <hr className="navbar-divider"></hr>
          <div className="navbar-end is-hidden-desktop">
            <a
              href="https://www.mixcloud.com/HalfMoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Mixcloud"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faMixcloud} size="lg" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/halfmoonbk/"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Instagram"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </span>
            </a>
            <a
              href="https://twitter.com/halfmoonbk"
              className="navbar-item"
              onClick={() => toggleNavMenu()}
              aria-label="Halfmoon on Twitter"
              target="_blank"
              rel="noopener"
            >
              <span className="icon is-medium" aria-hidden="true">
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </span>
            </a>
          </div>
        </div>
      </OutsideClick>
    </nav>
  );
}

export default BottomNav;
