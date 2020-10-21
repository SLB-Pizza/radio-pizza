/**
 * Returns a `/path/to/page` for use by gatsby's `Link` or `navigate` (see {@link SlideGenerator}) based on the incoming link type.
 * @category Utilities
 * @subcategory Data Processing
 * @function linkResolver
 * @param {Object} linkObj - object type from the _meta of a HMBK Prismic data node
 * @property {String} link.type - Type of Prismic CMS link, corresponds to a CMS Custom Type
 * @property {String} link.uid - The slug to pass in to the returned template literal; used to navigate on the site.
 * @returns {string} the completed site link generated by uid of the link's page OR the index route, '/'
 */
function linkResolver(link) {
  switch (link.type) {
    case 'cms_guide':
      return `/guide/${link.uid}`
    case 'event':
      return `/events/${link.uid}`
    case 'feature':
      return `/features/${link.uid}`
    case 'mix':
      return `/mixes/${link.uid}`
    case 'page':
      return `/${link.uid}`
    case 'resident':
      return `/residents/${link.uid}`
    default:
      return `/`
  }
}

export default linkResolver
