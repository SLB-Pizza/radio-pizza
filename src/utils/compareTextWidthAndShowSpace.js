/**
 * Uses `canvas.measureText` to compute and return the width of the given text of given font in pixels.
 * @category Utilities
 * @function compareTextWidthAndShowSpace
 * @returns {Boolean}
 * @see {@link http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393 Calculate text width with JavaScript [specific answer]}
 * @see {@link https://jsfiddle.net/eNzjZ/70/ JSFiddle: Measuring Text Width - Canvas vs jQuery}
 */
export default function compareTextWidthAndShowSpace() {
  const upcomingShowWidth = document.querySelector('.upcoming-show').clientWidth

  const element = document.querySelector('.upcoming-show p')
  const text = element.innerText
  const fontSize = window
    .getComputedStyle(element)
    .getPropertyValue('font-size')
  const canvasFontStyle = `${fontSize} Poppins`

  const canvas = document.getElementById('upcoming-measure')
  const context = canvas.getContext('2d')
  context.font = canvasFontStyle
  context.width = upcomingShowWidth
  const textWidth = Math.floor(context.measureText(text).width)

  console.log('text', textWidth + 8)
  console.log('upcomingShow', upcomingShowWidth)

  return textWidth + 8 > upcomingShowWidth
}
