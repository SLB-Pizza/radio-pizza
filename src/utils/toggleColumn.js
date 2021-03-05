/**
 * Helper function that toggles the currently display resident category by using the clicked resident category's id.
 * @category Utilities
 * @param {Object} type - the `id` of the button clicked that triggered `toggleColumn`
 * @param {String} selected - used to compared with currently clicked id
 * @param {Function} setIsSelected - `setState` function to update `selected` if values don't match
 * @function toggleColumn
 */
export default function toggleColumn(type, selected, setIsSelected) {
  if (selected !== type) {
    setIsSelected(type)
  }
  return
}
