/**
 * Returns a `/path/to/page` for use by gatsby's `Link` or `navigate` (see {@link slideGenerator}) based on the incoming document type.
 * @category Utilities
 * @subcategory Data Processing
 * @function linkResolver
 * @param {Object} document - The document that is passed has a type that's defined by the custom type created in the HMBK Prismic Repo
 * @property {String} document.type - Type of Prismic CMS document, corresponds to a CMS Custom Type
 * @property {String} document.uid - The slug to pass in to the returned template literal; used to navigate on the site.
 * @returns {string}  - returns one of two things: the link generated by uid of the document's page OR the index route, '/'
 */
function linkResolver(document) {
  switch (document.type) {
    case "page":
      return `/${document.uid}`;
    case "feature":
      return `/features/${document.uid}`;
    case "resident":
      return `/residents/${document.uid}`;
    default:
      return `/`;
  }
}

export default linkResolver;
