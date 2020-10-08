import PropTypes from "prop-types";
import React from "react";
import { RichText } from "prismic-reactjs";
import { ResidentSocialLinks } from "../utils";
import NanoClamp from "nanoclamp";

/**
 * @category Layout Helper
 * @function ResidentBio
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentBio({ residentData }) {
  const {
    resident_image,
    resident_name,
    resident_status,
    resident_blurb,
    social_media,
  } = residentData;

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
          {RichText.render(resident_blurb)}
        </div>
      </div>
      <div className="columns is-mobile is-multiline is-vcentered">
        {/* <pre>{JSON.stringify(social_media, null, 2)}</pre> */}
        {/* {social_media.map(
          ({ resident_social_page, resident_social_link }, index) => (
            <ResidentSocialLinks
              key={`social-link-${index}-${resident_social_page}`}
              url={resident_social_link.url}
              platform={resident_social_page}
            />
          )
        )} */}
      </div>
    </div>
  );
}

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
