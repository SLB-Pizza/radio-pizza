import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
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
 * @param {?String|Object} startTime - used in `get-place-in-schedule` case
 * @param {?String|Object} endTime - used in `get-place-in-schedule` case
 * @returns {String} String time formatting depends on input `format`.
 *
 * @see {@link https://day.js.org/docs/en/manipulate/add dayjs - add}
 * @see {@link https://day.js.org/docs/en/display/format dayjs - format}
 */
export default function formatDateTime(
  time,
  format,
  number,
  startTime,
  endTime
) {
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
   * In the cases we need to format a datetime string in some way,
   * we first need to convert it from UTC to EST.
   * This value will not always be used; notes made where such cases apply.
   * @see {@link https://day.js.org/docs/en/plugin/custom-parse-format dayjs - customParseFormat}
   */
  if (userTimezone === 'America/New_York') {
    baseDayJSObj = dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', 'America/New_York')
  } else {
    baseDayJSObj = dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', userTimezone)
  }

  /**
   * Use `format` to select and run case time manipulation.
   */
  switch (format) {
    case 'current-time':
      return dayjs().tz('America/New_York')
    case 'Prismic-to-dayjs':
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', 'America/New_York')
    case 'add-days':
      return time.add(number, 'day').format('MM.DD')
    case 'prismic-date-query':
      /**
       * -- `$yesterday`:   day today before today; -1
       * -- `$weekAndADay`: seven days after today; 7
       * @see {@link loadSevenDaySchedule}
       */
      return [-1, 7].map(number => time.add(number, 'day').format('YYYY-MM-DD'))
    case 'get-yesterday-date':
      return time.add(-1, 'day').format('YYYY-MM-DD')
    case 'get-this-weeks-dates':
      /**
       * Since we want today and the six dates after,
       * we create a numbers array from 0 to 6
       * to map over for the `.add` function.
       * @see {@link loadSevenDaySchedule}
       */
      const daysToAdd = [0, 1, 2, 3, 4, 5, 6]
      const btnLabels = daysToAdd.map(num =>
        time.add(num, 'day').format('MM.DD')
      )
      const queryMatching = daysToAdd.map(num =>
        time.add(num, 'day').format('YYYY-MM-DD')
      )
      const dateHeadings = daysToAdd.map(num =>
        time.add(num, 'day').format('dddd, MMMM D')
      )
      return { btnLabels, queryMatching, dateHeadings }

    case 'full-month-day':
      return dayjs(time).format('MMM DD')
    case 'month-day':
      return dayjs(time).format('MM.DD')
    case 'hour-minute':
      return convertedPrismicDateTime.format('HH:mm')
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
    case 'get-place-in-schedule':
      return time.isBetween(startTime, endTime, 'minute', '[)')
    case 'is-schedule-date-today':
      /**
       * startTime here is the incoming schedule date.
       * @see {@link ScheduleDropdown}
       */
      const incomingDateParsed = dayjs(startTime, 'YYYY-MM-DD')
      return incomingDateParsed.isSame(time, 'day')
    case 'time-debug':
      // console.log(
      //   dayjs(time, "YYYY-MM-DDTHH:mm:ssZZ").format("MMMM D, YYYY - HH:mm Z")
      // );
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ').isValid()
    default:
      // Return a current Date object
      return dayjs()
  }
}
