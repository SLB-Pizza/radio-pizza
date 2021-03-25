import { expect } from 'chai'
import { formatDateTime } from '../../src/utils'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

dayjs('2010-10-20').isSameOrBefore('2010-10-19', 'year')

describe.only('formatDateTime', () => {
  describe("'current-time'", () => {
    it('returns a valid dayjs instance', () => {
      const time = formatDateTime(null, 'current-time')
      expect(dayjs.isDayjs(time)).to.be.true
    })

    it('returns the current time (3 second tolerance)', () => {
      const now = Date.now()
      const time = formatDateTime(null, 'current-time')
      const dayjsNow = dayjs(now)
      const timeDiff = time.diff(dayjsNow, 'second')
      const lessThanThreeSeconds = timeDiff <= 3

      // avoiding issues where 999ms and 000ms causing different second
      // 3 second tolerance
      expect(dayjsNow.isSameOrBefore(time)).to.be.true
      expect(lessThanThreeSeconds).to.be.true
    })
  })

  describe("'get-this-weeks-dates'", () => {
    const time = formatDateTime(null, 'current-time')
    const weekDatesArray = formatDateTime(time, 'get-this-weeks-dates')
    const { btnLabels, dateHeadings, queryMatching } = weekDatesArray
    const keyNames = ['btnLabels', 'dateHeadings', 'queryMatching']

    it('returns an object', () => {
      expect(weekDatesArray).to.be.an('object')
    })

    describe('object key names', () => {
      keyNames.map(key => {
        it(`has a key named '${key}'`, () => {
          expect(weekDatesArray).to.have.property(key)
        })
      })
    })

    describe('each key has a value: array of 7 items', () => {
      keyNames.map(key => {
        it(`'${key}'`, () => {
          expect(weekDatesArray[key]).to.be.an('array')
          expect(weekDatesArray[key]).to.have.lengthOf(7)
        })
      })
    })

    describe('each item in each values array is formatted correctly', () => {
      it('`btnLabels`: all "MM.DD"', () => {
        expect(btnLabels.every(label => dayjs(label, 'MM.DD', true).isValid()))
      })

      it('`queryMatching`: all "YYYY-MM-DD"', () => {
        expect(
          queryMatching.every(queryDate =>
            dayjs(queryDate, 'YYYY-MM-DD', true).isValid()
          )
        )
      })

      it('`dateHeadings`: all "Weekday, Month DayNumber"', () => {
        expect(
          dateHeadings.every(date =>
            dayjs(date, 'dddd, MMMM D', true).isValid()
          )
        )
      })
    })
  })

  describe("'get-place-in-schedule'", () => {
    /**
     * > now
     * -- START first show today
     */
    describe('returns "now live"', () => {
      const time = formatDateTime(null, 'current-time')

      it('when current time is between a show start and end time', () => {
        const fiveMinsBefore = dayjs(time)
          .add(-5, 'minute')
          .format('HH:mm')
        const fiveMinsAfter = dayjs(time)
          .add(5, 'minute')
          .format('HH:mm')

        const timeIsBetween = formatDateTime(
          time,
          'get-place-in-schedule',
          null,
          fiveMinsBefore,
          fiveMinsAfter
        )

        expect(timeIsBetween).to.be.true
      })
    })
  })
})
