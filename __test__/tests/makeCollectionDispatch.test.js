import { expect } from 'chai'
import { isEqual } from 'lodash'
import { makeCollectionDispatch } from '../../src/utils'
import testData from './makeCollectionDispatch.test.json'

describe('makeCollectionDispatch', () => {
  const soundCloudDispatch = makeCollectionDispatch(testData.soundcloud.data)
  const silkWaveDispatch = makeCollectionDispatch(testData.silk_wave.data)

  describe('the dispatch object', () => {
    it('has the correct structure', () => {
      const propertyList = [
        'isLoading',
        'playing',
        'title',
        'img',
        'playlist',
        'url',
        'resident',
      ]

      propertyList.forEach(property => {
        expect(soundCloudDispatch).to.have.property(property)
      })

      propertyList.forEach(property => {
        expect(silkWaveDispatch).to.have.property(property)
      })
    })

    context('sets static values (shuffle does NOT matter)', () => {
      it('`isLoading: false`', () => {
        expect(soundCloudDispatch.isLoading).to.be.false
        expect(silkWaveDispatch.isLoading).to.be.false
      })

      it('`playing: true`', () => {
        expect(soundCloudDispatch.playing).to.be.true
        expect(silkWaveDispatch.playing).to.be.true
      })

      it('`title: collection_title`', () => {
        expect(soundCloudDispatch.title).to.equal('Soundcloud Only Test Mix')
        expect(silkWaveDispatch.title).to.equal('Silk Wave')
      })

      it('`img: collection_img.now_playing.url`', () => {
        expect(soundCloudDispatch.img).to.equal(
          'https://images.prismic.io/hmbk-cms/4a1d841f-eabb-4a5b-8702-543499210694_pexels-richard-segal-1618606%281%29.jpg?auto=compress,format&rect=363,0,1200,1200&w=96&h=96'
        )
        expect(silkWaveDispatch.img).to.equal(
          'https://images.prismic.io/hmbk-cms/daf5aa23-d013-472c-98e5-cd2b34329c65_silk-wave.jpg?auto=compress,format&rect=0,0,500,500&w=96&h=96'
        )
      })

      it('`url` from first entry in dispatch playlist', () => {
        // SoundCloud isn't shuffled; compare with static value
        const firstUnshuffledURL = testData.soundcloud.linksArr[0]
        expect(soundCloudDispatch.playlist[0].url).to.equal(firstUnshuffledURL)

        // Silk Wave is shuffled; use dynamic value
        // Grab first url from first .playlist mix object
        // Use it to compare to .url
        const firstShuffledURL = silkWaveDispatch.playlist[0].url
        expect(silkWaveDispatch.url).to.equal(firstShuffledURL)
      })

      it('`resident` from first entry in dispatch playlist', () => {
        // SoundCloud isn't shuffled; compare with static value
        const firstUnshuffledResident = testData.soundcloud.residentsArr[0]
        expect(soundCloudDispatch.playlist[0].resident).to.equal(
          firstUnshuffledResident
        )

        // Silk Wave is shuffled; use dynamic value
        // Grab first resident from first .playlist mix object
        // Use it to compare to .resident
        const firstShuffledResident = silkWaveDispatch.playlist[0].resident
        expect(silkWaveDispatch.resident).to.equal(firstShuffledResident)
      })
    })

    describe('has processed values (shuffle DOES matter)', () => {
      context('when the mix is not shuffled', () => {
        it('contains the right number of mix entry objects', () => {
          const numberOfEntriesInTestData =
            testData.soundcloud.data.collection_playlist.length

          const numberOfEntriesInDispatch = soundCloudDispatch.playlist.length

          expect(numberOfEntriesInDispatch).to.equal(numberOfEntriesInTestData)
        })

        it('adds each mix link to its corresponding mix entry object in playlist array', () => {
          const soundCloudLinksArr = testData.soundcloud.linksArr

          // Loop over soundcloud dispatch playlist array
          for (let i = 0; i < soundCloudDispatch.playlist.length; i++) {
            const currentDispatchUrl = soundCloudDispatch.playlist[i].url
            const currentTestUrl = soundCloudLinksArr[i]

            expect(currentDispatchUrl).to.eql(currentTestUrl)
          }
        })

        it('adds each mix resident string to its corresponding mix entry object in playlist array', () => {
          const soundCloudResidentsArr = testData.soundcloud.residentsArr

          // Loop over soundcloud dispatch playlist array
          for (let i = 0; i < soundCloudDispatch.playlist.length; i++) {
            const currentDispatchResidentString =
              soundCloudDispatch.playlist[i].resident
            const currentTestResidentString = soundCloudResidentsArr[i]

            expect(currentDispatchResidentString).to.equal(
              currentTestResidentString
            )
          }
        })
      })

      context('when the mix is shuffled', () => {
        it('contains the right number of mix entry objects', () => {
          const numberOfTestDataMixes =
            testData.silk_wave.data.collection_playlist.length

          const numberOfDispatchMixEntries = silkWaveDispatch.playlist.length

          expect(numberOfDispatchMixEntries).to.equal(numberOfTestDataMixes)
        })

        it('adds each mix link to its corresponding mix entry object in playlist array', () => {
          // The Silk Wave collection has shuffle_mix_order === true, so we cannot loop over one of the arrays and use index as the pointer for direct === comparison. Gotta make an array from each mixObject's URL in dispatch playlist
          function allShuffledMixLinksExist() {
            const silkWaveLinksArr = testData.silk_wave.linksArr

            // Create an array of the dispatch mix URLs
            let dispatchMixLinks = []
            silkWaveDispatch.playlist.forEach(mix =>
              dispatchMixLinks.push(mix.url)
            )

            // Every link in the base links array should be present in the dispatchMixLinks array
            return silkWaveLinksArr.every(link =>
              dispatchMixLinks.includes(link)
            )
          }
          expect(allShuffledMixLinksExist()).to.be.true
        })

        it('adds each mix resident string to its corresponding mix entry object in playlist array', () => {
          const silkWaveSoloResident = testData.silk_wave.resident

          for (let i = 0; i < silkWaveDispatch.playlist.length; i++) {
            expect(silkWaveDispatch.playlist[i].resident).to.equal(
              silkWaveSoloResident
            )
          }
        })

        it('shuffles the mix entries each time playlistShuffle is called', () => {
          function shuffleTester() {
            let basePlaylistArray = []

            // Default to true; compare equality with shuffled array
            let allPlaylistsSameOrder = true

            // Create a base playlist array from the test data
            testData.silk_wave.linksArr.forEach(link => {
              let playlistObject = {
                url: link,
                resident: testData.silk_wave.resident,
              }
              basePlaylistArray.push(playlistObject)
            })

            // Create array of 10 dispatches; grab the playlist and compare it to the base array
            for (let i = 0; i < 100; i++) {
              const dispatchWithShuffledArr = makeCollectionDispatch(
                testData.silk_wave.data
              )

              // Compare base playlist and current dispatch playlist
              const samePlaylistOrder = isEqual(
                basePlaylistArray,
                dispatchWithShuffledArr.playlist
              )

              // Reassign allPlaylistSameOrder by AND'ing both booleans
              allPlaylistsSameOrder = allPlaylistsSameOrder && samePlaylistOrder
            }

            /**
             * The idea of this test is that even if playlistShuffle happens to return the playlist array in the same order multiple times over the course of the loop, once samePlaylistOrder is "false", allPlaylistOrder can never be true again.
             *
             * ```
             * allPlaylistSameOrder = true
             * samePlaylistOrder = true
             *
             * true && true -> true
             *  .
             *  .
             *  .
             * samePlaylistOrder = false
             *
             * true && false -> false
             *
             * Even if each other playlist is returned in the same order somehow after that false run,
             *
             * false && true -> false
             * ```
             */
            return allPlaylistsSameOrder
          }

          expect(shuffleTester()).to.be.false
        })
      })
    })
  })
})
