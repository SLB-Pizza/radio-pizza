import React from "react";
import { EventCountdown } from "../../components";

/**
 * @category Templates
 * @subcategory Event
 * @function EventsTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data }) {
  return (
    <main className="full-height-page">
      <article>
        <header className="hero event-header">
          <div
            className="hero-body"
            style={{
              backgroundImage: `url(https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg)`,
            }}
          />
        </header>
        <EventCountdown />
        <section
          className="container"
          style={{ backgroundColor: "yellow", height: "15rem" }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: "darkgreen", height: "15rem" }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: "darkorange", height: "15rem" }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: "darkred", height: "15rem" }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: "darkgrey", height: "15rem" }}
        ></section>
      </article>
    </main>
  );
}

export default EventTemplate;
