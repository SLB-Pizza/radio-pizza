import React from 'react'
import { OneImageAndText } from '../../src/components/slices'
import '../../src/styles/index.scss'

export default {
  title: 'Prismic CMS Slices/One Image and Text',
  component: OneImageAndText,
}

const leftText = {
  __typename: 'PRISMIC_SupportBodyOne_image_and_text',
  type: 'one_image_and_text',
  primary: {
    oiat_layout: 'Left: Text-Image',
    oiat_text: [
      {
        type: 'paragraph',
        text:
          'This text section is on the left side of the image on tablets and larger screens and above the image on mobile devices.',
        spans: [
          {
            start: 28,
            end: 50,
            type: 'strong',
          },
          {
            start: 54,
            end: 80,
            type: 'em',
          },
          {
            start: 85,
            end: 100,
            type: 'strong',
          },
          {
            start: 104,
            end: 119,
            type: 'em',
          },
        ],
      },
      {
        type: 'paragraph',
        text:
          'Andromeda aries auriga camelopardalis cancer canes venatici centaurus  cepheus columba corona austrina eridanus hercules lacerta leo leo minor  lupus lyra norma octans ophiuchus pisces pyxis scorpius sculptor scutum  taurus tucana vela virgo. Andromeda cetus corona borealis cygnus  delphinus indus lepus ophiuchus pyxis sculptor tucana ursa major vela.  Caelum camelopardalis canes venatici canis major cassiopeia corona  borealis crater crux cygnus dorado gemini grus hydra hydrus leo lepus  lupus monoceros octans perseus puppis scorpius triangulum triangulum  australe.',
        spans: [],
      },
    ],
    oiat_img: {
      dimensions: {
        width: 1920,
        height: 1080,
      },
      alt: 'Porsche 911 RWB',
      copyright: null,
      url: 'https://w.wallhaven.cc/full/6k/wallhaven-6kqgmx.jpg',
    },
  },
}

const rightText = {
  __typename: 'PRISMIC_SupportBodyOne_image_and_text',
  type: 'one_image_and_text',
  primary: {
    oiat_layout: 'Right: Image-Text',
    oiat_text: [
      {
        type: 'paragraph',
        text:
          'This text section is on the right side of the image on tablets and larger screens and below the image on mobile devices.',
        spans: [
          {
            start: 28,
            end: 51,
            type: 'strong',
          },
          {
            start: 55,
            end: 81,
            type: 'em',
          },
          {
            start: 86,
            end: 101,
            type: 'strong',
          },
          {
            start: 105,
            end: 120,
            type: 'em',
          },
        ],
      },
      {
        type: 'paragraph',
        text:
          'Andromeda aries auriga camelopardalis cancer canes venatici centaurus  cepheus columba corona austrina eridanus hercules lacerta leo leo minor  lupus lyra norma octans ophiuchus pisces pyxis scorpius sculptor scutum  taurus tucana vela virgo. Andromeda cetus corona borealis cygnus  delphinus indus lepus ophiuchus pyxis sculptor tucana ursa major vela.  Caelum camelopardalis canes venatici canis major cassiopeia corona  borealis crater crux cygnus dorado gemini grus hydra hydrus leo lepus  lupus monoceros octans perseus puppis scorpius triangulum triangulum  australe.',
        spans: [],
      },
    ],
    oiat_img: {
      dimensions: {
        width: 2560,
        height: 1440,
      },
      alt: 'Porsche 911 RWB',
      copyright: null,
      url: 'https://w.wallhaven.cc/full/6k/wallhaven-6kqgmx.jpg',
    },
  },
}

export const TextOnLeftSide = () => <OneImageAndText slice={leftText} />

export const TextOnRightSide = () => <OneImageAndText slice={rightText} />
