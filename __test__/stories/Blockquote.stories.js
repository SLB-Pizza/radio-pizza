import React from 'react'
import { Blockquote } from '../../src/components/slices'
import '../../src/styles/index.scss'

export default {
  title: 'Prismic CMS Slices/Blockquote',
  component: Blockquote,
}

// =======================
// Mock Slice Data from CMS
// =======================

const noBGSlice = {
  primary: {
    blockquote_type: 'None: no background image; white quote text on black',
    blockquote_text: [
      {
        type: 'paragraph',
        text:
          'We are made of star stuff. We are a way for the cosmos to know itself.',
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: 'paragraph',
        text: 'Carl Sagan, Cosmos',
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url:
        'https://images.prismic.io/hmbk-cms/874d566f-66e0-491f-ab1c-3372019385f1_wallhaven-yjm67g_1920x1200.png?auto=compress,format',
    },
  },
}

const lightBGSlice = {
  primary: {
    blockquote_type: 'Light: light background image; black quote text',
    blockquote_text: [
      {
        type: 'paragraph',
        text:
          'We are made of star stuff. We are a way for the cosmos to know itself.',
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: 'paragraph',
        text: 'Carl Sagan, Cosmos',
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url: 'https://w.wallhaven.cc/full/0q/wallhaven-0qg7xq.jpg',
    },
  },
}

const darkBGSlice = {
  primary: {
    blockquote_type: 'Dark: dark background image; white quote text',
    blockquote_text: [
      {
        type: 'paragraph',
        text:
          'We are made of star stuff. We are a way for the cosmos to know itself.',
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: 'paragraph',
        text: 'Carl Sagan, Cosmos',
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url: 'https://w.wallhaven.cc/full/lq/wallhaven-lqwgdy.jpg',
    },
  },
}

const twoParagraphSlice = {
  primary: {
    blockquote_type: 'None: no background image; white quote text on black',
    blockquote_text: [
      {
        type: 'paragraph',
        text:
          'For many years, I have been moved by the blue at the far edge of what can be seen, that color of horizons, of remote mountain ranges, of anything far away. The color of that distance is the color of an emotion, the color of solitude and of desire, the color of there seen from here, the color of where you are not. And the color of where you can never go. For the blue is not in the place those miles away at the horizon, but in the atmospheric distance between you and the mountains.',
        spans: [],
      },
      {
        type: 'paragraph',
        text:
          '“Longing,” says the poet Robert Hass, “because desire is full of endless distances.” Blue is the color of longing for the distances you never arrive in, for the blue world.”',
        spans: [],
      },
    ],
    blockquote_attribution: [
      {
        type: 'paragraph',
        text: 'Rebecca Solnit, A Field Guide to Getting Lost',
        spans: [],
      },
    ],
    blockquote_bg_img: {
      url:
        'https://images.prismic.io/hmbk-cms/874d566f-66e0-491f-ab1c-3372019385f1_wallhaven-yjm67g_1920x1200.png?auto=compress,format',
    },
  },
}

// =======================
// Stories
// =======================

export const noBG = () => <Blockquote slice={noBGSlice} />

export const DarkBG = () => <Blockquote slice={darkBGSlice} />

export const LightBG = () => <Blockquote slice={lightBGSlice} />

export const TwoParagraph = () => <Blockquote slice={twoParagraphSlice} />
