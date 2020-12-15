import {
  devEntryDetails,
  getResidentString,
  getMixTitle,
  linkStripper,
  uidAssembler,
} from './index'
import { validatorErrors } from '../../cms-json-files/index'

/**
 * @category Utilities
 * @function uidValidator
 * @param {Object} cmsNode
 * @property {Object} cmsNode._meta - contains the UID, cmsNode type, firstPublicationData and lastPublicationDate
 * @property {String} cmsNode._meta.uid - the uid that's assigned to the current document
 * @param {String} nodeType - the type of Prismic CMS entry; pulled from the node by {@link cmsNodeValidator}
 */
function uidValidator(cmsNode) {
  const { _meta, ...rest } = cmsNode

  // If there's no _meta, something's wrong with the node that was passed in.
  if (!_meta) {
    return validatorErrors.uid.no_meta
  }
  const nodeType = _meta.type

  /**
   * Development entries start with the prefix "dev-"
   */
  let endIdx = nodeType.length + 4 // "dev-" is 4

  switch (nodeType) {
    case 'mix':
      if (_meta.uid.substr(0, endIdx) === `dev-${nodeType}`) {
        return devEntryDetails(cmsNode)
      } else if (!rest.mix_title) {
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
}

export default uidValidator
