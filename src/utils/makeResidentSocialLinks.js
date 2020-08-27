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
function residentSocialIcons(url, platform) {
  return (
    <a key={platform} href={url} rel="noopener" target="_blank">
      <span className="icon">
        <FontAwesomeIcon icon={platform} size="lg" className="icon-color" />
      </span>
    </a>
  );
}

export default residentSocialIcons;
