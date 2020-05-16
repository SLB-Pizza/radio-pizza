import React from "react";
import { SingleMixCard, SingleResident } from "./index";

// Dummy data in __tests__ folder
import sampleMixes from "../../__tests__/sampleMixes.json";
import dummyArtists from "../../__tests__/dummyArtists.json";

const playBtnInfo = [{ btnSize: "7x" }];
const mixListLayout =
  "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";
function SearchResults(props) {
  return (
    <div className="columns is-mobile is-multiline">
      {props.isSelected === "mixes"
        ? sampleMixes.map((mix) => (
            <SingleMixCard
              key={mix.name}
              date={mix.date}
              url={mix.url}
              testSrc={mix.testSrc}
              name={mix.name}
              artist={mix.artist}
              img={mix.img}
              tags={mix.tags}
              playBtnInfo={playBtnInfo}
              columnLayout={mixListLayout}
            />
          ))
        : null}
      {props.isSelected === "residents"
        ? dummyArtists.map((resident) => (
            <SingleResident key={resident.name} name={resident.name} />
          ))
        : null}
      {props.isSelected === "events" ? (
        <div className="column is-full">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
            Dummy Events results here
          </p>
        </div>
      ) : null}
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
