import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

/**
 * Takes in a Date object or regular date string and returns strings formatted by dayjs
 * @category Utilities
 * @subcategory Data Processing
 * @function formatDateTime
 * @param {(Object|String)} time - a Date object or regular string containing datetime
 * @param {String} format - dictates how to format the incoming time
 * @param {?Number} number - optional number to use when adding to the time param
 * @returns {String}
 * @see {@link https://day.js.org/docs/en/manipulate/add|dayjs docs - add}
 * @see {@link https://day.js.org/docs/en/display/format|dayjs docs - format}
 */
const formatDateTime = (time, format, number) => {
  switch (format) {
    case "add-days":
      return time.add(number, "day").format("MM.DD");
    case "UTC-to-EST":
      // event_start and event_end come in as UTC time, so subtract 4 hours
      return time.subtract(4, "hours");
    case "prismic-date-query":
      return dayjs(time)
        .add(number, "day")
        .format("YYYY-MM-DD");
    case "full-month-day":
      return dayjs(time).format("MMM DD");
    case "month-day":
      return dayjs(time).format("MM.DD");
    case "hour-minute":
      return dayjs(time).format("HH:mm");
    case "year-month-day":
      return dayjs(time).format("YYYY.MM.DD");
    case "schedule-date-heading":
      return dayjs(time).format("dddd, MMMM D");
    case "long-form-date-time":
      return dayjs(time).format("MMMM D, YYYY - HH:mm");
    case "long-form-date":
      return dayjs(time).format("MMMM D, YYYY");
    default:
      return dayjs(time);
  }
};

export default formatDateTime;
