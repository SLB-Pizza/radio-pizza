/**
 * Function that checks a Prismic data subobject to see if it's null.
 *
 * Example of null data subobject (from {@link ResidentTemplate}) we want to ID:
 * ```json
 *  [
 *    {
 *      "resident_event": null
 *    }
 *  ]
 * ```
 * Used by:
 * - {@link ResidentTemplate}
 * @category Utilities
 * @function nullDataCheck
 * @param {Array} dataArray
 * @returns {Boolean}
 */
export default function nullDataCheck(dataArray) {
  if (Array.isArray(dataArray) && dataArray.length === 1) {
    /**
     * Grab the first object in the dataArray to test
     */
    const testObject = dataArray[0];

    return Object.values(testObject)[0] === null;
  }
  return false;
}
