/**
 * Returns a string to pass to the dispatch "CHANGE_URL" action - {@link SingleMixCard}). This string is also used in the {@link RadioPlayer} to display the residents currently, playing.
 * @category Utilities
 * @function getResidentString
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @param {?String} useCase - Optional boolean that changes the way the residents string is formatted and returned
 * @returns {string}
 */

function getResidentString(residentsArr, useCase) {
  let residents = []

  /**
   * Used by {@link uidValidator}
   *
   * UID TRANSFORMATION STEPS (useCase === "uid")
   *
   * SINGLE RESIDENT CASE
   *  make resident name lowercase
   *  replace all whitespaces with hyphens
   *  push to residents array
   *  join all residents with a hyphen
   *
   * MULTIPLE RESIDENT CASE
   *  grab first word of each resident's name
   *  make resident name lowercase
   *  push to residents array
   *  join all residents with a hyphen
   */
  if (useCase === 'uid') {
    // MULTIPLE RESIDENTS
    if (residentsArr.length > 1) {
      for (let i = 0; i < residentsArr.length; i++) {
        // grab current entry
        let currentResident = residentsArr[i]

        // null check of resident_name key
        if (!currentResident.mix_resident) {
          continue
        }
        // mix_resident exists, process resident_name
        else {
          let currResFirstWord = currentResident.mix_resident.resident_name
            .toLowerCase()
            .split(' ')[0]
          residents.push(currResFirstWord)
        }
      }
    } else {
      // SINGLE RESIDENT
      for (let i = 0; i < residentsArr.length; i++) {
        // grab current entry
        let currentResident = residentsArr[i]

        // mix_resident is null; no resident_name can be added; continue to next
        if (!currentResident.mix_resident) {
          continue
        } else {
          /*
           * mix_resident exists, process resident_name
           * make resident name lowercase
           * split name on spaces
           * spread that resulting array into the residents array
           */
          let residentNameWords = currentResident.mix_resident.resident_name
            .toLowerCase()
            .split(' ')
          residents.push(...residentNameWords)
        }
      }
    }
    // Join the strings in the residents array with a hyphen
    return residents.join('-')
  }

  /**
   * Regular resident string transformation
   * Used by:
   * - {@link SingleMixCard}
   */
  for (let i = 0; i < residentsArr.length; i++) {
    const currentResident = residentsArr[i]

    // mix_resident is null; no resident_name can be added; continue to next
    if (!currentResident.mix_resident) {
      continue
    }
    // add the resident name to the residents array
    else {
      residents.push(currentResident.mix_resident.resident_name)
    }
  }

  return residents.join(', ')
}

export default getResidentString
