/**
 * Returns a string to pass to the dispatch "CHANGE_URL" action - {@link SingleMixCard}). This string is also used in the {@link RadioPlayer} to display the residents currently, playing.
 * @category Utilities
 * @subcategory Data Processing
 * @function getResidentString
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @param {?Boolean} forUID - Optional boolean that changes the way the residents string is formatted and returned
 * @returns {string}
 */

function getResidentString(residentsArr, forUID) {
  let residents = []

  /**
   * UID TRANSFORMATION STEPS
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
   *  replace all whitespaces with hyphens
   *  push to residents array
   *  join all residents with a hyphen
   */
  if (forUID) {
    if (residentsArr.length > 1) {
      // SINGLE RESIDENT
      residentsArr.forEach(({ mix_resident }) => {
        let residentNameWords = mix_resident.resident_name.split(' ')
        let residentFirstWord = residentNameWords[0]
        residents.push(residentFirstWord.toLowerCase().replace(/\s/g, '-'))
      })
      return residents.join('-')
    } else {
      // MULTIPLE RESIDENTS
      residentsArr.forEach(({ mix_resident }) => {
        residents.push(
          mix_resident.resident_name.toLowerCase().replace(/\s/g, '-')
        )
      })
      return residents.join('-')
    }
  }

  /**
   * Regular resident string transformation
   * Used by:
   * - {@link SingleMixCard}
   */
  residentsArr.forEach(({ mix_resident }) => {
    residents.push(mix_resident.resident_name)
  })

  return residents.join(', ')
}

export default getResidentString
