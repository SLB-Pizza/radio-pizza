import React from "react";
import { Link } from "gatsby";

import { SingleMixCard } from "./index";
import sampleMixes from "../../__tests__/sampleMixes.json";

function HomeMixes() {
  const twelveMixes = sampleMixes.slice(0, 12);

  // See SingleMixCard - playAudioButton() for details about playBtnInfo usage
  const homeMixesLayout =
    "column is-9-mobile is-two-fifths-tablet is-4-desktop";

  return (
    <div className="container is-fluid" id="home-mixes">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb">
            <p className="display-text is-size-3">Recent Mixes</p>
            <p className="subtitle is-size-6">
              These dummy mixes are the same as the ones on the sample bio page.
              You can hover/touch and play them the same way. Try it!
            </p>
            <Link to="/mixes">
              <button className="button is-small is-outlined is-rounded display-text">
                All Mixes
              </button>
            </Link>
          </div>
        </div>
        <div className="column is-9">
          <div className="columns is-multiline">
            {twelveMixes.map((mix) => (
              <SingleMixCard
                key={mix.mixTitle}
                date={mix.mixDate}
                url={mix.mixUrl}
                testSrc={mix.mixTestSrc}
                title={mix.mixTitle}
                resident={mix.mixResident}
                img={mix.mixImg}
                tags={mix.mixTags}
                columnLayout={homeMixesLayout}
              />
            ))}
          </div>
        </div>
      </div>
      {/* TOUCH */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop mobile-home-content">
        <div className="column">
          <p className="display-text is-size-4">Daily Mixes</p>
        </div>
        <div className="column is-narrow">
          <Link to="/mixes">
            <button className="button is-small is-outlined is-rounded">
              All Mixes
            </button>
          </Link>
        </div>
        <div className="column is-12 mobile-home-description">
          <p className="subtitle is-size-6">
            These dummy mixes are the same as the ones on the sample bio page.
            You can hover/touch and play them the same way. Try it!
          </p>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {twelveMixes.map((mix) => (
          <SingleMixCard
            key={mix.mixTitle}
            date={mix.mixDate}
            url={mix.mixUrl}
            testSrc={mix.mixTestSrc}
            title={mix.mixTitle}
            resident={mix.mixResident}
            img={mix.mixImg}
            tags={mix.mixTags}
            columnLayout={homeMixesLayout}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeMixes;
