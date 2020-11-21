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
 * @return {0|Object} returns 0 when the node is issue free; returns the notices
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

  // Loop through the checkTemplate to do checks on the node
  if (checkTemplate !== undefined) {
    for (const [keyType, valueType] of Object.entries(checkTemplate)) {
      dataChecker(keyType, valueType, node, type)
    }
  }

  function dataChecker(field, dataType, node) {
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
      /**
       * Image Field Check      Entry Type
       * mix_image              Mix
       * event_start            Event
       */
      case 'mix_image':
        // image does not exist, add missing image error
        // ignore alt text and copyright errors
        if (!node[field]) {
          issue = validatorErrors.missing_image
          addErrorToNotices(field, issue)
        }
        // image exists, check for alt text and copyright existence
        else {
          if (!node[field].alt) {
            issue = validatorErrors.alt_text
            addErrorToNotices('alt', issue)
          }
          if (!node[field].copyright) {
            issue = validatorErrors.copyright
            addErrorToNotices('copyright', issue)
          }
        }
        break
      /**
       * Date Field Check       Entry Type
       * mix_date               Mix
       * event_start            Event
       */
      case 'mix_date':
        if (!node[field]) {
          issue = validatorErrors.date
          // add the field date to the end of the issue's instructions
          issue.instructions += field
          addErrorToNotices(field, issue)
        }
        break
      /**
       * Uses {@link mappableDataFilter} with nodeValidation:true
       * Resident Group Field Check       Entry Type
       * featured_residents               Mix
       */
      case 'featured_residents':
        let residentGroupTest = mappableDataFilter(node[field], null, true)
        /**
         * If residentGroupTest is a number, it means that there were issues with the resident group field.
         * 0        All resident data objects in group have a problem.
         * num > 0  Some resident data objects in group have a problem.
         */
        if (typeof residentGroupTest === 'number') {
          issue = validatorErrors.residents_group_error
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
