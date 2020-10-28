import { expect } from 'chai'
import { cmsNodeValidator } from '../../src/utils'
import testData from '../cmsNodeValidatorTestData.json'

describe('cmsNodeValidator', () => {
  xdescribe('returns 0, indicating that the node is problem-free when a CMS data node', () => {
    describe("has all of its required fields filled in properly and doesn't have unaccounted data keys", () => {
      it('for mixes', () => {
        let validMix = testData.valid.mix

        expect(cmsNodeValidator(validMix)).to.equal(0)
      })
    })
  })

  describe('returns an object containing details of the issue(s) the node has', () => {
    it('for mixes with all bad residents', () => {
      let invalidMix = testData.invalid.mix.bad_resident

      expect(cmsNodeValidator(invalidMix)).to.eql({
        info: [
          {
            field: 'copyright',
            reason:
              'If possible, copyright data should be added to this image (photographer, date, location, etc). Copyright info allows for proper attribution.',
          },
        ],
        warnings: [
          { field: 'tags', reason: 'There are no tags for this mix.' },
          {
            field: 'alt',
            reason:
              'Alt text (alternative text) describes an image on a web page and is critically important to set for each image.',
          },
          {
            field: 'featured_residents',
            reason:
              'There is a problem with all residents on this mix entry. Please address immediately.',
          },
        ],
      })
    })

    it('for mixes with only one good resident', () => {
      let invalidMix = testData.invalid.mix.only_one_good_resident

      expect(cmsNodeValidator(invalidMix)).to.eql({
        info: [
          {
            field: 'copyright',
            reason:
              'If possible, copyright data should be added to this image (photographer, date, location, etc). Copyright info allows for proper attribution.',
          },
        ],
        warnings: [
          { field: 'tags', reason: 'There are no tags for this mix.' },
          {
            field: 'alt',
            reason:
              'Alt text (alternative text) describes an image on a web page and is critically important to set for each image.',
          },
          {
            field: 'featured_residents',
            reason:
              'There is a problem with 4 resident entries on this mix entry. Please address immediately.',
          },
        ],
      })
    })
  })
})
