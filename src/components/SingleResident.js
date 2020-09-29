import React from "react";
import { Link } from "gatsby";
import Nanoclamp from "nanoclamp";
import { linkResolver, ResponsiveImage } from "../utils";

/**
 * @category Layout Helper
 * @subcategory Resident
 * @function SingleResident
 * @param {Object} resident - Prismic CMS data object containing all data needed to build resident cards that link out to a `/residents/:uid`
 * @property {Object} _meta - contains the uid and type for use with {@link linkResolver}
 * @property {String} resident_name - the resident's name
 * @property {Object} resident_image - contains the resident image's dimensions object, alt text string, copyright string, and url string
 * @property {String} resident_status - details the resident's status as being of the three: ["Resident", "Guest", "Alumnus"]
 * @returns {jsx}
 */
function SingleResident({ resident }) {
  const { _meta, resident_name, resident_image } = resident;

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
            <Nanoclamp
              is="p"
              className="title has-text-centered is-size-6-mobile is-size-5-tablet"
              lines={2}
              text={resident_name}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
export default SingleResident;
