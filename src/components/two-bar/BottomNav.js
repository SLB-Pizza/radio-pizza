import React from "react";

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
              Home
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              Examples
            </a>
            <a href="/two-bar-layout" className="navbar-item">
              Documentation
            </a>
            <p class="navbar-item">Ears to the concrete.</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
