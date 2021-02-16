import { linkStripper } from '../index'
/**
 * Compares the assembled UID from {@link uidAssembler} with the CMS node's details based on type. Returns an object with a type, entry name, result and reason.
 * @category Validation
 * @function uidAnalyzer
 * @param {String} assembledUID
 * @param {String} entryName
 * @param {Object} node
 * @returns {Object.<String, String>}
 */
function uidAnalyzer(assembledUID, entryName, node) {
  let reason

  const { _meta, ...rest } = node
  const currentUID = _meta.uid
  const entryType = _meta.type

  /**
   * This is where all the work done by {@link uidValidator} resolves.
   * If the assembled and current UID match, no issues; process next node.
   */
  if (assembledUID === currentUID) {
    return 0
  }

  /**
   * Otherwise, generate an error object that can be mapped to display
   */
  switch (entryType) {
    case 'mix':
      /**
       * Determine reason for Mix UID discrepancy
       */
      reason =
        currentUID === linkStripper(rest.mix_link)
          ? 'UID auto-created by Prismic from mix link.'
          : 'UID does not follow suggested Mix UID structure.'
      break
    default:
      return {}
  }
  return {
    type: 'warning',
    entry: entryName,
    result: assembledUID,
    reason,
  }
}

export default uidAnalyzer
