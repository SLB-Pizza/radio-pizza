import { mappableDataFilter, prioritySetter } from './index'
import {
  mixNode,
  residentNode,
  validatorErrors,
} from '../../cms-json-files/index'
/**
 * NODE VALIDATION PROCESS STEPS
 * 1. Determine node type from _meta.type and grab corresponding check template
 * 1a. Check template values are used for the default case if a key isn't checked for in dataChecker
 * 2.
 * @function cmsNodeValidator
 * @param {Object} node - The single cms data node coming from the CMS from either a Page query or Template query
 * @return {0|Object} returns 0 when the node is issue free; returns the notices
 */
function cmsNodeValidator(node) {
  let checkTemplate
  let notices = { priority: '', errors: [] }
  let type = node._meta.type

  // Determine the type of node and assign the correct checking template for use
  switch (type) {
    case 'mix':
      checkTemplate = mixNode
      break
    case 'resident':
      checkTemplate = residentNode
      break
    default:
      checkTemplate = mixNode
  }

  // Loop through the checkTemplate to do checks on the node
  if (checkTemplate !== undefined) {
    for (const [node_field, typeInfo] of Object.entries(checkTemplate)) {
      dataChecker(node_field, typeInfo, node)
    }
  }

  function dataChecker(field, typeInfo, node) {
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
      case 'mix_image':
      case 'resident_image':
        /**
         * Image Field Check      Entry Type
         * mix_image              Mix
         * resident_image         Resident
         */
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
      case 'resident_blurb':
        /**
         * An empty Rich Text field is an array containing only:
         * {
         *   "type": "paragraph",
         *   "text": "",
         *   "spans": []
         * }
         *
         * Prismic Rich Text Field Check        Entry Type
         * mix_blurb                            Mix
         * resident_blurb                       Resident
         */
        if (node[field].length === 1) {
          const { type, text, spans } = node[field][0]
          // Check types of sole rich text object
          const typeCheck = type === 'paragraph'
          const textCheck = text === ''
          const spanCheck = Array.isArray(spans) && spans.length === 0

          // If the sole rich text object matches the default empty rich text object, set issue and level, and add error info to notices
          if (typeCheck && textCheck && spanCheck) {
            issue = validatorErrors.default_error
            // Use the level defined in checkTemplate
            issue.level = typeInfo.level
            addErrorToNotices(field, issue)
          }
        }
        break
      case 'mix_date':
        /**
         * Date Field Check       Entry Type
         * mix_date               Mix
         * event_start            Event
         */
        if (!node[field]) {
          issue = validatorErrors.date
          // add the field date to the end of the issue's instructions
          issue.instructions += field
          addErrorToNotices(field, issue)
        }
        break
      /**
       * Only checks group fields when the group has at least one entry
       * Uses {@link mappableDataFilter}
       *  -- objectKeyCount: typeInfo (from checkTemplate), NUMBER type
       *  -- nodeValidation: true
       * Resident Group Field Check       Entry Type
       * featured_residents               Mix
       * resident_mixes                   Resident
       */
      case 'featured_residents':
      case 'resident_mixes':
      case 'social_media':
        if (node[field].length > 0) {
          let groupFieldTest = mappableDataFilter(node[field], typeInfo, true)
          /**
           * If groupFieldTest is a number, it means that there were issues with the elements in that group field.
           * 0            All data objects in group field have a problem.
           * num > 0      Some data objects in group field have a problem.
           */
          if (typeof groupFieldTest === 'number') {
            issue = validatorErrors.residents_group_error
            addErrorToNotices(field, issue)
          }
          break
        }
      default:
        // Fields that evaluate here in default,
        // have an object containing type and issue level data
        // Use typeInfo's type to type match against
        if (typeof node[field] !== typeInfo.type) {
          issue = validatorErrors.default_error
          // The default error does not have a level predefined
          // Assign the level from the typeInfo object
          issue.level = typeInfo.level
          // console.log("issue", issue);
          addErrorToNotices(field, issue)
        }
        break
    }
  }

  function addErrorToNotices(field, issueDetails) {
    // Update maximum notice priority level
    notices.priority = prioritySetter(notices.priority, issueDetails.level)
    // Push the error object to notice's errors array
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
