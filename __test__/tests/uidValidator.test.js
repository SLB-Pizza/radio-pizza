import { expect } from 'chai'
import { uidValidator } from '../../src/utils'
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

  describe('returns the default error message', () => {
    it('when _meta.type is undefined', () => {
      let nodeData = testData.no_meta

      expect(uidValidator(nodeData)).to.equal(
        "Error: Please check this entry's UID and data in the CMS."
      )
    })
  })

  describe('returns the suggested UID', () => {
    describe('for mixes without a title', () => {
      describe('with one featured resident', () => {
        it("when the UID doesn't match the mix link", () => {
          let nodeData = testData.mixes.no_title.single_resident

          expect(uidValidator(nodeData)).to.equal('jayda-b--2020-10-21')
        })
      })

      describe('with multiple featured residents', () => {
        it("when the UID doesn't match the mix link", () => {
          let nodeData = testData.mixes.no_title.multiple_residents

          expect(uidValidator(nodeData)).to.equal('jardin-infected--2020-08-02')
        })
      })
    })

    describe('for mixes that have a title', () => {
      describe('with one featured resident', () => {
        it("when the UID doesn't use the title", () => {
          let nodeData = testData.mixes.have_title.single_resident

          expect(uidValidator(nodeData)).to.equal('terraformer--2019-06-14')
        })
      })
      describe('with multiple featured residents', () => {
        it("when the UID doesn't use the title", () => {
          let nodeData = testData.mixes.have_title.multiple_residents

          expect(uidValidator(nodeData)).to.equal('silk-wave--2020-05-19')
        })
      })
    })
  })

  describe('returns 0 when the document UID matches the suggested UID', () => {
    describe('for mixes without a title', () => {
      it('with one featured resident', () => {
        let nodeData = testData.mixes.uid_match.mixes.no_title.single_resident

        expect(uidValidator(nodeData)).to.equal(0)
      })

      it('with multiple featured residents', () => {
        let nodeData =
          testData.mixes.uid_match.mixes.no_title.multiple_residents

        expect(uidValidator(nodeData)).to.equal(0)
      })
    })
    describe('for mixes that have a title', () => {
      it('with one featured resident', () => {
        let nodeData = testData.mixes.uid_match.mixes.have_title.single_resident

        expect(uidValidator(nodeData)).to.equal(0)
      })

      it('with multiple featured residents', () => {
        let nodeData =
          testData.mixes.uid_match.mixes.have_title.multiple_residents

        expect(uidValidator(nodeData)).to.equal(0)
      })
    })
  })
})
