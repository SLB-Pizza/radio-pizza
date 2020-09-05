import React from "react";
import { Link, path } from "gatsby";
import { linkResolver } from "../utils";

/**
 * Returns a Gatsby Link element with the correctly resolved link path and label {@link SingleMixCard})
 * @category Utilities
 * @subcategory Data Processing
 * @function getResidentLinks
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @param {String} currentPath - path data; received only from {@link ResidentTemplate} so the mix cards generated on that resident's page dont have links to the resident page they're already on
 * @returns {jsx}
 */
function getResidentLinks(residentsArr, currentPath) {
  return residentsArr.map((resident, index) => {
    const { _meta, resident_name } = resident.mix_resident;

    const linkTo = linkResolver(_meta);
    const linkLabel = resident_name;

    if (currentPath === linkTo) {
      if (index !== residentsArr.length - 1 || index !== 0) {
        return `${linkLabel}, `;
      } else {
        return linkLabel;
      }
    } else if (index !== residentsArr.length - 1) {
      return (
        <Link to={linkTo} key={`res-link-${index}-${linkLabel}`}>
          {linkLabel}
          {", "}
        </Link>
      );
    } else {
      return (
        <Link to={linkTo} key={`res-link-${index}-${linkLabel}`}>
          {linkLabel}
        </Link>
      );
    }
  });
}
export default getResidentLinks;
