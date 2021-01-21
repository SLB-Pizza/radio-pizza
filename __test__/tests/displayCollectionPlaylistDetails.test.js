import { displayCollectionPlaylistDetails } from '../../src/utils'
import { expect } from 'chai'
import testData from './displayCollectionPlaylistDetails.test.json'

describe('displayCollectionPlaylistDetails', () => {
  describe('returns an object that contains', () => {
    describe('a mixes array containing one link from each mix in the playlist', () => {
      it('when each mix link is unique', () => {
        const allUniqueMixes = displayCollectionPlaylistDetails(
          testData.mixes.all_unique_mixes
        )

        expect(allUniqueMixes.mixes).to.eql([
          'https://soundcloud.com/rolandjones/murda-season-chapter-iii',
          'https://soundcloud.com/jayda_b/waxx-fm-vol-4-62719',
          'https://soundcloud.com/dave-aliveintheory/russian-hard-bass-2019-live-mix-by-dj-slavine',
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
          'https://soundcloud.com/jardindelacroixofficial/sets/letargo-6',
        ])
      })
      it('when there are duplicate mix links', () => {
        const twoAlternatingMixes = displayCollectionPlaylistDetails(
          testData.mixes.two_alternating_mixes
        )

        expect(twoAlternatingMixes.mixes).to.eql([
          'https://soundcloud.com/rolandjones/murda-season-chapter-iii',
          'https://soundcloud.com/jayda_b/waxx-fm-vol-4-62719',
          'https://soundcloud.com/rolandjones/murda-season-chapter-iii',
          'https://soundcloud.com/jayda_b/waxx-fm-vol-4-62719',
          'https://soundcloud.com/rolandjones/murda-season-chapter-iii',
        ])
      })
      it('when all mix links are the same', () => {
        const allSameMixLinks = displayCollectionPlaylistDetails(
          testData.mixes.all_the_same_mix
        )

        expect(allSameMixLinks.mixes).to.eql([
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
          'https://soundcloud.com/thank-you-scientist/sets/terraformer-3',
        ])
      })
    })

    describe('a tags array containing', () => {
      it("no tags when the mixes in the playlist don't have tags", () => {
        const noTagMixes = displayCollectionPlaylistDetails(
          testData.tags.no_tag_mixes
        )
        expect(noTagMixes.tags).to.eql([])
      })

      it("all tags from all mixes in the playlist if they're all unique", () => {
        const oneTagMixes = displayCollectionPlaylistDetails(
          testData.tags.one_tag_mixes
        )
        expect(oneTagMixes.tags).to.eql([
          'hip-hop',
          'rap',
          'hardbass',
          'prog rock',
          'math rock',
        ])
      })
      it('only the unique tags from the mixes in the playlist', () => {
        const onlyUniqueTags = displayCollectionPlaylistDetails(
          testData.tags.multi_tag_mixes
        )

        expect(onlyUniqueTags.tags).to.eql([
          'hip-hop',
          'rap',
          'hardbass',
          'electronic',
          'vocals',
          'live set',
          'one really long tag',
          'instrumental',
          'post rock',
          'prog rock',
          'math rock',
        ])
      })
    })

    describe('a residents array containing', () => {
      it('a resident from each mix if all residents are unique', () => {
        const allUniqueResidents = displayCollectionPlaylistDetails(
          testData.residents.all_unique_residents
        )

        expect(allUniqueResidents.residents).to.eql([
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Roland Jones',
            _meta: {
              uid: 'roland-jones',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Jayda B',
            _meta: {
              uid: 'jayda-b',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name:
              'DJ Slavine | TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- | TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- | TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- | TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this --- TEST TEXT truncate this ---',
            _meta: {
              uid: 'dev-resident-dj-slavine',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Thank You Scientist',
            _meta: {
              uid: 'dev-res-thank-you-scientist',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Jardin de la Croix',
            _meta: {
              uid: 'dev-resident-jardin-de-la-croix',
              type: 'resident',
            },
          },
        ])
      })
      it('all residents from each mix if all there more than one per mix and all are unique', () => {
        const multipleResidentsPerMix = displayCollectionPlaylistDetails(
          testData.residents.two_mixes_four_residents
        )

        expect(multipleResidentsPerMix.residents).to.eql([
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Jayda B',
            _meta: {
              uid: 'jayda-b',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Roland Jones',
            _meta: {
              uid: 'roland-jones',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Thank You Scientist',
            _meta: {
              uid: 'dev-res-thank-you-scientist',
              type: 'resident',
            },
          },
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'Jardin de la Croix',
            _meta: {
              uid: 'dev-resident-jardin-de-la-croix',
              type: 'resident',
            },
          },
        ])
      })
      it('only one resident if each mix features the same resident', () => {
        const allSameResident = displayCollectionPlaylistDetails(
          testData.residents.all_mixes_same_resident
        )
        expect(allSameResident.residents).to.eql([
          {
            __typename: 'PRISMIC_Resident',
            resident_name: 'KOAN Sound',
            _meta: {
              uid: 'dev-res-koan-sound',
              type: 'resident',
            },
          },
        ])
      })
    })
  })
})
