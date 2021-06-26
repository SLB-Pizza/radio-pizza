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

describe('formatDateTime', () => {
  describe("'nyc-time'", () => {
    it('returns a valid dayjs instance', () => {
      const time = formatDateTime(null, 'nyc-time')
      expect(dayjs.isDayjs(time)).to.be.true
    })

    it('returns the current time (3 second tolerance)', () => {
      const now = Date.now()
      const time = formatDateTime(null, 'nyc-time')
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
    const time = formatDateTime(null, 'nyc-time')
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
    const time = formatDateTime(null, 'nyc-time')

    it("returns `true` when current time is between a show's start and end time", () => {
      const fiveMinsBefore = dayjs(time).add(-5, 'minute')
      const fiveMinsAfter = dayjs(time).add(5, 'minute')

      const timeIsBetween = formatDateTime(
        time,
        'get-place-in-schedule',
        null,
        fiveMinsBefore,
        fiveMinsAfter
      )

      expect(timeIsBetween).to.be.true
    })

    describe('returns `false`', () => {
      it("when current time is before a show's start time", () => {
        const fifteenMinsBefore = dayjs(time).add(-15, 'minute')
        const tenMinsBefore = dayjs(time).add(-10, 'minute')

        const timeIsBetween = formatDateTime(
          time,
          'get-place-in-schedule',
          null,
          fifteenMinsBefore,
          tenMinsBefore
        )

        expect(timeIsBetween).to.be.false

        const twoDaysMinus10Before = tenMinsBefore.add(-2, 'day')
        const twoDaysMinus15Before = fifteenMinsBefore.add(-2, 'day')

        const timeIsDaysBefore = formatDateTime(
          time,
          'get-place-in-schedule',
          null,
          twoDaysMinus10Before,
          twoDaysMinus15Before
        )

        expect(timeIsDaysBefore).to.be.false
      })

      it("when current time is after a show's start time", () => {
        const tenMinsAfter = dayjs(time).add(10, 'minute')
        const fifteenMinsAfter = dayjs(time).add(15, 'minute')

        const timeIsMinutesAfter = formatDateTime(
          time,
          'get-place-in-schedule',
          null,
          tenMinsAfter,
          fifteenMinsAfter
        )

        expect(timeIsMinutesAfter).to.be.false

        const twoDaysPlus10After = tenMinsAfter.add(2, 'day')
        const twoDaysPlus15After = fifteenMinsAfter.add(2, 'day')

        const timeIsDaysAfter = formatDateTime(
          time,
          'get-place-in-schedule',
          null,
          twoDaysPlus10After,
          twoDaysPlus15After
        )

        expect(timeIsDaysAfter).to.be.false
      })
    })
  })

  describe('is-schedule-date-today', () => {
    const time = formatDateTime(null, 'nyc-time')

    it('returns `true` when date to match is today', () => {
      const today = time.format('YYYY-MM-DD')

      const dateIsToday = formatDateTime(
        time,
        'is-schedule-date-today',
        null,
        today
      )

      expect(dateIsToday).to.be.true
    })

    describe('returns `false`', () => {
      it('when day is before today', () => {
        const yesterday = time.add(-1, 'day').format('YYYY-MM-DD')

        const dateIsToday = formatDateTime(
          time,
          'is-schedule-date-today',
          null,
          yesterday
        )

        expect(dateIsToday).to.be.false
      })

      it('when day is after today', () => {
        const tomorrow = time.add(1, 'day').format('YYYY-MM-DD')

        const dateIsToday = formatDateTime(
          time,
          'is-schedule-date-today',
          null,
          tomorrow
        )

        expect(dateIsToday).to.be.false
      })
    })
  })
})
