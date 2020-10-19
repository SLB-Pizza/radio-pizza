import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import { EventHeader } from "../components";
import { htmlSerializer, linkResolver } from "../utils";

/**
 * @category Templates
 * @subcategory Event
 * @function EventsTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventTemplate({ data }) {
  const prismicContent = data.prismic.allEvents.edges[0];
  if (!prismicContent) return null;
  const eventData = prismicContent.node;

  const {
    _meta,
    event_start,
    event_end,
    event_blurb,
    main_event_image,
    event_name,
    event_location,
    event_location_link,
  } = eventData;

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

        <EventHeader
          startDate={event_start}
          endDate={event_end}
          location={event_location}
          eventName={event_name}
        />
        <section className="section container">
          <div className="columns is-mobile">
            <div className="column is-12">
              <div className="content">
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
          style={{ backgroundColor: "darkorange" }}
        >
          <div className="columns is-mobile"></div>
          {event_location_link && (
            <a href={event_location_link.url} target="_blank">
              {event_location}
            </a>
          )}
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
            event_end
            event_start
            event_location
            event_location_link {
              ... on PRISMIC__ExternalLink {
                target
                url
              }
            }
            event_button_text
            event_button_link {
              ... on PRISMIC__ExternalLink {
                target
                url
              }
            }
          }
        }
      }
    }
  }
`;
