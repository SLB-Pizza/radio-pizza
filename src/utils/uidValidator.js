import {
  devEntryDetails,
  getResidentString,
  linkStripper,
  uidAssembler,
} from './index'

/**
 * @category Utilities
 * @function uidValidator
 * @param {Object} cmsNode
 * @property {Object} cmsNode._meta - contains the UID, cmsNode type, firstPublicationData and lastPublicationDate
 * @property {String} cmsNode._meta.uid - the uid that's assigned to the current document
 * @property {String} cmsNode._meta.type - the document type; used here to determine UID formatting strategy and by {@link linkResolver} to create slugs
 * @property {String} cmsNode._meta.firstPublicationDate - date the document was first published
 * @property {String} cmsNode._meta.lastPublicationDate - date the document was last updated
 * @returns {0|Object} returns 0 when the cmsNode's UID matches the suggested UID; returns an object containing a type (string) and a result (string) of the suggested UID or an info message
 */
function uidValidator(cmsNode) {
  const { _meta, ...rest } = cmsNode
  // Somethings wrong with the node that was passed in.
  if (!cmsNode._meta) {
    return {
      type: 'danger',
      result: "Error: Please check this entry's data in the CMS.",
    }
  }

  function uidAnalyzer(assembledUID, currentUID, entryName) {
    if (assembledUID === currentUID) {
      return 0
    }
    const reason =
      _meta.uid === linkStripper(rest.mix_link)
        ? 'UID auto-created by Prismic from mix link.'
        : 'UID does not follow suggested Mix UID structure.'
    return {
      type: 'warning',
      entry: entryName,
      result: assembledUID,
      reason,
    }
  }

  let endIdx = _meta.type.length + 4 // "dev-" is 4

  switch (_meta.type) {
    case 'mix':
      if (_meta.uid.substr(0, endIdx) === `dev-${_meta.type}`) {
        return devEntryDetails(cmsNode)
      } else if (rest.mix_title === null) {
        const residentString = getResidentString(rest.featured_residents, 'uid')
        const suggestedUID = uidAssembler(residentString, rest.mix_date)

        return uidAnalyzer(suggestedUID, _meta.uid, rest.mix_link)
      } else {
        let lowercaseTitle = rest.mix_title.replace(/\s/g, '-').toLowerCase()
        const suggestedUID = uidAssembler(lowercaseTitle, rest.mix_date)

        return uidAnalyzer(suggestedUID, _meta.uid, rest.mix_title)
      }

    default:
      return 0
  }
}

export default uidValidator
