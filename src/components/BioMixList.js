import React from "react";
import { BioHorizItem, SingleMixCard } from "./index";

// Dummy data in __tests__ folder
import sampleMixes from "../../__tests__/sampleMixes.json";

function BioMixList(props) {
  // See SingleMixCard - playAudioButton() for details about playBtnInfo usage
  const playBtnInfo = [{ btnSize: "7x" }];
  const mixListLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

  return (
    <div className="columns is-mobile is-multiline bio-mixes">
      <div className="column is-12">
        <p className="title is-size-2-desktop is-size-4-touch has-text-centered">
          Mixes by RowdyRobo
        </p>
        <p className="subtitle is-size-4-desktop is-size-6-touch has-text-centered">
          These dummy mixes are the same as the ones on the home page. You can
          hover/touch and play them the same way. Try it!
        </p>
      </div>
      {sampleMixes.map((mix) => (
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
      ))}
    </div>
  );
}

export default BioMixList;

// { btnSize: "3x", viewportClass: "is-hidden-desktop" },

// {
//   sampleMixes.map((mix) => (
//     <BioHorizItem
//       key={mix.name}
//       date={mix.date}
//       url={mix.url}
//       testSrc={mix.testSrc}
//       name={mix.name}
//       artist={mix.artist}
//       img={mix.img}
//       tags={mix.tags}
//     />
//   ));
// }
