import React from "react";
import { SingleEventCard } from "../../components";

import dummyEvents from "../../../__tests__/dummyEvents.json";
function EventsIndexPage() {
  return (
    <div className="container is-fluid site-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="display-text is-size-2-desktop is-size-3-touch">
            Events
          </p>
        </div>
        {dummyEvents.map((event) => (
          <div
            key={event.eventName}
            className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen"
          >
            <SingleEventCard
              eventName={event.eventName}
              date={event.date}
              location={event.location}
              img={event.img}
              blurb={event.blurb}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsIndexPage;
