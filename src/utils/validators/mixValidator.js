import { devEntryDetails, getResidentString } from '../index'
import { uidAssembler, uidAnalyzer } from './index'

/**
 * Analyzes a Mix CMS node's UID. Returns 0 if no issues, or an error object detailing problems.
 * @category Validation
 * @function mixValidator
 * @param {Object} node
 * @returns {Object|0} Object if the mix has issues
 */
function mixValidator(node) {
  const { _meta, mix_title, mix_date, mix_link, featured_residents } = node

  const nodeType = _meta.type

  /**
   * Development entries start with the prefix "dev-"
   */
  let endIdx = nodeType.length + 4 // "dev-" is 4

  /**
   * Three Scenarios
   * 1. Mix is a dev entry
   * 2. Mix has no mix title
   * 3. Mix has a mix title
   */
  if (_meta.uid.substr(0, endIdx) === `dev-${nodeType}`) {
    /**
     * SCENARIO 1
     * Have devEntryDetails process the node
     */
    return devEntryDetails(node)
  } else if (!mix_title) {
    /**
     * SCENARIO 2
     * Get the UID version of the resident string
     * Generate a suggested UID using the resident string as the base string and the mix date as the date string.
     * Compare the suggested UID, this node's actual UID and the mix link
     */
    const residentString = getResidentString(featured_residents, 'uid')
    const suggestedUID = uidAssembler(residentString, mix_date)
    return uidAnalyzer(suggestedUID, mix_link, node)
  } else {
    /**
     * SCENARIO 3
     * Generate a lowercase, hyphenated version of the mix title
     * Generate a suggested UID using new hyphenated title as the base string and the mix date as the date string.
     * Compare the suggested UID, this node's actual UID and the mix link
     */
    let lowerHyphenTitle = mix_title.replace(/\s/g, '-').toLowerCase()
    const suggestedUID = uidAssembler(lowerHyphenTitle, mix_date)
    return uidAnalyzer(suggestedUID, mix_title, node)
  }
}

export default mixValidator
