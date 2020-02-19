import React from "react";

function BottomNav() {
  return (
    <nav className="navbar is-black is-fixed-bottom">
      <div className="container">
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-type-white.png"
              alt="Logo"
            />
          </a>
          <span className="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div id="navbarMenuHeroC" className="navbar-menu">
          <div className="navbar-end">
            <a href="/" className="navbar-item is-active">
              Home
            </a>
            <a href="/" className="navbar-item">
              Examples
            </a>
            <a href="/" className="navbar-item">
              Documentation
            </a>
            <span className="navbar-item">
              <a href="/" className="button is-success is-inverted">
                <span className="icon">
                  <i className="fab fa-github"></i>
                </span>
                <span>Download</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
