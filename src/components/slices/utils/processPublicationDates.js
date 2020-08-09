import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

/**
 * @function processPublicationDates
 * @param {String} firstPubDate - date of initial publish; comes from feature_metadata
 * @param {String} lastPubDate - date of most recent publish(update); comes from feature_metadata
 * @returns {Object} dateDetails
 */

export default function processPublicationDates(firstPubDate, lastPubDate) {
  /**
   * Default dateDetails to firstPubDate and never updated
   */
  let dateDetails = {
    pubDate: firstPubDate,
    hasBeenUpdated: false,
  };

  /**
   * Determine if feature has been updated by comparing first and last publication dates.
   */
  const updated = firstPubDate !== lastPubDate ? true : false;

  /**
   * Update the dateDetails object with the value of updated
   */
  dateDetails.hasBeenUpdated = updated;

  /**
   * If the feature has been updated, format pubDate to include the time of update after the update's date e.g. August 6, 2020 - 17:25
   * If the feature has NOT been update, format pubDate to show just the date of publication e.g. August 2, 2020
   */
  dateDetails.pubDate = updated
    ? dayjs(lastPubDate).format("MMMM D, YYYY – HH:mm")
    : dayjs(firstPubDate).format("MMMM D, YYYY");

  return dateDetails;
}
