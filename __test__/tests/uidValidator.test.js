import { expect } from 'chai'
import { uidValidator } from '../../src/utils'
import { validatorErrors } from '../../cms-json-files'
import testData from '../uidValidatorTestData.json'
import axios from 'axios'

describe('uidValidator', () => {
  // before(() => {
  //   axios
  //     .get("https://api.mockaroo.com/api/854b5590?count=1&key=86ac0700")
  //     .then((response) => {
  //       let test1 = response.data;
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // The request was made and the server responded with a status code
  //         // that falls out of the range of 2xx
  //         console.error(error.response.data);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //         // http.ClientRequest in node.js
  //         console.error(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.error(error.message);
  //       }
  //       console.error(error.config);
  //     });
  // });

  // describe("returns 0", () => {
  //   it("when the uid doesn't match the link", () => {
  //     let uid = "abcdefg";
  //     let nodeData = "123456";

  //     expect(uidValidator(uid, nodeData)).to.equal(0);
  //   });
  // });

  describe('returns the correct message', () => {
    it('telling the user to check the CMS entry when _meta.type is undefined', () => {
      let nodeData = testData.no_meta
      let errorObj = validatorErrors.uid.no_meta

      expect(uidValidator(nodeData)).to.eql(errorObj)
    })

    describe('telling the user to delete', () => {
      it('a dev mix entry', () => {
        let nodeData = testData.dev_entries.mix

        expect(uidValidator(nodeData)).to.eql({
          type: 'danger',
          reason: 'Dummy CMS Entry',
          result:
            'This entry was created as a development aide. Remember to delete immediately before launch.',
          entry: 'httpswww.youtube.comwatch?v=q9xtqqbuavi',
          showCode: true,
        })
      })
    })
  })

  describe('returns the suggested UID with reason for the issue', () => {
    describe('for mixes', () => {
      describe('without a title with one featured resident', () => {
        it("if the UID doesn't follow the suggested Mix UID structure", () => {
          let nodeData = testData.mixes.no_title.single_resident.bad_structure
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            entry: 'https://soundcloud.com/jayda_b/waxx-fm-vol-4-62719',
            reason: 'UID does not follow suggested Mix UID structure.',
            result: 'jayda-b--2020-10-21',
          })
        })
        it('if the UID was auto-created by Prismic by stripping the mix link', () => {
          let nodeData = testData.mixes.no_title.single_resident.auto_created
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            entry: 'https://soundcloud.com/jayda_b/waxx-fm-vol-4-62719',
            reason: 'UID auto-created by Prismic from mix link.',
            result: 'jayda-b--2020-10-21',
          })
        })
      })

      describe('without a title with multiple featured residents', () => {
        it("if the UID doesn't follow the suggested Mix UID structure", () => {
          let nodeData =
            testData.mixes.no_title.multiple_residents.bad_structure
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID does not follow suggested Mix UID structure.',
            entry: 'https://www.youtube.com/watch?v=Q9XTqQbuavI',
            result: 'jardin-infected--2020-08-02',
          })
        })
        it('if the UID was auto-created by Prismic by stripping the mix link', () => {
          let nodeData = testData.mixes.no_title.multiple_residents.auto_created
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID auto-created by Prismic from mix link.',
            entry: 'https://www.youtube.com/watch?v=Q9XTqQbuavI',
            result: 'jardin-infected--2020-08-02',
          })
        })
      })

      describe('that have a title with one featured resident', () => {
        it("if the UID doesn't follow the suggested Mix UID structure", () => {
          let nodeData = testData.mixes.have_title.single_resident.bad_structure
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID does not follow suggested Mix UID structure.',
            entry: 'Terraformer',
            result: 'terraformer--2019-06-14',
          })
        })
        it('if the UID was auto-created by Prismic by stripping the mix link', () => {
          let nodeData = testData.mixes.have_title.single_resident.auto_created
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID auto-created by Prismic from mix link.',
            entry: 'Terraformer',
            result: 'terraformer--2019-06-14',
          })
        })
      })

      describe('that have a title with multiple featured residents', () => {
        it("if the UID doesn't follow the suggested Mix UID structure", () => {
          let nodeData =
            testData.mixes.have_title.multiple_residents.bad_structure
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID does not follow suggested Mix UID structure.',
            entry: 'Silk Wave',
            result: 'silk-wave--2020-05-19',
          })
        })
        it('if the UID was auto-created by Prismic by stripping the mix link', () => {
          let nodeData =
            testData.mixes.have_title.multiple_residents.auto_created
          expect(uidValidator(nodeData)).to.eql({
            type: 'warning',
            reason: 'UID auto-created by Prismic from mix link.',
            entry: 'Silk Wave',
            result: 'silk-wave--2020-05-19',
          })
        })
      })
    })
  })

  describe('returns 0', () => {
    describe("for doc types that don't need validation", () => {
      Object.values(testData.no_validation_needed).forEach(ignorableEntry => {
        it(`${ignorableEntry._meta.type} CMS entries`, () => {
          let nodeData = ignorableEntry
          expect(uidValidator(nodeData)).to.equal(0)
        })
      })
    })

    describe('when the document UID matches the suggested UID', () => {
      describe('for mixes without a title', () => {
        it('with one featured resident', () => {
          let nodeData = testData.uid_match.mixes.no_title.single_resident
          expect(uidValidator(nodeData)).to.equal(0)
        })

        it('with multiple featured residents', () => {
          let nodeData = testData.uid_match.mixes.no_title.multiple_residents
          expect(uidValidator(nodeData)).to.equal(0)
        })
      })
      describe('for mixes that have a title', () => {
        it('with one featured resident', () => {
          let nodeData = testData.uid_match.mixes.have_title.single_resident
          expect(uidValidator(nodeData)).to.equal(0)
        })

        it('with multiple featured residents', () => {
          let nodeData = testData.uid_match.mixes.have_title.multiple_residents
          expect(uidValidator(nodeData)).to.equal(0)
        })
      })
    })
  })
})
