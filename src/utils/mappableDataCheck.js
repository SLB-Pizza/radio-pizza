/**
 * Function that checks a Prismic data subarray's objects to see if any have key-value pairs that are null. Reason is to avoid Layout Helper component mapping errors because the array of elements had a top-level null value.
 *
 * **Use Case -- Filtering out data subobjects from null key-value pairs to make them mappable**
 *
 * In the {@link ResidentTemplate}, the template receives Prismic data and is eventually deconstructed for use through its layout components:
 *
 * ```js
 * const {
 *   resident_mixes,
 *   resident_features,
 *   resident_events,
 *   ...rest
 * } = residentData;
 * ```
 * `resident_mixes`, `resident_features`, and `resident_events` are data subarrays that any mix, feature, or event data objects the Resident has associated with them. Not all residents will associated features or events (they might not have a mix, but that'd likely be down to human error in the CMS).
 *
 * **Example Prismic data subarrays**
 *
 * Prismic data `resident_events` subarray to immediately reject:
 * ```
 *  resident_events = [ { "resident_event": null } ]
 *
 * - Contains no valid resident_event objects; cannot map over this
 * ```
 *
 * Prismic data `resident_events` subarray containing both valid and invalid `resident_mix` data objects. The invalid object must be filtered out and the subarray returned to the Layout Helper component on {@link ResidentTemplate}
 * ```
 * [
 *   {
 *     resident_mix: {        // <-- valid resident_mix object; can be passed as props to Component
 *       _meta: {},
 *       mix_image: {},
 *       mix_title: "string of title of mix here",
 *       mix_link: "string of mix URL here",
 *       mix_date: "string of mix date here",
 *       featured_residents: [{}],
 *     },
 *   },
 *   { resident_mix: null },  // <-- filter this out to make array mappable for component
 * ];
 *
 * - Contains at least one valid data object
 * ```
 *
 * **Difference between empty arrays and null-value blank objects**
 *
 * ```json
 * let sampleResidentData = {
 *   resident_image: {
 *     dimensions: {
 *       width: 770,
 *       height: 770,
 *     },
 *     alt: "Thank You Scientist",
 *     copyright: null,
 *     url:
 *       "https://images.prismic.io/hmbk-cms/* 5004e5ad-418c-4046-b95f-2d978d251115_thank-you-scientist.webp?* auto=compress,format",
 *   },
 *   resident_name: "DJ ABC",
 *   resident_status: "Resident",
 *   resident_blurb: [
 *     {
 *       type: "paragraph",
 *       text: "",
 *       spans: [],
 *     },
 *   ],
 *   social_media: [], // <-- no entries, no blanks in CMS group field
 *   resident_mixes: [], // <-- no entries, no blanks in CMS group field
 *   resident_features: [
 *     {
 *       resident_feature: null, // <-- 1 entry, left blank, added to that CMS group field
 *     },
 *   ],
 *   resident_events: [
 *     {
 *       resident_event: null, // <-- 1 entry, left blank, added to that CMS group field
 *     },
 *   ],
 * };
 * ```
 * Used by:
 * - {@link ResidentTemplate}
 * @category Utilities
 * @function mappableDataCheck
 * @param {Array} dataArray
 * @returns {Boolean|Array}
 */
export default function mappableDataCheck(dataArray) {
  // Immediately reject dataArray if it's not an array OR empty
  if (Array.isArray(dataArray) && dataArray.length !== 0) {
    // It's an array with at least one entry
    // Begin checks on entry key-value pairs

    let filteredArr = dataArray.filter((singleDataObject) => {
      // Each data object should contain only one key-value pair
      if (Object.entries(singleDataObject).length !== 1) {
        return false;
      }
      // The value inside the singleDataObject is not null
      if (Object.values(singleDataObject)[0] === null) {
        return false;
      }
      return true;
    });

    // If no array entries made it through the filter, return 0
    if (filteredArr.length === 0) {
      return 0;
    }
    // The filteredArr has at least one entry
    return filteredArr;
  }
  return 0;
}
