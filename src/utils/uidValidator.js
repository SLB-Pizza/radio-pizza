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
 * @returns
 */
function uidValidator(documentNode) {
  if (!documentNode._meta)
    return "Error: Please check this entry's UID and data in the CMS."

  const { _meta, ...rest } = documentNode

  const linkStripper = url =>
    url
      .replace(/[:/\s<>{}]/g, '')
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

  const uidComparison = (assembledUID, currentUID) => {
    return assembledUID === currentUID ? 0 : assembledUID
  }

  switch (_meta.type) {
    case 'mix':
      // Check for no mix_title
      if (rest.mix_title === null) {
        // return a UID formatted like so: 'string-of-resident-names--yyyy-mm-dd'
        const residentString = getResidentString(rest.featured_residents, true)
        const suggestedUID = uidAssembler(residentString, rest.mix_date)

        return uidComparison(suggestedUID, _meta.uid)
      } else {
        // Has mix_title -- use mix_title instead of residents as baseStr
      }
      if (_meta.uid !== linkStripper(rest.mix_link)) {
        let lowercaseTitle = rest.mix_title.replace(/\s/g, '-').toLowerCase()
        const suggestedUID = uidAssembler(lowercaseTitle, rest.mix_date)

        return uidComparison(suggestedUID, _meta.uid)
      }
    default:
      return
  }
}

export default uidValidator
