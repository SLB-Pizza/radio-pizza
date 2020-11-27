import { expect } from 'chai'
import { mappableDataFilter, testCaseMaker } from '../../src/utils'
import testData from './mappableDataFilter.test.json'

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
      let nullKeyValue = testData.invalid.one_key_null_value
      expect(mappableDataFilter(nullKeyValue)).to.equal(0)
    })

    it('when passed an array with one object containing multiple key-value pairs', () => {
      let hasObjectWithMultipleKeys = testData.invalid.one_object_multiple_keys
      expect(mappableDataFilter(hasObjectWithMultipleKeys)).to.equal(0)
    })

    it('when passed an array with multiple objects, each containing a null key-value pair', () => {
      let allNullKeyValues = testData.invalid.multiple_objects_each_null_value
      expect(mappableDataFilter(allNullKeyValues)).to.equal(0)
    })
  })

  describe('returns an array only containing valid key-value pairs', () => {
    it('when passed an array where its only data object is valid', () => {
      let oneValidEntry = testData.has_valid.only_entry_is_valid
      expect(mappableDataFilter(oneValidEntry)).to.eql([
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
      ])
    })

    it('when passed an array where the first object has a null key-value pair', () => {
      let firstKeyValuePairNull = testData.has_valid.first_object_null_value

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
      let lastKeyValuePairNull = testData.has_valid.last_object_null_value

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
    let validEntry = {
      not_null: {
        sub_key: 'value',
      },
    }

    let tenSingleKeyValueCases = testCaseMaker(validEntry)

    tenSingleKeyValueCases.forEach(test => {
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
        let singleKeyObject = testData.objectKeyCount.is_two.single_key_object

        expect(mappableDataFilter(singleKeyObject, 2)).to.equal(0)
      })

      it('arrayEntry has objectKeyCount # of keys; all values are null', () => {
        let twoKeysTwoNullValues =
          testData.objectKeyCount.is_two.two_keys_two_null_values

        expect(mappableDataFilter(twoKeysTwoNullValues, 2)).to.equal(0)
      })

      it('arrayEntry has objectKeyCount # of keys; some values are null', () => {
        let oneObjectTwoKeyOneNullValue =
          testData.objectKeyCount.is_two.two_keys_one_null_value

        expect(mappableDataFilter(oneObjectTwoKeyOneNullValue, 2)).to.equal(0)
      })
    })

    describe('returns an array only containing objects with valid key counts and no null values', () => {
      it('when passed an array where only one entry is correctly setup', () => {
        const oneCorrectEntry =
          testData.objectKeyCount.is_two.three_entries_one_correct

        expect(mappableDataFilter(oneCorrectEntry, 2)).to.eql([
          { this_object_has: 'two keys', this_object_is: 'correctly setup' },
        ])
      })
    })
  })

  describe('when nodeValidation is set to true', () => {
    describe('returns 0', () => {
      it('if the filtered array has no entries', () => {
        let oneKeyNullValue = testData.invalid.one_key_null_value
        expect(mappableDataFilter(oneKeyNullValue, null, true)).to.equal(0)
      })

      it('when passed an array with one object containing multiple key-value pairs and objectKeyCount is undefined', () => {
        let oneObjectMultipleKeys = testData.invalid.one_object_multiple_keys

        expect(mappableDataFilter(oneObjectMultipleKeys, null, true)).to.equal(
          0
        )
      })

      it('arrayEntry has objectKeyCount # of keys; all values are null', () => {
        let twoKeyObjectAllNullValues = testData.invalid.two_keys_all_nulls

        expect(mappableDataFilter(twoKeyObjectAllNullValues, 2, true)).to.equal(
          0
        )
      })

      it("arrayEntry doesn't have objectKeyCount # of keys", () => {
        let oneKeyValuePairTwoNeeded = testData.invalid.one_valid_key_two_needed
        expect(mappableDataFilter(oneKeyValuePairTwoNeeded, 2, true)).to.equal(
          0
        )
      })
    })

    describe('returns the array if there are no bad entries', () => {
      it('when objectKeyCount is undefined (one key-value pair)', () => {
        const allValidOneKeyObjects =
          testData.has_valid.multiple_valid_one_key_objects

        const result = mappableDataFilter(allValidOneKeyObjects, null, true)

        expect(result).to.eql([
          { key_name: 'valid' },
          { key_name: 'valid' },
          { key_name: 'valid' },
          { key_name: 'valid' },
          { key_name: 'valid' },
          { key_name: 'valid' },
        ])
      })

      it('when objectKeyCount is defined', () => {
        const multipleValidOneKeyObjects =
          testData.has_valid.three_keys_all_valid_objects

        const result = mappableDataFilter(multipleValidOneKeyObjects, 3, true)

        expect(result).to.eql([
          {
            first_key: 'valid',
            second_key: 12345,
            third_key: [1, 2, 3, 4, 5],
          },
          {
            first_key: 'second valid',
            second_key: 23456,
            third_key: [2, 3, 4, 5, 6],
          },
        ])
      })
    })

    describe('return a non-zero number of bad entries', () => {
      describe('when objectKeyCount is undefined (one key-value pair)', () => {
        let oneKeyValidEntry = {
          first: {
            sub_key: 'value',
          },
        }
        let nodeValidationSingleKeyCases = testCaseMaker(oneKeyValidEntry)

        nodeValidationSingleKeyCases.forEach(test => {
          it(`${test.array.length} entries; ${test.invalid} invalid ${
            test.invalid === 1 ? `entry counted` : `entries counted `
          }`, () => {
            expect(mappableDataFilter(test.array, null, true)).to.equal(
              test.invalid
            )
          })
        })
      })

      describe('when objectKeyCount is defined', () => {
        let twoKeysValidEntry = {
          first: {
            sub_key: 'value',
          },
          second: [1, 3, 5, 7, 9],
        }

        let nodeValidationMultipleKeyCases = testCaseMaker(twoKeysValidEntry)

        nodeValidationMultipleKeyCases.forEach(test => {
          it(`${test.array.length} entries; ${test.invalid} invalid ${
            test.invalid === 1 ? `entry counted` : `entries counted `
          }`, () => {
            expect(mappableDataFilter(test.array, 2, true)).to.equal(
              test.invalid
            )
          })
        })
      })
    })
  })
})
