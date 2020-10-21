/**
 * Returns a string to pass to the dispatch "CHANGE_URL" action - {@link SingleMixCard}). This string is also used in the {@link RadioPlayer} to display the residents currently, playing.
 * @category Utilities
 * @subcategory Data Processing
 * @function getResidentString
 * @param {Object[]} residentsArr - Array of resident objects, each containing their _meta data to create links to their page and the resident's name
 * @returns {string}
 */
function getResidentString(residentsArr) {
  let residents = []

  residentsArr.forEach(({ mix_resident }) => {
    residents.push(mix_resident.resident_name)
  })

  return residents.join(', ')
}

export default getResidentString
