import React from "react";
import { Link } from "gatsby";

function SingleResident(props) {
  return (
    <div className="column is-4-widescreen is-6-tablet is-12-mobile resident-box">
      <Link to="/bio">
        <div className="columns is-vcentered is-mobile is-multiline single-resident">
          <div className="column is-12 resident-image">
            <figure className="image is-2by1">
              <img
                src="https://source.unsplash.com/1280x640/weekly?cyberpunk"
                alt="Rowdy Robo"
              />
            </figure>
          </div>
          <div className="column is-12">
            <p className="title is-size-5-desktop is-size-7-touch">
              {props.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SingleResident;
