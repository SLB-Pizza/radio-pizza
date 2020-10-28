import { mappableDataFilter } from './index'
import { mixNode } from '../../cms-json-files/index'
/**
 *
 * @function cmsNodeValidator
 * @param {Object} node - The single cms data node coming from the CMS from either a Page query or Template query
 * @return {0|Object}
 */
function cmsNodeValidator(node) {
  let checkTemplate
  let notices = { info: [], warnings: [] }

  // Determine the type of node and assign the correct checking template for use
  switch (node._meta.type) {
    case 'mix':
      checkTemplate = mixNode
  }

  function issueMaker(field, reason) {
    return { field, reason }
  }

  function nodeChecker(key, dataType, node) {
    let issue
    switch (key) {
      case 'tags':
        // Mixes should have between 1-4 tags
        if (node._meta.tags.length === 0) {
          issue = 'There are no tags for this mix.'
          notices.warnings.push(issueMaker(key, issue))
        } else if (node._meta.tags.length > 4) {
          issue =
            'There are too many tags for this mix. Please keep it to a maximum of 4'
          notices.warnings.push(issueMaker(key, issue))
        }
        break
      case 'alt':
        if (typeof node.mix_image.copyright !== 'string') {
          issue =
            'Alt text (alternative text) describes an image on a web page and is critically important to set for each image.'
          notices.warnings.push(issueMaker(key, issue))
        }
        break
      case 'copyright':
        if (typeof node.mix_image.copyright !== 'string') {
          issue =
            'If possible, copyright data should be added to this image (photographer, date, location, etc). Copyright info allows for proper attribution.'
          notices.info.push(issueMaker(key, issue))
        }
        break
      case 'featured_residents':
        let arrayTest = mappableDataFilter(node.featured_residents, null, true)
        if (arrayTest === 0) {
          issue = `There is a problem with all residents on this ${node._meta.type} entry. Please address immediately.`
          notices.warnings.push(issueMaker(key, issue))
        } else if (arrayTest > 0) {
          issue = `There is a problem with ${arrayTest} resident ${
            arrayTest === 1 ? 'entry' : 'entries'
          } on this ${node._meta.type} entry. Please address immediately.`
          notices.warnings.push(issueMaker(key, issue))
        }
        break
      default:
        if (typeof node[key] !== dataType) {
          issue = 'This entry does not have a value for this set.'
          notices.warnings.push(issueMaker(key, issue))
        }
        break
    }
  }

  // Loop through the node object to do checks
  for (const [keyType, value] of Object.entries(checkTemplate)) {
    nodeChecker(keyType, value, node)
  }

  // If notices has no entries, return 0; else return the notices object
  if (notices.info.length + notices.warnings.length === 0) {
    return 0
  } else {
    return notices
  }
}
export default cmsNodeValidator

/**
 * Data structure
 * [
 *   {
 *     node: {
 *      _meta: {
 *
 *        },
 *     ...rest
 *     },
 *   }
 * ]
 *
 */
