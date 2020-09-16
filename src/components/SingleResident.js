import React from "react";
import { Link } from "gatsby";
import { linkResolver, ResponsiveImage } from "../utils";

function SingleResident({ resident }) {
  const { _meta, resident_name, resident_image, resident_status } = resident;

  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen resident-box">
      <Link to={linkResolver(_meta)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              <img src={resident_image.url} alt={resident_image.alt} />
            </figure>
          </div>
          <div className="card-content">
            <p className="title has-text-centered is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
              {resident_name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SingleResident;
