import React from 'react'
import { FullWidthImage } from '../../src/components/slices'
import '../../src/styles/index.scss'

export default {
  title: 'Prismic CMS Slices/Full Width Image',
  component: FullWidthImage,
}

const bgURL =
  'https://images.prismic.io/hmbk-cms/3665ac51-0ceb-4701-9e54-1a3699401d13_wallhaven-vm2o9m.jpg?auto=compress,format'

export const Short = () => (
  <FullWidthImage
    type={'short'}
    data={'Short Full Width Image'}
    bgUrl={bgURL}
  />
)
export const Medium = () => (
  <FullWidthImage
    type={'medium'}
    data={'Medium Full Width Image'}
    bgUrl={bgURL}
  />
)
export const Tall = () => (
  <FullWidthImage type={'tall'} data={'Tall Full Width Image'} bgUrl={bgURL} />
)
