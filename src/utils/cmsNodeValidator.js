import { mappableDataFilter, prioritySetter } from './index'
import { mixNode, validatorErrors } from '../../cms-json-files/index'
/**
 * NODE VALIDATION PROCESS STEPS
 * 1. Determine node type from _meta.type and grab corresponding check template
 * 1a. Check template values are used for the default case if a key isn't checked for in dataChecker
 * 2.
 *
 * @function cmsNodeValidator
 * @param {Object} node - The single cms data node coming from the CMS from either a Page query or Template query
 * @return {0|Object}
 */
function cmsNodeValidator(node) {
  let checkTemplate,
    notices = { priority: '', errors: [] },
    type = node._meta.type
  // Determine the type of node and assign the correct checking template for use
  switch (type) {
    case 'mix':
      checkTemplate = mixNode
      break
    default:
      checkTemplate = mixNode
  }

  // Loop through the node object to do checks
  if (checkTemplate !== undefined) {
    for (const [keyType, valueType] of Object.entries(checkTemplate)) {
      dataChecker(keyType, valueType, node, type)
    }
  }

  function dataChecker(field, dataType, node, entryType) {
    let issue
    switch (field) {
      case 'tags':
        // Mixes should have between 1-4 tags
        if (node._meta.tags.length === 0) {
          issue = validatorErrors.tags.no_tags
          addErrorToNotices(field, issue)
        }
        // Mixes should not have more than 4 tags
        else if (node._meta.tags.length > 4) {
          issue = validatorErrors.tags.too_many
          addErrorToNotices(field, issue)
        }
        break
      case 'alt':
        // MIX entry image check
        if (entryType === 'mix')
          if (!node.mix_image) {
            issue = validatorErrors.missing_image
            addErrorToNotices('image', issue)
            break
          }
        if (typeof node.mix_image.alt !== dataType) {
          issue = validatorErrors.alt_text
          addErrorToNotices(field, issue)
        }
        break
      case 'copyright':
        if (!node.mix_image) {
          issue = validatorErrors.missing_image
          addErrorToNotices('image', issue)
          break
        }
        if (typeof node.mix_image.copyright !== dataType) {
          issue = validatorErrors.copyright
          addErrorToNotices(field, issue)
        }
        break
      case 'featured_residents':
        let arrayTest = mappableDataFilter(node.featured_residents, null, true)
        if (arrayTest === 0) {
          issue = `There is a problem with all residents on this ${node._meta.type} entry. Please address immediately.`
          addErrorToNotices(field, issue)
        } else if (arrayTest > 0) {
          issue = `There is a problem with ${arrayTest} resident ${
            arrayTest === 1 ? 'entry' : 'entries'
          } on this ${node._meta.type} entry. Please address immediately.`
          addErrorToNotices(field, issue)
        }
        break
      default:
        if (typeof node[field] !== dataType) {
          issue = 'This entry does not have a value for this set.'
          addErrorToNotices(field, issue)
        }
        break
    }
  }

  function addErrorToNotices(field, issueDetails) {
    // Update maximum notice priority level
    // Push the error object to notice's errors array
    notices.priority = prioritySetter(notices.priority, issueDetails.level)
    notices.errors.push({ field, ...issueDetails })
  }

  // If noticeshas no entries, return 0; else return the notices object
  if (notices.errors.length === 0) {
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

/**
 */
