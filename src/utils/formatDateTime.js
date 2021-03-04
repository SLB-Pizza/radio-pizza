import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

/**
 * Takes in a Date object or regular date string and returns strings formatted by `dayjs`.
 *
 * ## `convertedPrismicDateTime` use cases:
 *
 * | `format` value            | Components              |
 * |---------------------------|-------------------------|
 * | **"long-form-date"**      | {@link ArticleDateTime} |
 * | **"long-form-date-time"** | {@link ArticleDateTime}, {@link EventHeader} |
 * | **"datetime-value"**      | {@link ArticleDateTime} |
 * @category Utilities
 * @function formatDateTime
 * @param {Object|String} time - a `dayjs` object or a Prismic datetime string from containing datetime
 * @param {String} format - dictates how to format the incoming time
 * @param {?Number} number - optional number to use when adding to the time param, negative numbers allowed
 * @returns {String} String time formatting depends on input `format`.
 *
 * @see {@link https://day.js.org/docs/en/manipulate/add dayjs - add}
 * @see {@link https://day.js.org/docs/en/display/format dayjs - format}
 */
export default function formatDateTime(time, format, number) {
  /**
   * Set up a placeholder variable that'll be used for certain use cases and determine the user's timezone.
   */
  let baseDayJSObj
  const userTimezone = dayjs.tz.guess()

  /**
   * Convert `time` string to EST in case it comes from Prismic; means it's HMBK-centric.
   */
  const convertedPrismicDateTime = dayjs(
    time,
    'YYYY-MM-DDTHH:mm:ssZZ',
    'America/New_York'
  )

  /**
   * In the cases we need to format a datetime string in some way, we first need to convert it from UTC to EST.  This value will not always be used; notes made where such cases apply.
   * @see {@link https://day.js.org/docs/en/plugin/custom-parse-format dayjs - customParseFormat}
   */
  if (userTimezone === 'America/New_York') {
    baseDayJSObj = dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', 'America/New_York')
  } else {
    baseDayJSObj = dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', userTimezone)
  }

  /**

   */
  switch (format) {
    case 'current-time':
      return dayjs().tz('America/New_York')
    case 'add-days':
      return time.add(number, 'day').format('MM.DD')
    case 'prismic-date-query':
      return dayjs(time)
        .add(number, 'day')
        .format('YYYY-MM-DD')
    case 'full-month-day':
      return dayjs(time).format('MMM DD')
    case 'month-day':
      return dayjs(time).format('MM.DD')
    case 'hour-minute':
      return dayjs(time).format('HH:mm')
    case 'year-month-day':
      return dayjs(time).format('YYYY.MM.DD')
    case 'schedule-date-heading':
      return dayjs(time).format('dddd, MMMM D')
    case 'long-form-date-time':
      return convertedPrismicDateTime.format('MMMM D, YYYY - HH:mm')
    case 'long-form-date':
      return convertedPrismicDateTime.format('MMMM D, YYYY')
    case 'datetime-value':
      return convertedPrismicDateTime.format('YYYY-MM-DD HH:mm:ssZ')
    case 'time-debug':
      console.log(
        dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ').format('MMMM D, YYYY - HH:mm Z')
      )
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ').isValid()
    default:
      // Return a current Date object
      return dayjs()
  }
}
