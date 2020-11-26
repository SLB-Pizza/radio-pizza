import { expect } from 'chai'
import { cmsNodeValidator } from '../../src/utils'
import { validatorErrors } from '../../cms-json-files/index'
import testData from './cmsNodeValidator.test.json'

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
        it('Mix - `mix_image`', () => {
          const noMixImage = testData.generic.missing_image.mix
          const noMixImageResult = cmsNodeValidator(noMixImage)
          const noMixImageErrObj = {
            field: 'mix_image',
            ...validatorErrors.missing_image,
          }

          expect(noMixImageResult.priority).to.equal('danger')
          expect(noMixImageResult.errors[0]).to.eql(noMixImageErrObj)
        })

        it('Resident - `resident_image`', () => {
          const noResidentImg = testData.generic.missing_image.resident
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
        it('Mix - `mix_image.alt`', () => {
          const noAltTextMix = testData.generic.alt_text.mix
          const noAltMixResult = cmsNodeValidator(noAltTextMix)
          const noAltTextErrObj = { field: 'alt', ...validatorErrors.alt_text }

          expect(noAltMixResult.priority).to.equal('danger')
          expect(noAltMixResult.errors[0]).to.eql(noAltTextErrObj)
        })

        it('Resident - `resident_image.alt`', () => {
          const noAltResident = testData.generic.alt_text.resident
          const noAltResidentResult = cmsNodeValidator(noAltResident)
          const noAltResidentErrObj = {
            field: 'alt',
            ...validatorErrors.alt_text,
          }

          expect(noAltResidentResult.priority).to.equal('danger')
          expect(noAltResidentResult.errors[0]).to.eql(noAltResidentErrObj)
        })
      })

      describe('copyright text', () => {
        it('Mix - `mix_image.copyright`', () => {
          const noCopyrightMix = testData.generic.copyright.mix
          const noCopyrightMixResult = cmsNodeValidator(noCopyrightMix)
          const noCopyrightMixErrObj = {
            field: 'copyright',
            ...validatorErrors.copyright,
          }

          expect(noCopyrightMixResult.priority).to.equal('info')
          expect(noCopyrightMixResult.errors[0]).to.eql(noCopyrightMixErrObj)
        })

        it('Resident - `resident_image.copyright`', () => {
          const noCopyrightResident = testData.generic.copyright.resident
          const noCopyrightResidentResult = cmsNodeValidator(
            noCopyrightResident
          )
          const noCopyrightResidentErrObj = {
            field: 'copyright',
            ...validatorErrors.copyright,
          }

          expect(noCopyrightResidentResult.priority).to.equal('info')
          expect(noCopyrightResidentResult.errors[0]).to.eql(
            noCopyrightResidentErrObj
          )
        })
      })

      describe('entry date info', () => {
        it('Mix - `mix_date`', () => {
          const noDateMix = testData.generic.date.mix
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
        it('Event - `event_start`')
      })

      describe('Prismic rich text field errors', () => {
        describe('Resident', () => {
          it('`resident_blurb`', () => {
            const noResBlurb = testData.generic.rich_text_error.resident
            const noResBlurbResult = cmsNodeValidator(noResBlurb)
            const noResBlurbErrObj = {
              field: 'resident_blurb',
              level: 'blurb',
              ...validatorErrors.default_error,
            }

            expect(noResBlurbResult.priority).to.equal('danger')
            expect(noResBlurbResult.errors[0]).to.eql(noResBlurbErrObj)
          })
        })
      })

      describe('group field entry errors', () => {
        describe('Mix', () => {
          it('`featured_residents`', () => {
            const notAllGoodResidentsMix =
              testData.generic.group_field.mix.featured_residents
            const notAllGoodResMixResult = cmsNodeValidator(
              notAllGoodResidentsMix
            )
            const notAllGoodResErrObj = {
              field: 'featured_residents',
              ...validatorErrors.group_field,
            }

            expect(notAllGoodResMixResult.priority).to.equal('danger')
            expect(notAllGoodResMixResult.errors[0]).to.eql(notAllGoodResErrObj)
          })
        })

        describe('Resident', () => {
          it('`social_media`', () => {
            const incompleteSocialRes =
              testData.generic.group_field.resident.social_media
            const incSocialResResult = cmsNodeValidator(incompleteSocialRes)
            const incSocialResErrObj = {
              field: 'social_media',
              ...validatorErrors.group_field,
            }

            expect(incSocialResResult.priority).to.equal('danger')
            expect(incSocialResResult.errors[0]).to.eql(incSocialResErrObj)
          })

          it('`resident_mixes`')
        })
      })
    })

    describe('Mix specific errors', () => {
      describe('tags', () => {
        it('has no tags', () => {
          const noTagsMix = testData.mix.no_tags
          const noTagsResult = cmsNodeValidator(noTagsMix)
          const noTagsErrObj = {
            field: 'tags',
            ...validatorErrors.tags.no_tags,
          }

          expect(noTagsResult.priority).to.equal('warning')
          expect(noTagsResult.errors[0]).to.eql(noTagsErrObj)
        })

        it('has too many tags', () => {
          const tooManyTagsMix = testData.mix.too_many_tags
          const tooManyTagsResult = cmsNodeValidator(tooManyTagsMix)
          const tooManyTagsErrObj = {
            field: 'tags',
            ...validatorErrors.tags.too_many,
          }

          expect(tooManyTagsResult.priority).to.equal('warning')
          expect(tooManyTagsResult.errors[0]).to.eql(tooManyTagsErrObj)
        })
      })
      it('`mix_link` undefined', () => {
        const noMixLink = testData.mix.no_mix_link
        const noMixLinkResult = cmsNodeValidator(noMixLink)
        const noMixLinkErrObj = {
          field: 'mix_link',
          ...validatorErrors.default_error,
        }

        expect(noMixLinkResult.priority).to.equal('danger')
        expect(noMixLinkResult.errors[0]).to.eql(noMixLinkErrObj)
      })
    })

    describe('Resident specific errors', () => {
      it('`resident_name` undefined', () => {
        const noNameResident = testData.resident.has_no_name
        const noNameResResult = cmsNodeValidator(noNameResident)
        const noNameResErrObj = {
          field: 'resident_name',
          level: 'danger',
          ...validatorErrors.default_error,
        }

        expect(noNameResResult.priority).to.equal('danger')
        expect(noNameResResult.errors[0]).to.eql(noNameResErrObj)
      })
    })
  })
})
