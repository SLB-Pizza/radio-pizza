import React from "react";
import { Link } from "gatsby";
import { linkResolver } from "../utils";

/**
 * Returns a Gatsby Link element with the correctly resolved link path and label {@link SingleMixCard})
 * @category Utilities
 * @subcategory Data Processing
 * @function getResidentLinks
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @returns {jsx}
 */
function getResidentLinks(residentsArr) {
  return residentsArr.map((resident, index) => {
    const linkTo = linkResolver(resident.mix_resident._meta);
    const linkLabel = resident.mix_resident.resident_name;

    if (index !== residentsArr.length - 1) {
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
