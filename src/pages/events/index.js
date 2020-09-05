import React from "react";

import { SingleEventCard } from "../../components";

import dummyEvents from "../../../__test__/dummyEvents.json";
function EventsIndexPage() {
  const eventPageLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="display-text is-size-3-desktop is-size-4-touch">
            Events
          </p>
        </div>
        {dummyEvents.map((event) => (
          <SingleEventCard
            key={event.eventName}
            eventColumnLayout={eventPageLayout}
            eventName={event.eventName}
            date={event.date}
            location={event.location}
            img={event.img}
            blurb={event.blurb}
          />
        ))}
      </div>
    </div>
  );
}

export default EventsIndexPage;
