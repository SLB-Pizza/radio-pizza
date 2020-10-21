import React from 'react'
import { StickyFeature } from '../../src/components'
import '../../src/styles/index.scss'

export default {
  title: 'Prismic CMS Slices/Sample Layouts',
  component: StickyFeature,
}

const leadFeatureData = {
  _meta: {
    uid: 'dev-test-feature-2',
    firstPublicationDate: '2020-08-09T20:00:36+0000',
    lastPublicationDate: '2020-08-09T20:00:36+0000',
    type: 'feature',
    tags: [],
  },
  body: [
    {
      __typename: 'PRISMIC_FeatureBodyHeadline_block',
      type: 'headline_block',
      primary: {
        feature_headline_img: {
          dimensions: {
            width: 1920,
            height: 1200,
          },
          alt: null,
          copyright: null,
          url:
            'https://images.prismic.io/hmbk-cms/1f89b439-fa60-4b11-b3b1-1ad296c8721f_wallhaven-p8vj53_1920x1200.png?auto=compress,format',
        },
        feature_category: 'Events',
        feature_subcategory: 'Denali Fest',
        feature_headline: [
          {
            type: 'heading1',
            text:
              "The Mountain Awaits: Summit Fest 2025 Will Be the World's Highest Music Festival",
            spans: [],
          },
        ],
        feature_subtitle: [
          {
            type: 'heading4',
            text:
              'The air will be rich with the sound of music 3000 meters up.',
            spans: [],
          },
        ],
        feature_author_pic: {
          dimensions: {
            width: 1080,
            height: 1080,
          },
          alt: 'This is actually Albert Camus',
          copyright: null,
          url:
            'https://images.prismic.io/hmbk-cms/5574603a-80c8-400b-8b3a-34c469871a38_wallhaven-01kz39.jpg?auto=compress,format&rect=259,0,1080,1080&w=1080&h=1080',
        },
        feature_author: {
          __typename: 'PRISMIC_Staff',
          hmbk_staff_name: 'Christian Mejia',
          hmbk_staff_position: 'Super Developer',
        },
      },
    },
    {
      __typename: 'PRISMIC_FeatureBodyText',
    },
    {
      __typename: 'PRISMIC_FeatureBodyTwo_images___text',
    },
    {
      __typename: 'PRISMIC_FeatureBodyText',
    },
    {
      __typename: 'PRISMIC_FeatureBodyBlockquote',
    },
  ],
}

export const FeaturesPage = () => (
  <>
    <main style={{ backgroundColor: 'black', minHeight: '100vh' }}>
      <StickyFeature leadFeatureData={leadFeatureData} />
    </main>
  </>
)
