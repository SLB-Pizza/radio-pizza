import React from "react";
import { graphql } from "gatsby";

/**
 * @category Templates
 * @subcategory Mix
 * @function MixTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/mixes/:uid`
 * @returns {jsx}
 */

function MixTemplate({ data }) {
  const prismicContent = data.prismic.allResidents.edges[0];
  if (!prismicContent) return null;
  const mixData = prismicContent.node;
}

export default MixTemplate;
