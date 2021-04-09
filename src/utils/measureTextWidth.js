/**
 * Uses `canvas.measureText` to compute and return the width of the given text of given font in pixels.
 * @category Utilities
 * @function measureTextWidth
 * @param {Function} setStateFunc - function from the component to set a value
 * @param {String} wrapperClassName - className of the container to measure again
 * @param {String} textClassName  - className of the text to grab for measurement
 * @returns {Boolean}
 * @see {@link http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393 Calculate text width with JavaScript [specific answer]}
 * @see {@link https://jsfiddle.net/eNzjZ/70/ JSFiddle: Measuring Text Width - Canvas vs jQuery}
 */
export default function measureTextWidth(wrapperClassName, textClassName) {
  /**
   * `<UpcomingShow />`: `".upcoming-show"`
   *
   * Grab the correct DOM with the className given
   */
  const upcomingShowWidth = document.querySelector(wrapperClassName).clientWidth

  /**
   * `<UpcomingShow />`: `".upcoming-show p"`
   *
   * Focus the `<p>` tag within the correct component
   * Grab its text output and font-size
   * Create a styling string to pass to canvas text
   */
  const element = document.querySelector(textClassName)
  const text = element.innerText
  const fontSize = window
    .getComputedStyle(element)
    .getPropertyValue('font-size')
  const canvasFontStyle = `${fontSize} Poppins`

  /**
   * Grab the dummy canvas
   * Set its font-styling
   * Measure the `<p>` tag text using the canvas, round result down.
   * This dummy`<canvas>` is located in {@link TopNav}
   */
  const canvas = document.getElementById('for-text-measuring')
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
