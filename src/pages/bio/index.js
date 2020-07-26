import React from "react";
import { HMBKDivider, SingleMixCard } from "../../components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faSoundcloud,
  faMixcloud,
  faBandcamp,
} from "@fortawesome/free-brands-svg-icons";

// Dummy data in __tests__ folder
import sampleMixes from "../../../__tests__/sampleMixes.json";

function StickyBioIndexPage() {
  /**
   * @param {string} stickyBioLayout - The string that will be used as the className to style this component's SingleMixCard data mapping. This string follows the site's bulma.io column styling conventions.
   */
  const stickyBioLayout =
    "column is-12-mobile is-12-tablet is-6-desktop is-4-widescreen";

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-multiline">
        <div className="column is-4-desktop is-4-tablet is-12-mobile sticky-bio">
          <div className="columns is-multiline">
            <div className="column is-12">
              <figure className="image is-1by1">
                <img src={`../img/test/cyberpunk-robo.jpg`} alt="Rowdy Robo" />
              </figure>
            </div>
            <div className="column is-12">
              <p className="title is-size-4-desktop is-size-5-touch ">
                RowdyRobo
              </p>
              <p className="subtitle is-size-6-desktop is-size-7-touch">
                From the year 7020, comes the musical megamind that's traveled
                across space and time. They're here to rock our planet.
              </p>
              <div className="sticky-social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener">
                  <span className="icon">
                    <FontAwesomeIcon
                      className="icon-color"
                      icon={faTwitter}
                      size="lg"
                    />
                  </span>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener">
                  <span className="icon">
                    <FontAwesomeIcon
                      className="icon-color"
                      icon={faInstagram}
                      size="lg"
                    />
                  </span>
                </a>
                <a href="https://soundcloud.com" target="_blank" rel="noopener">
                  <span className="icon">
                    <FontAwesomeIcon
                      className="icon-color"
                      icon={faSoundcloud}
                      size="lg"
                    />
                  </span>
                </a>
                <a href="https://bandcamp.com" target="_blank" rel="noopener">
                  <span className="icon">
                    <FontAwesomeIcon
                      className="icon-color"
                      icon={faBandcamp}
                      size="lg"
                    />
                  </span>
                </a>
                <a href="https://mixcloud.com" target="_blank" rel="noopener">
                  <span className="icon">
                    <FontAwesomeIcon
                      className="icon-color"
                      icon={faMixcloud}
                      size="lg"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="is-hidden-desktop" />

        <div className="column is-8">
          <div className="columns is-multiline">
            {sampleMixes.map((mix) => (
              <SingleMixCard
                key={mix.mixTitle}
                date={mix.mixDate}
                url={mix.mixUrl}
                testSrc={mix.mixTestSrc}
                title={mix.mixTitle}
                resident={mix.mixResident}
                img={mix.mixImg}
                tags={mix.mixTags}
                columnLayout={stickyBioLayout}
              />
            ))}
          </div>
          <HMBKDivider />
        </div>
      </div>
    </div>
  );
}

export default StickyBioIndexPage;
