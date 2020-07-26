import React from "react";
import { SingleMixCard, SingleResident, SingleEventCard } from "./index";

// Dummy data in __tests__ folder
import sampleMixes from "../../__tests__/sampleMixes.json";
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
        ? sampleMixes.map((mix) => (
            <SingleMixCard
              key={mix.mixTitle}
              date={mix.mixDate}
              url={mix.mixUrl}
              testSrc={mix.mixTestSrc}
              title={mix.mixTitle}
              resident={mix.mixResident}
              img={mix.mixImg}
              tags={mix.mixTags}
              columnLayout={mixListLayout}
            />
          ))
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
