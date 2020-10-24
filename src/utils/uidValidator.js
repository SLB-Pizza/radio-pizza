import { getResidentString } from './index'

/**
 * @category Utility Functions
 * @function uidValidator
 * @param {Object} documentNode
 * @property {Object} documentNode._meta - contains the UID, doc type, firstPublicationData and lastPublicationDate
 * @property {String} documentNode._meta.uid - the uid that's assigned to the current document
 * @property {String} documentNode._meta.type - the document type; used here to determine UID formatting strategy and by {@link linkResolver} to create slugs
 * @property {String} documentNode._meta.firstPublicationDate - date the document was first published
 * @property {String} documentNode._meta.lastPublicationDate - date the document was last updated
 * @returns {0|Object} returns 0 when the documentNode's UID matches the suggested UID; returns an object containing a type (string) and a result (string) of the suggested UID or an info message
 */
function uidValidator(documentNode) {
  // Somethings wrong with the node that was passed in.
  if (!documentNode._meta) {
    return {
      type: 'danger',
      result: "Error: Please check this entry's data in the CMS.",
    }
  }
  const { _meta, ...rest } = documentNode

  // DEV CMS ENTRY CHECK
  // We don't need to validate dev CMS entries

  let endIdx = _meta.type.length + 4 // "dev-" is 4
  if (_meta.uid && _meta.uid.substr(0, endIdx) === `dev-${_meta.type}`) {
    return {
      type: 'danger',
      result:
        'This entry was created as a development aide. Remember to delete immediately before launch.',
    }
  }

  // HELPER FUNCTIONS
  const linkStripper = url =>
    url
      .replace(/[:/|\s<>{}]/g, '')
      .toLowerCase()
      .slice(0, 45)

  const uidAssembler = (baseStr, dateStr) => {
    // maximum allowed UID length is 45
    if (baseStr.length + '--' + dateStr.length > 45) {
      // dateString is always 12 characters long e.g. '--2020-12-25'
      // truncate baseString to 33 characters
      let truncatedBase = baseStr.slice(0, 33)
      return truncatedBase + '--' + dateStr
    }
    return baseStr + '--' + dateStr
  }

  const uidComparison = (assembledUID, currentUID, entryName, reason) => {
    return assembledUID === currentUID
      ? 0
      : {
          type: 'warning',
          entry: entryName,
          result: assembledUID,
          reason,
        }
  }

  switch (_meta.type) {
    case 'mix':
      // Check for no mix_title
      if (rest.mix_title === null) {
        // return a UID formatted like so: 'string-of-resident-names--yyyy-mm-dd'
        const residentString = getResidentString(rest.featured_residents, true)
        const suggestedUID = uidAssembler(residentString, rest.mix_date)
        const reason =
          _meta.uid === linkStripper(rest.mix_link)
            ? 'UID auto-created by Prismic from mix link.'
            : 'UID does not follow suggested Mix UID structure.'

        return uidComparison(suggestedUID, _meta.uid, rest.mix_link, reason)
      } else {
        let lowercaseTitle = rest.mix_title.replace(/\s/g, '-').toLowerCase()
        const suggestedUID = uidAssembler(lowercaseTitle, rest.mix_date)
        const reason =
          _meta.uid === linkStripper(rest.mix_link)
            ? 'UID auto-created by Prismic from mix link.'
            : 'UID does not follow suggested Mix UID structure.'

        return uidComparison(suggestedUID, _meta.uid, rest.mix_title, reason)
      }

    default:
      return 0
  }
}

export default uidValidator
