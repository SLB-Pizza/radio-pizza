import React from "react";

/**
 * Function that takes in props from BioMixList and creates active YT audio sources
 * @category Site Elements
 * @subcategory Layout Helper
 * @component
 * @function residentSocialIcons
 * @param {string} url - link to the resident's page on a platform e.g.bandcamp, soundcloud, mixcloud, etc.
 * @param {icon} title - name of the corresponding FontAwesomeIcon
 * @returns {link} An `<a>` tag with an icon that redirects out to the appropriate platform
 */
const residentSocialIcons = (url, icon) => {
  return (
    <a key={icon} href={url} rel="noopener">
      <span className="icon">
        <FontAwesomeIcon icon={icon} size="3x" />
      </span>
    </a>
  );
};
