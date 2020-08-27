import React from "react";
import { SingleMixCard, SingleResident, SingleEventCard } from "./index";

// Dummy data in __tests__ folder
import hmbkMixesResidents from "../../__tests__/HMBK-mixes-with-residents.json";
import dummyArtists from "../../__tests__/dummyArtists.json";
import dummyEvents from "../../__tests__/dummyEvents.json";

const mixListLayout =
  "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";
const eventsResultLayout =
  "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

function SearchResults(props) {
  return (
    <div className="columns is-mobile is-multiline">
      {props.isSelected === "mixes"
        ? hmbkMixesResidents.map((singleMix, index) => {
            const {
              _meta,
              mix_date,
              mix_image,
              mix_link,
              mix_title,
              featured_residents,
            } = singleMix.node;

            return (
              <SingleMixCard
                key={`mix-#${index}-${mix_title}`}
                date={mix_date}
                url={mix_link}
                title={mix_title}
                residents={featured_residents}
                img={mix_image}
                tags={_meta.tags}
                columnLayout={mixListLayout}
              />
            );
          })
        : null}
      {props.isSelected === "residents"
        ? dummyArtists.map((resident) => (
            <SingleResident
              key={resident.name}
              name={resident.name}
              img={"https://source.unsplash.com/1280x1280/daily?robot"}
            />
          ))
        : null}
      {props.isSelected === "events"
        ? dummyEvents.map((event) => (
            <SingleEventCard
              eventColumnLayout={eventsResultLayout}
              eventName={event.eventName}
              date={event.date}
              location={event.location}
              img={event.img}
              blurb={event.blurb}
            />
          ))
        : null}
      {props.isSelected === "news" ? (
        <div className="column is-full">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
            Dummy News results here
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default SearchResults;
