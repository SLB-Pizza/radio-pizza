import { mixValidator } from './validators'
import { validatorErrors } from '../../cms-json-files/index'

/**
 * Takes in a Prismic CMS data node and returns either:
 * - an error object details the nature of any issue with the CMS node's UID
 * - 0, if there are no issue with node's UID.
 * @category Validation
 * @function uidValidator
 * @param {Object} cmsNode - the data object from Prismic CMS to analyze
 * @return {Object|0}
 */
function uidValidator(cmsNode) {
  /*
   * If there's no _meta, something's wrong with the node that was passed in.
   */
  if (!cmsNode._meta) {
    return validatorErrors.uid.no_meta
  }

  const nodeType = cmsNode._meta.type

  switch (nodeType) {
    case 'mix':
      return mixValidator(cmsNode)
    default:
      return 0
  }
}

export default uidValidator
