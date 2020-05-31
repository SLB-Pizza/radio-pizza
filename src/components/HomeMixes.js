import React from "react";
import { Link } from "gatsby";

import { SingleMixCard } from "./index";
import sampleMixes from "../../__tests__/sampleMixes.json";

function HomeMixes() {
  const twelveMixes = sampleMixes.slice(0, 12);

  // See SingleMixCard - playAudioButton() for details about playBtnInfo usage
  const playBtnInfo = [{ btnSize: "7x" }];
  const homeMixesLayout =
    "column is-9-mobile is-two-fifths-tablet is-4-desktop";

  return (
    <div className="container is-fluid" id="home-mixes">
      {/* Desktop */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="title is-size-3">Recent Mixes</p>
            <p className="subtitle is-size-6">
              These dummy mixes are the same as the ones on the sample bio page.
              You can hover/touch and play them the same way. Try it!
            </p>
            <Link to="/mixes">
              <button className="button is-outlined is-rounded">
                All Mixes
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {twelveMixes.map((mix) => (
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
                columnLayout={homeMixesLayout}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Touch */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="title is-size-3 mobile-headers">Daily Mixes</p>
        </div>
        <div className="column is-narrow more-link">
          <Link to="/mixes">
            <button className="button is-outlined is-rounded">All Mixes</button>
          </Link>
        </div>
        <div className="column is-12">
          <p className="subtitle is-size-6 mobile-headers">
            These dummy mixes are the same as the ones on the sample bio page.
            You can hover/touch and play them the same way. Try it!
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {twelveMixes.map((mix) => (
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
            columnLayout={homeMixesLayout}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeMixes;
