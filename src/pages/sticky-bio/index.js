import React from "react";
import { HMBKDivider, SingleMixCard } from "../../components/";

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
  const playBtnInfo = [{ btnSize: "7x" }];
  const stickyBioLayout = "column is-12-mobile is-6-tablet is-4-desktop";

  return (
    <div className="container is-fluid resident-bio">
      <div className="columns is-multiline">
        <div className="column is-3-desktop is-4-tablet is-12-mobile">
          <div className="columns is-multiline sticky-bio">
            <div className="column is-12">
              <figure className="image is-1by1">
                <img src={`../img/cyberpunk-robo.jpg`} alt="Rowdy Robo" />
              </figure>
            </div>
            <div className="column is-12">
              <p className="title is-size-3-desktop is-size-4-touch ">
                RowdyRobo
              </p>
              <p className="subtitle is-size-5-desktop is-size-6-touch">
                Homebuilt MixMaster Droid rev.9001
              </p>
              <p className="is-size-6-desktop is-size-7-touch">
                The only home we’ve ever known preserve and cherish that pale
                blue dot. Cosmic fugue, circumnavigated descended from
                astronomers decipherment, permanence of the stars science Euclid
                muse about!
              </p>
              <div className="sticky-social-links">
                <a href="https://twitter.com">
                  <span className="icon is-large">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      size="2x"
                      className="is-hidden-touch"
                    />
                    <FontAwesomeIcon
                      icon={faTwitter}
                      size="lg"
                      className="is-hidden-desktop"
                    />
                  </span>
                </a>
                <a href="https://instagram.com">
                  <span className="icon is-large">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      size="2x"
                      className="is-hidden-touch"
                    />
                    <FontAwesomeIcon
                      icon={faInstagram}
                      size="lg"
                      className="is-hidden-desktop"
                    />
                  </span>
                </a>
                <a href="https://soundcloud.com">
                  <span className="icon is-large">
                    <FontAwesomeIcon
                      icon={faSoundcloud}
                      size="2x"
                      className="is-hidden-touch"
                    />
                    <FontAwesomeIcon
                      icon={faSoundcloud}
                      size="lg"
                      className="is-hidden-desktop"
                    />
                  </span>
                </a>
                <a href="https://bandcamp.com">
                  <span className="icon is-large">
                    <FontAwesomeIcon
                      icon={faBandcamp}
                      size="2x"
                      className="is-hidden-touch"
                    />
                    <FontAwesomeIcon
                      icon={faBandcamp}
                      size="lg"
                      className="is-hidden-desktop"
                    />
                  </span>
                </a>
                <a href="https://mixcloud.com">
                  <span className="icon is-large">
                    <FontAwesomeIcon
                      icon={faMixcloud}
                      size="2x"
                      className="is-hidden-touch"
                    />
                    <FontAwesomeIcon
                      icon={faMixcloud}
                      size="lg"
                      className="is-hidden-desktop"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr className="is-hidden-tablet" />

        <div className="column is-9-desktop">
          <div className="columns is-multiline">
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
