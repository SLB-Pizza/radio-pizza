import { expect } from 'chai'
import { makeCollectionDispatch } from '../../src/utils'
import testData from '../makeCollectionDispatch.test.json'

describe.only('makeCollectionDispatch', () => {
  const soundCloudDispatch = makeCollectionDispatch(testData.soundcloud.data)
  const silkWaveDispatch = makeCollectionDispatch(testData.silk_wave.data)

  context('static values', () => {
    it('adds `isLoading: false` to the dispatch object', () => {
      expect(soundCloudDispatch.isLoading).to.be.false
      expect(silkWaveDispatch.isLoading).to.be.false
    })

    it('adds `playing: true` to the dispatch object', () => {
      expect(soundCloudDispatch.playing).to.be.true
      expect(silkWaveDispatch.playing).to.be.true
    })

    it("add the collection's title to the dispatch object", () => {
      expect(soundCloudDispatch.collection_title).to.equal(
        'Soundcloud Only Test Mix'
      )
      expect(silkWaveDispatch.collection_title).to.equal('Silk Wave')
    })

    it("add the collection's img url to the dispatch object", () => {
      expect(soundCloudDispatch.collection_img).to.equal(
        'https://images.prismic.io/hmbk-cms/4a1d841f-eabb-4a5b-8702-543499210694_pexels-richard-segal-1618606%281%29.jpg?auto=compress,format&rect=363,0,1200,1200&w=96&h=96'
      )
      expect(silkWaveDispatch.collection_img).to.equal(
        'https://images.prismic.io/hmbk-cms/daf5aa23-d013-472c-98e5-cd2b34329c65_silk-wave.jpg?auto=compress,format&rect=0,0,500,500&w=96&h=96'
      )
    })
  })

  context('processed values', () => {
    it('adds each mix link to its corresponding mix entry object in playlist array', () => {
      const soundCloudLinksArr = testData.soundcloud.linksArr

      for (let i = 0; i < soundCloudDispatch.playlist.length; i++) {
        expect(soundCloudDispatch.playlist[i].url).to.eql(soundCloudLinksArr[i])
      }

      const silkWaveLinksArr = testData.silk_wave.linksArr

      for (let i = 0; i < silkWaveDispatch.playlist.length; i++) {
        expect(silkWaveDispatch.playlist[i].url).to.eql(silkWaveLinksArr[i])
      }
    })

    // PICK UP FROM HERE
    it('adds each mix resident string to its corresponding mix entry object in playlist array', () => {
      const soundCloudResidentsArr = testData.soundcloud.residentsArr

      for (let i = 0; i < soundCloudDispatch.playlist.length; i++) {
        const residentStringTest = soundCloudResidentsArr[i]

        expect(soundCloudDispatch.playlist[i].resident).to.equal(
          residentStringTest
        )
      }

      const silkWaveSoloResident = testData.silk_wave.resident

      for (let i = 0; i < silkWaveDispatch.playlist.length; i++) {
        expect(silkWaveDispatch.playlist[i].resident).to.equal(
          silkWaveSoloResident
        )
      }
    })

    xit('returns an array of object each containing keys for url, title, img, resident, and img', () => {})
  })
})
