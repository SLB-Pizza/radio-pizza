import React from "react";
import { Link, graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import { SingleEventCard } from "../../components";
import dummyEvents from "../../../__test__/dummyEvents.json";

import { linkResolver } from "../../utils";
/**
 * @category Pages
 * @subcategory Indexes
 * @function EventsIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function EventsIndex({ data }) {
  const prismicContent = data.prismic.allEvents.edges;
  if (!prismicContent) return null;

  const allEventsData = prismicContent;

  const eventPageLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

  return (
    <div className="container is-fluid black-bg-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="display-text is-size-3-desktop is-size-4-touch">
            Halfmoon Events
          </p>
        </div>
        {/* {allEventsData.map(({ node }, index) => (
          <SingleEventCard
            key={`halfmoon-event-${index}`}
            eventData={node}
            eventColumnLayout={eventPageLayout}
          />
        ))} */}
        {allEventsData.map(({ node }, index) => (
          <Link to={linkResolver(node._meta)}>
            {RichText.asText(node.event_name)}
          </Link>
        ))}
      </div>
    </div>
  );
}

// <pre key={index}>node {JSON.stringify(node, null, 2)}</pre>
// <SingleEventCard
//   key={`halfmoon-event-${index}`}
//   eventData={event}
//   eventColumnLayout={eventPageLayout}
// />
export default EventsIndex;

export const query = graphql`
  query EventsIndexQuery {
    prismic {
      allEvents(sortBy: meta_firstPublicationDate_DESC) {
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
