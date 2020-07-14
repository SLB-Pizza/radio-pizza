import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { SingleMixCard } from "../../components";

// Dummy data in __tests__ folder
import sampleMixes from "../../../__tests__/sampleMixes.json";

const dummyOptions = [
  "Argentina",
  "Bolivia",
  "Brazil",
  "Chile",
  "Colombia",
  "Ecuador",
  "Guyana",
  "Paraguay",
  "Peru",
  "Suriname",
  "Uruguay",
  "Venezuela",
];

function MixesIndexPage() {
  const [searchInput, setSearchInput] = useState("");

  const btnSize = "5x";
  const mixListLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Recent Mixes
          </p>
          <p className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            These dummy mixes are the same as the ones on the home page. You can
            hover/touch and play them the same way. Try it!
          </p>
        </div>
        <div className="column is-9-widescreen is-8-tablet is-12-mobile">
          <div className="field">
            <div className="control is-expanded has-icons-left has-icons-right">
              {/* <div className="control is-expanded has-icons-left has-icons-right is-loading is-medium"> */}
              <input
                className="input is-medium is-rounded"
                type="text"
                placeholder="Search all mixes..."
              />
              <span className="icon is-left is-medium">
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
          </div>
        </div>
        <div className="column is-3-widescreen is-4-tablet is-12-mobile">
          <div className="field is-hidden-mobile">
            <div className="control is-expanded has-icons-left">
              <div className="select is-medium is-fullwidth is-rounded">
                <select name="country">
                  <option value="">--Country--</option>
                  {dummyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <span className="icon is-left is-medium">
                <FontAwesomeIcon icon={faTag} />
              </span>
            </div>
          </div>
          <div className="field is-hidden-tablet">
            <div className="control is-expanded has-icons-left">
              <div className="select is-fullwidth">
                <select name="country">
                  <option value="">--Country--</option>
                  {dummyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <span className="icon is-left">
                <FontAwesomeIcon icon={faTag} />
              </span>
            </div>
          </div>
        </div>
        {sampleMixes.map((mix) => (
          <SingleMixCard
            key={mix.title}
            date={mix.date}
            url={mix.url}
            testSrc={mix.testSrc}
            title={mix.title}
            artist={mix.artist}
            img={mix.img}
            tags={mix.tags}
            btnSize={btnSize}
            columnLayout={mixListLayout}
          />
        ))}
      </div>
    </div>
  );
}

export default MixesIndexPage;
