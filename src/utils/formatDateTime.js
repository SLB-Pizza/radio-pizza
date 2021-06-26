import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.extend(advancedFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

/**
 * Takes in a Date object or regular date string and returns strings formatted by `dayjs`.
 *
 * `prismicToNYCTime` use cases:
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
  const prismicToNYCTime = dayjs(
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
    case 'add-days':
      return time.add(number, 'day').format('MM.DD')

    case 'nyc-time':
      return dayjs().tz('America/New_York')

    case 'datetime-value':
      return prismicToNYCTime.format('YYYY-MM-DD HH:mm:ssZ')

    case 'full-month-day':
      return dayjs(time).format('MMM DD')

    case 'get-place-in-schedule':
      return dayjs(time).isBetween(startTime, endTime, 'minute', '[)')

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

    case 'get-yesterday-date':
      return time.add(-1, 'day').format('YYYY-MM-DD')

    case 'get-timezone':
      return dayjs().format('zzz')

    case 'is-before-start-time':
      /**
       * {@link EventHeader}
       * `time` is currentTime
       * `startTime` is startDate
       */
      const eventStartDayJS = dayjs(startTime)
      if (time.isSameOrBefore(eventStartDayJS)) {
        const days = dayjs(eventStartDayJS).diff(time, 'day')

        // 24 hours in a day
        const hours = dayjs(eventStartDayJS).diff(time, 'hour') % 24

        // 60 minutes in a hour
        const minutes = dayjs(eventStartDayJS).diff(time, 'minute') % 60

        // 60 seconds in a minute
        const seconds = dayjs(eventStartDayJS).diff(time, 'second') % 60

        const times = {
          days,
          minutes,
          hours,
          seconds,
        }
        return times
      } else {
        return false
      }

    case 'is-same-or-before':
      return time.isSameOrBefore(startTime, 'minute')

    case 'is-schedule-date-today':
      /**
       * `startTime` here is the incoming schedule date.
       * @see {@link ScheduleDropdown}
       */
      const incomingDateParsed = dayjs(startTime, 'YYYY-MM-DD')
      return incomingDateParsed.isSame(time, 'day')

    case 'month-day':
      return dayjs(time).format('MM.DD')

    case 'hour-minute':
      return prismicToNYCTime.format('HH:mm')

    case 'year-month-day':
      return dayjs(time).format('YYYY.MM.DD')

    case 'schedule-date-heading':
      return dayjs(time).format('dddd, MMMM D')

    case 'short-form-date-time':
      return dayjs(time).format('MMMM D, YYYY - HH:mm:ss')

    case 'long-form-date':
      return prismicToNYCTime.format('MMMM D, YYYY')

    case 'long-form-date-time':
      return prismicToNYCTime.format('MMMM D, YYYY - HH:mm')

    case 'Prismic-to-dayjs':
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ', 'America/New_York')

    case 'prismic-date-query':
      /**
       * -- `$yesterday`:   day today before today; -1
       * -- `$weekAndADay`: seven days after today; 7
       * @see {@link loadSevenDaySchedule}
       */
      return [-1, 7].map(number => time.add(number, 'day').format('YYYY-MM-DD'))

    case 'time-debug':
      console.debug(
        dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ').format('MMMM D, YYYY - HH:mm Z')
      )
      return dayjs(time, 'YYYY-MM-DDTHH:mm:ssZZ').isValid()

    default:
      // Return a current Date object
      return dayjs()
  }
}
