import React from "react";
import { Link } from "gatsby";

function SingleResident(props) {
  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen resident-box">
      <Link to="/bio">
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              <img src={props.img} alt="mix-img" />
            </figure>
          </div>
          <div className="card-content">
            <p className="title has-text-centered is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
              {props.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SingleResident;
