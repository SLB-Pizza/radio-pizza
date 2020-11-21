import { expect } from 'chai'
import { cmsNodeValidator } from '../../src/utils'
import { validatorErrors } from '../../cms-json-files/index'
import testData from '../cmsNodeValidator.test.json'

describe('cmsNodeValidator', () => {
  xdescribe('returns 0, indicating that the node is problem-free when a CMS data node', () => {
    describe("has all of its required fields filled in properly and doesn't have unaccounted data keys", () => {
      it('for mixes', () => {
        let validMix = testData.valid.mix

        expect(cmsNodeValidator(validMix)).to.equal(0)
      })
    })
  })

  describe('returns a notices object containing node issue details', () => {
    describe('with the correct priority', () => {})

    describe('generic entry errors', () => {
      describe('missing image', () => {
        it('mixes', () => {
          const noMixImage = testData.invalid.generic.missing_image.mix
          const noMixImageResult = cmsNodeValidator(noMixImage)
          const noMixImageErrObj = {
            field: 'mix_image',
            ...validatorErrors.missing_image,
          }

          expect(noMixImageResult.priority).to.equal('danger')
          expect(noMixImageResult.errors[0]).to.eql(noMixImageErrObj)
        })

        it.only('resident', () => {
          const noResidentImg = testData.invalid.generic.missing_image.resident
          const noResidentImgResult = cmsNodeValidator(noResidentImg)
          const noResidentImgErrObj = {
            field: 'resident_image',
            ...validatorErrors.missing_image,
          }

          expect(noResidentImgResult.priority).to.equal('danger')
          expect(noResidentImgResult.errors[0]).to.eql(noResidentImgErrObj)
        })
      })

      describe('image alt text', () => {
        it('mixes', () => {
          const noAltTextMix = testData.invalid.generic.alt_text.mix
          const noAltMixResult = cmsNodeValidator(noAltTextMix)
          const noAltTextErrObj = { field: 'alt', ...validatorErrors.alt_text }

          expect(noAltMixResult.priority).to.equal('danger')
          expect(noAltMixResult.errors[0]).to.eql(noAltTextErrObj)
        })
      })

      describe('copyright text', () => {
        it('mixes', () => {
          const noCopyrightMix = testData.invalid.generic.copyright.mix
          const noCopyrightMixResult = cmsNodeValidator(noCopyrightMix)
          const noCopyrightMixErrObj = {
            field: 'copyright',
            ...validatorErrors.copyright,
          }

          expect(noCopyrightMixResult.priority).to.equal('info')
          expect(noCopyrightMixResult.errors[0]).to.eql(noCopyrightMixErrObj)
        })
      })

      describe('entry date', () => {
        it('mixes', () => {
          const noDateMix = testData.invalid.generic.date.mix
          const noDateMixResult = cmsNodeValidator(noDateMix)
          const noDateMixErrObj = {
            field: 'mix_date',
            instructions:
              "Open the CMS and please add a date to this entry's field: " +
              'mix_date',
            ...validatorErrors.date,
          }

          expect(noDateMixResult.priority).to.equal('danger')
          expect(noDateMixResult.errors[0]).to.eql(noDateMixErrObj)
        })
        it('events')
      })

      describe('residents group field', () => {
        describe('zero good residents', () => {
          it('mixes', () => {
            const noResidentMix =
              testData.invalid.generic.resident_group.mix.zero_good
            const noResidentMixResult = cmsNodeValidator(noResidentMix)
            const noResidentMixErrObj = {
              field: 'featured_residents',
              ...validatorErrors.residents_group_error,
            }

            expect(noResidentMixResult.priority).to.equal('danger')
            expect(noResidentMixResult.errors[0]).to.eql(noResidentMixErrObj)
          })
        })

        describe('not all residents good', () => {
          it('mixes', () => {
            const notAllGoodResidentsMix =
              testData.invalid.generic.resident_group.mix.not_all_good
            const notAllGoodResMixResult = cmsNodeValidator(
              notAllGoodResidentsMix
            )
            const notAllGoodResErrObj = {
              field: 'featured_residents',
              ...validatorErrors.residents_group_error,
            }

            expect(notAllGoodResMixResult.priority).to.equal('danger')
            expect(notAllGoodResMixResult.errors[0]).to.eql(notAllGoodResErrObj)
          })
        })
      })
    })

    describe('mix specific errors', () => {
      describe('tags', () => {
        it('has no tags', () => {
          const noTagsMix = testData.invalid.mix.no_tags
          const noTagsResult = cmsNodeValidator(noTagsMix)
          const noTagsErrObj = {
            field: 'tags',
            ...validatorErrors.tags.no_tags,
          }

          expect(noTagsResult.priority).to.equal('warning')
          expect(noTagsResult.errors[0]).to.eql(noTagsErrObj)
        })

        it('has too many tags', () => {
          const tooManyTagsMix = testData.invalid.mix.too_many_tags
          const tooManyTagsResult = cmsNodeValidator(tooManyTagsMix)
          const tooManyTagsErrObj = {
            field: 'tags',
            ...validatorErrors.tags.too_many,
          }

          expect(tooManyTagsResult.priority).to.equal('warning')
          expect(tooManyTagsResult.errors[0]).to.eql(tooManyTagsErrObj)
        })
      })
      it('has no mix_link defined', () => {
        const noMixLink = testData.invalid.mix.no_mix_link
        const noMixLinkResult = cmsNodeValidator(noMixLink)
        const noMixLinkErrObj = {
          field: 'mix_link',
          ...validatorErrors.default_error,
        }

        expect(noMixLinkResult.priority).to.equal('danger')
        expect(noMixLinkResult.errors[0]).to.eql(noMixLinkErrObj)
      })
    })
  })
})

// import { expect } from "chai";
// import { cmsNodeValidator } from "../../src/utils";
// import testData from "../cmsNodeValidatorTestData.json";

// describe("cmsNodeValidator", () => {
//   xdescribe("returns 0, indicating that the node is problem-free when a CMS data node", () => {
//     describe("has all of its required fields filled in properly and doesn't have unaccounted data keys", () => {
//       it("for mixes", () => {
//         let validMix = testData.valid.mix;

//         expect(cmsNodeValidator(validMix)).to.equal(0);
//       });
//     });
//   });

//   describe.only("returns an object containing details of the issue(s) the node has", () => {
//     it("for mixes with all bad residents", () => {
//       let invalidMix = testData.invalid.mix.bad_resident;

//       expect(cmsNodeValidator(invalidMix)).to.eql({
//         info: [
//           {
//             field: "copyright",
//             reason:
//               "If possible, copyright data should be added to this image (photographer, date, location, etc). Copyright info allows for proper attribution.",
//           },
//         ],
//         warnings: [
//           { field: "tags", reason: "There are no tags for this mix." },
//           {
//             field: "alt",
//             reason:
//               "Alt text (alternative text) describes an image on a web page and is critically important to set for each image.",
//           },
//           {
//             field: "featured_residents",
//             reason:
//               "There is a problem with all residents on this mix entry. Please address immediately.",
//           },
//         ],
//       });
//     });

//     it("for mixes with only one good resident", () => {
//       let invalidMix = testData.invalid.mix.only_one_good_resident;

//       expect(cmsNodeValidator(invalidMix)).to.eql({
//         info: [
//           {
//             field: "copyright",
//             reason:
//               "If possible, copyright data should be added to this image (photographer, date, location, etc). Copyright info allows for proper attribution.",
//           },
//         ],
//         warnings: [
//           { field: "tags", reason: "There are no tags for this mix." },
//           {
//             field: "alt",
//             reason:
//               "Alt text (alternative text) describes an image on a web page and is critically important to set for each image.",
//           },
//           {
//             field: "featured_residents",
//             reason:
//               "There is a problem with 4 resident entries on this mix entry. Please address immediately.",
//           },
//         ],
//       });
//     });
//   });
// });
