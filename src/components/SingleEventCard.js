import React from "react";
import { Link } from "gatsby";
import NanoClamp from "nanoclamp";
import { RichText } from "prismic-reactjs";
import { formatDateTime, linkResolver } from "../utils";
import { faOm } from "@fortawesome/free-solid-svg-icons";

function SingleEventCard({ eventColumnLayout, eventData }) {
  // const { img, alt, date, location, eventName, blurb } = eventData;
  const {
    _meta,
    main_event_image,
    event_name,
    event_location,
    event_blurb,
    end_date,
    start_date,
  } = eventData;

  const start = formatDateTime(start_date, "year-month-day");
  const end = formatDateTime(end_date, "year-month-day");

  return (
    <div className={eventColumnLayout}>
      <Link to={linkResolver(_meta)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              <img src={main_event_image.url} alt={main_event_image.alt} />
            </figure>
          </div>
          <div className="card-content">
            <div className="event-card-sizing">
              <div className="details">
                <NanoClamp
                  className="subtitle is-size-7 has-text-light-grey"
                  is="p"
                  lines={2}
                  text={
                    end_date === null
                      ? `${start} | ${event_location}`
                      : `${start} – ${end} | ${event_location}`
                  }
                />
                <NanoClamp
                  className="title is-size-6-touch is-size-6-desktop is-size-5-widescreen"
                  is="p"
                  lines={2}
                  text={event_name}
                />
              </div>
              <NanoClamp
                className="blurb is-size-7 has-text-white"
                is="p"
                lines={3}
                ellipsis={"..."}
                text={event_blurb}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SingleEventCard;
