import { expect } from 'chai'
import { mappableDataFilter } from '../../src/utils'

describe('mappableDataFilter', () => {
  // Immediate rejection
  describe('returns 0', () => {
    it('when passed nothing', () => {
      expect(mappableDataFilter()).to.equal(0)
    })

    it('when passed an empty object', () => {
      expect(mappableDataFilter({})).to.equal(0)
    })

    it('when passed an empty string', () => {
      expect(mappableDataFilter('')).to.equal(0)
    })

    it('when passed only a number', () => {
      expect(mappableDataFilter(42)).to.equal(0)
    })

    it('when passed undefined', () => {
      expect(mappableDataFilter(undefined)).to.equal(0)
    })

    it('when passed null', () => {
      expect(mappableDataFilter(null)).to.equal(0)
    })
    it('when passed false', () => {
      expect(mappableDataFilter(false)).to.equal(0)
    })
  })

  describe('returns 0 when passed an array with no valid entries', () => {
    it('when passed an empty array', () => {
      expect(mappableDataFilter([])).to.equal(0)
    })

    // Is an array, but with invalid entries
    it('when passed an array with a nested array within', () => {
      expect(mappableDataFilter([[]])).to.equal(0)
    })

    it('when passed an array containing one empty object', () => {
      expect(mappableDataFilter([{}])).to.equal(0)
    })

    it('when passed an array with multiple empty objects', () => {
      expect(mappableDataFilter([{}, {}, {}])).to.equal(0)
    })

    it('when passed an array with an object containing a null key-value pair', () => {
      let nullKeyValue = [{ sample_field: null }]
      expect(mappableDataFilter(nullKeyValue)).to.equal(0)
    })

    it('when passed an array with one object containing multiple key-value pairs', () => {
      let hasObjectWithMultipleKeys = [
        {
          type: 'paragraph',
          text: '',
          spans: [],
        },
      ]

      expect(mappableDataFilter(hasObjectWithMultipleKeys)).to.equal(0)
    })

    it('when passed an array with multiple objects, each containing a null key-value pair', () => {
      let allNullKeyValues = [
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
      ]
      expect(mappableDataFilter(allNullKeyValues)).to.equal(0)
    })
  })

  describe('returns an array only containing valid key-value pairs', () => {
    it('when passed an array with a single valid entry', () => {
      let oneValidEntry = [
        {
          resident_mix: {
            __typename: 'PRISMIC_Mix',
            _meta: {
              tags: ['prog rock', 'post rock', 'instrumental', 'math rock'],
              uid: 'dev-moon-album',
              type: 'mix',
            },
            mix_image: {
              dimensions: {
                width: 700,
                height: 700,
              },
              alt: 'Digital moon',
              copyright: null,
              url:
                'https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=93,0,1080,1080&w=700&h=700',
              medium: {
                dimensions: {
                  width: 500,
                  height: 500,
                },
                alt: 'Digital moon',
                copyright: null,
                url:
                  'https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=748,0,1080,1080&w=500&h=500',
              },
              now_playing: {
                dimensions: {
                  width: 96,
                  height: 96,
                },
                alt: 'Digital moon',
                copyright: null,
                url:
                  'https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=416,0,1080,1080&w=96&h=96',
              },
            },
            mix_title: null,
            mix_link: 'https://www.youtube.com/watch?v=Q9XTqQbuavI',
            mix_date: '2020-08-02',
            featured_residents: [
              {
                mix_resident: {
                  __typename: 'PRISMIC_Resident',
                  resident_name: 'Jardin de la Croix',
                  _meta: {
                    uid: 'dev-resident-jardin-de-la-croix',
                    type: 'resident',
                  },
                },
              },
              {
                mix_resident: {
                  __typename: 'PRISMIC_Resident',
                  resident_name: 'Infected Mushroom',
                  _meta: {
                    uid: 'dev-resident-infected-mushroom',
                    type: 'resident',
                  },
                },
              },
            ],
          },
        },
      ]

      expect(mappableDataFilter(oneValidEntry)).to.eql(oneValidEntry)
    })

    it('when passed an array where the first object has a null key-value pair', () => {
      let firstKeyValuePairNull = [
        {
          sample_field: null,
        },
        {
          resident_event: {
            __typename: 'PRISMIC_Event',
            _meta: {
              uid: 'dev-event-edc-las-vegas',
              type: 'event',
            },
          },
        },
      ]

      expect(mappableDataFilter(firstKeyValuePairNull)).to.eql([
        {
          resident_event: {
            __typename: 'PRISMIC_Event',
            _meta: {
              uid: 'dev-event-edc-las-vegas',
              type: 'event',
            },
          },
        },
      ])
    })

    it('when passed an array where the last object has a null key-value pair', () => {
      let lastKeyValuePairNull = [
        {
          resident_image: {
            dimensions: {
              width: 900,
              height: 506,
            },
            alt: 'DJ Freedem',
            copyright: null,
            url:
              'https://images.prismic.io/hmbk-cms/4669971b-35ff-41ee-bddf-469d6bc515d6_1295420.jpg?auto=compress,format',
          },
        },
        {
          sample_field: null,
        },
      ]

      expect(mappableDataFilter(lastKeyValuePairNull)).to.eql([
        {
          resident_image: {
            dimensions: {
              width: 900,
              height: 506,
            },
            alt: 'DJ Freedem',
            copyright: null,
            url:
              'https://images.prismic.io/hmbk-cms/4669971b-35ff-41ee-bddf-469d6bc515d6_1295420.jpg?auto=compress,format',
          },
        },
      ])
    })
  })
  describe('returns a correctly filtered array of mappable data', () => {
    const testCaseMaker = () => {
      let testCases = []

      for (let i = 1; i <= 100; i++) {
        let validEntriesTotal = Math.ceil(Math.random() * 500) + i + 99
        let invalidEntriesTotal = i
        let testArrayLength = validEntriesTotal + invalidEntriesTotal
        let validEntry = {
          not_null: {
            sub_key: 'value',
          },
        }

        // Array of all the bad entry test cases used so far
        let badEntries = [
          {},
          '',
          42,
          undefined,
          null,
          false,
          [],
          [[]],
          [{}],
          [{}, {}, {}],
          [{ sample_field: null }],
          [
            {
              type: 'paragraph',
              text: '',
              spans: [],
            },
          ],
          [
            { sample_field: null },
            { sample_field: null },
            { sample_field: null },
            { sample_field: null },
            { sample_field: null },
          ],
        ]

        const arrayMaker = () => {
          let validCount = 0
          let invalidCount = 0
          let mixedArray = []

          while (mixedArray.length !== testArrayLength) {
            let badIndex = i % badEntries.length

            if (validCount === validEntriesTotal) {
              // Randomly select and add an invalid entry
              mixedArray.push(badEntries[badIndex])
              invalidCount++
            } else if (invalidCount === invalidEntriesTotal) {
              // Add a valid entry
              mixedArray.push(validEntry)
              validCount++
            } else {
              // Flip a numeric coin
              let validOrInvalid = Math.ceil(Math.random() * 2)

              // if 1, add invalid; if 2, add valid
              if (validOrInvalid === 1) {
                mixedArray.push(badEntries[badIndex])
                invalidCount++
              } else {
                mixedArray.push(validEntry)
                validCount++
              }
            }
          }
          return mixedArray
        }

        let testArray = arrayMaker()
        // Create an array with validEntries # of empty slots and fill each slot with valid entry
        let arrayMatch = Array(validEntriesTotal).fill(validEntry)
        // Create 100 test cases to examine
        testCases.push({
          array: testArray,
          allValid: arrayMatch,
          invalid: invalidEntriesTotal,
        })
      }

      return testCases
    }

    let hundredTestCases = testCaseMaker()

    hundredTestCases.forEach(test => {
      it(`${test.array.length} entries; ${test.invalid} invalid ${
        test.invalid === 1 ? 'entry removed' : 'entries removed'
      }`, () => {
        expect(mappableDataFilter(test.array)).to.eql(test.allValid)
      })
    })
  })

  describe('when objectKeyCount is defined', () => {
    describe('returns 0 when', () => {
      it("arrayEntry doesn't have objectKeyCount # of keys", () => {
        let oneObjectOneKey = [{ only_key: [1, 2, 3, 4, 5] }]

        expect(mappableDataFilter(oneObjectOneKey, 2)).to.equal(0)
      })

      it("arrayEntry doesn't have objectKeyCount # of keys", () => {
        let oneObjectOneKey = [{ only_key: [1, 2, 3, 4, 5] }]

        expect(mappableDataFilter(oneObjectOneKey, 2)).to.equal(0)
      })

      it('arrayEntry has objectKeyCount # of keys but all values are null', () => {
        let oneObjectTwoKeyAllNullValues = [
          { first_null: null, second_null: null },
        ]

        expect(mappableDataFilter(oneObjectTwoKeyAllNullValues, 2)).to.equal(0)
      })

      it('arrayEntry has objectKeyCount # of keys but all values are not null', () => {
        let oneObjectTwoKeyOneNullValue = [
          { first_key: [1, 2, 3, 4, 5], second_key: null },
        ]

        expect(mappableDataFilter(oneObjectTwoKeyOneNullValue, 2)).to.equal(0)
      })
    })

    describe('returns an array only containing objects with valid key counts and no null values', () => {
      it('when passed an array where only one entry is correctly setup', () => {
        const oneCorrectEntry = [
          { only_one_key: 'we need two keys' },
          { this_object_has: 'two keys', this_object_is: 'correctly setup' },
          {
            wrong: [1, 2, 3],
            also_wrong: 4,
            still_wrong: {
              key_count: 3,
            },
          },
        ]

        const correctReturnArray = [
          { this_object_has: 'two keys', this_object_is: 'correctly setup' },
        ]
        expect(mappableDataFilter(oneCorrectEntry, 2)).to.eql(
          correctReturnArray
        )
      })
    })
  })

  describe('when nodeValidation is set to true', () => {
    describe('returns 0', () => {
      it('if the filtered array has no entries', () => {
        let allNullKeyValues = [
          { sample_field: null },
          { sample_field: null },
          { sample_field: null },
          { sample_field: null },
          { sample_field: null },
        ]
        expect(mappableDataFilter(allNullKeyValues, null, true)).to.equal(0)
      })

      it('when passed an array with one object containing multiple key-value pairs and objectKeyCount is undefined', () => {
        let objectWithMultipleKeys = [
          {
            type: 'paragraph',
            text: '',
            spans: [],
          },
        ]

        expect(mappableDataFilter(objectWithMultipleKeys, null, true)).to.equal(
          0
        )
      })

      it('arrayEntry has objectKeyCount # of keys but all values are null', () => {
        let oneObjectTwoKeyAllNullValues = [
          { first_null: null, second_null: null },
        ]

        expect(
          mappableDataFilter(oneObjectTwoKeyAllNullValues, 2, true)
        ).to.equal(0)
      })

      it("arrayEntry doesn't have objectKeyCount # of keys", () => {
        let oneObjectOneKey = [{ only_key: [1, 2, 3, 4, 5] }]

        expect(mappableDataFilter(oneObjectOneKey, 2, true)).to.equal(0)
      })
    })

    describe('return a non-zero number of bad entries', () => {
      const testCaseMaker = () => {
        let testCases = []

        for (let i = 1; i <= 100; i++) {
          let validEntriesTotal = Math.ceil(Math.random() * 500) + i + 99
          let invalidEntriesTotal = i
          let testArrayLength = validEntriesTotal + invalidEntriesTotal
          let validEntry = {
            not_null: {
              sub_key: 'value',
            },
          }

          // Array of all the bad entry test cases used so far
          let badEntries = [
            {},
            '',
            42,
            undefined,
            null,
            false,
            [],
            [[]],
            [{}],
            [{}, {}, {}],
            [{ sample_field: null }],
            [
              {
                type: 'paragraph',
                text: '',
                spans: [],
              },
            ],
            [
              { sample_field: null },
              { sample_field: null },
              { sample_field: null },
              { sample_field: null },
              { sample_field: null },
            ],
          ]

          const arrayMaker = () => {
            let validCount = 0
            let invalidCount = 0
            let mixedArray = []

            while (mixedArray.length !== testArrayLength) {
              let badIndex = i % badEntries.length

              if (validCount === validEntriesTotal) {
                // Randomly select and add an invalid entry
                mixedArray.push(badEntries[badIndex])
                invalidCount++
              } else if (invalidCount === invalidEntriesTotal) {
                // Add a valid entry
                mixedArray.push(validEntry)
                validCount++
              } else {
                // Flip a numeric coin
                let validOrInvalid = Math.ceil(Math.random() * 2)

                // if 1, add invalid; if 2, add valid
                if (validOrInvalid === 1) {
                  mixedArray.push(badEntries[badIndex])
                  invalidCount++
                } else {
                  mixedArray.push(validEntry)
                  validCount++
                }
              }
            }
            return mixedArray
          }

          let testArray = arrayMaker()
          // Create an array with validEntries # of empty slots and fill each slot with valid entry
          let arrayMatch = Array(validEntriesTotal).fill(validEntry)
          // Create 100 test cases to examine
          testCases.push({
            array: testArray,
            allValid: arrayMatch,
            invalid: invalidEntriesTotal,
          })
        }

        return testCases
      }

      let hundredTestCases = testCaseMaker()

      hundredTestCases.forEach(test => {
        it(`${test.array.length} entries; ${test.invalid} invalid ${
          test.invalid === 1
            ? `entry counted and removed`
            : `entries counted and removed `
        }`, () => {
          expect(mappableDataFilter(test.array, null, true)).to.equal(
            test.invalid
          )
        })
      })
    })
  })
})
