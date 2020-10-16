import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import { EventCountdown } from "../components";
import { htmlSerializer, linkResolver } from "../utils";

/**
 * @category Templates
 * @subcategory Event
 * @function EventsTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data }) {
  const [eventDateTime, setDateTime] = useState("");

  const prismicContent = data.prismic.allEvents.edges[0];
  if (!prismicContent) return null;
  const eventData = prismicContent.node;

  const {
    _meta,
    start_date,
    end_date,
    event_blurb,
    main_event_image,
    event_name,
    event_location,
  } = eventData;

  // const

  return (
    <main className="full-height-page">
      <article>
        <header className="hero event-header">
          <div
            className="hero-body"
            style={{
              backgroundImage: `url(${main_event_image.url})`,
            }}
          />
        </header>
        <EventCountdown />
        <section className="section container">
          <div className="columns is-mobile">
            <div className="column is-12">
              <div className="content">
                <RichText
                  render={event_name}
                  linkResolver={linkResolver}
                  htmlSerializer={htmlSerializer}
                />
                <RichText
                  render={event_blurb}
                  linkResolver={linkResolver}
                  htmlSerializer={htmlSerializer}
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className="container"
          style={{ backgroundColor: "darkgreen", height: "15rem" }}
        ></section>
        <section
          className="container"
          style={{ backgroundColor: "darkorange" }}
        >
          <pre>{JSON.stringify(eventData, null, 2)}</pre>
        </section>
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

export const query = graphql`
  query EventTemplateQuery($uid: String) {
    prismic {
      allEvents(uid: $uid) {
        edges {
          node {
            _meta {
              uid
              type
            }
            event_blurb
            main_event_image
            event_name
            event_location
            event_end
            event_start
          }
        }
      }
    }
  }
`;
