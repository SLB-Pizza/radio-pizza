import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { ResidentSocialLinks, mappableDataCheck } from "../utils";
import NanoClamp from "nanoclamp";
import { use } from "chai";
import { stringify } from "uuid";

/**
 * @category Layout Helper
 * @function ResidentBio
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentBio({ residentBioData }) {
  const [hasBlurb, setBlurbData] = useState(false);
  const [hasSocialMedia, setMediaData] = useState(false);

  const {
    resident_image,
    resident_name,
    resident_status,
    resident_blurb,
    social_media,
  } = residentBioData;

  useEffect(() => {
    const bioDataCheck = () => {
      if (residentBioData) {
        if (mappableDataCheck(resident_blurb)) {
          setBlurbData(true);
        }
        if (mappableDataCheck(social_media)) {
          setMediaData(true);
        }
      }
    };
  });

  return (
    <div className="column is-3-desktop is-4-tablet is-12-mobile sticky-bio">
      <div className="columns is-multiline">
        <div className="column is-12">
          <figure className="image is-1by1">
            <img src={resident_image.url} alt={resident_image.alt} />
          </figure>
        </div>
        <div className="column is-12 content">
          <NanoClamp
            className="title is-size-4-desktop is-size-5-touch"
            is="p"
            lines={2}
            text={resident_name}
          />
          <p className="subtitle is-size-6-desktop is-size-7-touch">
            {resident_status}
          </p>
          {/* <pre>{JSON.stringify(resident_blurb, null, 2)}</pre> */}
          {RichText.render(resident_blurb)}
        </div>
      </div>
      <div className="columns is-mobile is-multiline is-vcentered">
        <pre>
          {JSON.stringify(
            social_media.filter((social_page) =>
              Object.values(social_page).some((entry) => entry === null)
            ),
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
// .map(({ resident_social_page, resident_social_link }, index) => (
//   <ResidentSocialLinks
//     key={`social-link-${index}-${resident_social_page}`}
//     url={resident_social_link.url}
//     platform={resident_social_page}
//   />
// ))

export default ResidentBio;

ResidentBio.propTypes = {
  residentData: PropTypes.shape({
    resident_image: PropTypes.shape({
      dimensions: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string,
      }),
    }).isRequired,
    resident_name: PropTypes.string,
    resident_status: PropTypes.string,
    resident_blurb: PropTypes.arrayOf(PropTypes.object),
    social_media: PropTypes.arrayOf(PropTypes.object),
  }),
};
