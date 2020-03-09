import React, { useState } from "react";
import { MobileNewsItem, DesktopNewsItem } from "./index";

function NewsPage() {
  const [isOpen, setIsOpen] = useState("");

  function toggleDrawer(e) {
    if (isOpen === e.currentTarget.id) {
      setIsOpen("");
    } else {
      setIsOpen(e.currentTarget.id);
    }
  }
  return (
    <div>
      <div className="news-hero is-hidden-desktop">
        <div id="div-1" onClick={toggleDrawer}>
          <p className="title is-1">div-1</p>
        </div>
        {isOpen === "div-1" ? (
          <div className="white-content container is-fluid">
            <div className="columns" id="columns-mobile">
              {/* <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem /> */}
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
            </div>
          </div>
        ) : (
          <div className="white-content is-hidden">you can't see me</div>
        )}
        <div id="div-2" onClick={toggleDrawer}>
          <p className="title is-1">div-2</p>
        </div>
        {isOpen === "div-2" ? (
          <div className="white-content container is-fluid">
            <div className="columns" id="columns-mobile">
              <div className="column is-12 img-food">Stuff</div>
              <div className="column is-12 img-food">Stuff</div>
              <div className="column is-12 img-food">Stuff</div>
              <div className="column is-12 img-food">Stuff</div>
              <div className="column is-12 img-food">Stuff</div>
              <div className="column is-12 img-food">Stuff</div>
            </div>
          </div>
        ) : (
          <div className="white-content is-hidden">you can't see me</div>
        )}
        <div id="div-3" onClick={toggleDrawer}>
          <p className="title is-1">div-3</p>
        </div>
        {isOpen === "div-3" ? (
          <div className="white-content container is-fluid">
            <div className="columns" id="columns-mobile">
              <div className="column is-12 img-cars">Stuff</div>
              <div className="column is-12 img-cars">Stuff</div>
              <div className="column is-12 img-cars">Stuff</div>
              <div className="column is-12 img-cars">Stuff</div>
              <div className="column is-12 img-cars">Stuff</div>
              <div className="column is-12 img-cars">Stuff</div>
            </div>
          </div>
        ) : (
          <div className="white-content is-hidden">you can't see me</div>
        )}
        <div id="div-4" onClick={toggleDrawer}>
          <p className="title is-1">div-4</p>
        </div>
        {isOpen === "div-4" ? (
          <div className="white-content container is-fluid">
            <div className="columns" id="columns-mobile">
              {/* <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem />
              <MobileNewsItem /> */}
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
              <div className="column is-12 img-nature">Stuff</div>
            </div>
          </div>
        ) : (
          <div className="white-content is-hidden">you can't see me</div>
        )}
      </div>
      <div className="news-hero is-hidden-touch">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column is-3">column</div>
            <div className="column is-3">column</div>
            <div className="column is-3">column</div>
            <div className="column is-3">column</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
