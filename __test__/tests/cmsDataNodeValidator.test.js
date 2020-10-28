import { expect } from 'chai'
import { cmsNodeValidator } from '../../src/utils'
import testData from '../cmsNodeValidatorTestData.json'

describe('cmsNodeValidator', () => {
  describe('returns 0, indicating that the node is problem-free when a CMS data node', () => {
    it("has all of its required fields filled in properly and doesn't have unaccounted data keys", () => {
      expect(cmsNodeValidator()).to.equal(0)
    })
  })
})
