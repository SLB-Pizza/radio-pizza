/**
 * Uses `canvas.measureText` to compute and return the width of the given text of given font in pixels.
 * @category Utilities
 * @function measureTextWidth
 * @param {Function} setStateFunc - function from the component to set a value
 * @returns {Boolean}
 * @see {@link http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393 Calculate text width with JavaScript [specific answer]}
 * @see {@link https://jsfiddle.net/eNzjZ/70/ JSFiddle: Measuring Text Width - Canvas vs jQuery}
 */
export default function measureTextWidth() {
  /**
   * Grab the `.upcoming-show` div's width
   */
  const upcomingShowWidth = document.querySelector('.upcoming-show').clientWidth

  /**
   * Focus the `<p>` tag within `.upcoming-show`
   * Grab its text output and font-size
   * Create a styling string to pass to canvas text
   */
  const element = document.querySelector('.upcoming-show p')
  const text = element.innerText
  const fontSize = window
    .getComputedStyle(element)
    .getPropertyValue('font-size')
  const canvasFontStyle = `${fontSize} Poppins`

  /**
   * Grab the dummy canvas
   * Set its font-styling
   * Measure the `<p>` tag text using the canvas, round result down.
   */
  const canvas = document.getElementById('upcoming-measure')
  const context = canvas.getContext('2d')
  context.font = canvasFontStyle
  const textWidth = Math.floor(context.measureText(text).width)

  /**
   * Numbers to add to `textWidth` to reach match pixel right edge of `upcomingShowWidth`:
   * <p className="title"> : 35
   * <p className="subtitle"> : 10
   */
  return textWidth + 35 > upcomingShowWidth
}
