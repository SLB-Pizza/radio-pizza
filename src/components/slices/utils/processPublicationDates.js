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
  // Default dateDetails to firstPubDate and never updated
  let dateDetails = {
    pubDate: firstPubDate,
    hasBeenUpdated: false,
  };

  // Determine whether this feature has been update since first publication
  const hasBeenUpdated = firstPubDate !== lastPubDate ? true : false;

  // Update dateDetails
  dateDetails.hasBeenUpdated = hasBeenUpdated;

  // If the feature has been updated
  dateDetails.pubDate = hasBeenUpdated
    ? dayjs(lastPubDate).format("MMMM D, YYYY – HH:mm")
    : dayjs(firstPubDate).format("MMMM D, YYYY");

  return dateDetails;
}
