/**
 * Takes in two strings relevant to that CMS node. uidAssembler checks their combined length, truncates if longer than 45 characters, and returns a string to be used as the suggested UID for that node.
 * @category Validation
 * @function uidAssembler
 * @param {String} baseStr - the main portion of the suggested UID
 * @param {String} dateStr - date of the node entry (not necessarily publication)
 * @returns {String}
 */
function uidAssembler(baseStr, dateStr) {
  /**
   * Maximum allowed UID length is 45
   * dateStr + "--" is always 12 characters long => '--2020-12-25'
   *
   * Therefore baseStr.length, "--", and dateStr.length are > 45
   * 1. Truncate baseStr to 33 characters.
   * 2. Append dateStr to baseStr (12)
   * 3. Assembled UID is at 45 char max length
   */
  if (baseStr.length + '--' + dateStr.length > 45) {
    let truncatedBase = baseStr.slice(0, 33)
    return truncatedBase + '--' + dateStr
  }
  /**
   * No truncation to baseStr needed; append the strings together and return.
   */
  return baseStr + '--' + dateStr
}

export default uidAssembler
