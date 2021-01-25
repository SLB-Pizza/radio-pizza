/**
 * Slice Layout Components
 *
 * These components are the compiled layouts for the Slice choices available to the user in the Prismic CMS Slice Zone.
 */
// To be separated when used in slices like Feature
export { default as ArticleHeadline } from './ArticleHeadline'

// For regular slice zone
export { default as Blockquote } from './Blockquote'
export { default as FullWidthImage } from './FullWidthImage'
export { default as ImageRow } from './ImageRow'
export { default as OneImageAndText } from './OneImageAndText'
export { default as ParallaxHeadline } from './ParallaxHeadline'
export { default as TextBlock } from './TextBlock'
export { default as TwoImagesAndText } from './TwoImagesAndText'

/**
 * Layout Helper Components
 *
 * These helper components are the modular bits the Slice Layout Components call that allow us to provide layout variations the end user desires.
 */
export { default as ContentHelper } from './helpers/ContentHelper'
export { default as ImageHelper } from './helpers/ImageHelper'
