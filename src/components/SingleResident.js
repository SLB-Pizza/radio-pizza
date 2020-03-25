import React from "react";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SingleResident() {
  return (
    <div className="column is-one-third single-resident">
      <div className="columns is-vcentered is-mobile">
        <div className="column is-narrow">
          <div className="resident-image">
            <figure className="image is-96x96">
              <img
                className="is-rounded"
                src="https://robohash.org/4H1.png?set=set1"
                alt="Rowdy Robo"
              />
            </figure>
          </div>
        </div>
        <div className="column">
          <div className="resident-info">
            <p className="resident-name title is-size-3-desktop is-size-5-touch">
              RowdyRobo
              <span className="icon is-large">
                <FontAwesomeIcon icon={faTwitter} size="sm" />
              </span>
              <span className="icon is-large">
                <FontAwesomeIcon icon={faInstagram} size="sm" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SingleResident;
