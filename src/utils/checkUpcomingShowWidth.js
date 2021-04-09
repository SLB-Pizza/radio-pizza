import { measureTextWidth } from './index'

/**
 * Receives the local setState function and current state value from UpcomingShow component using {@link measureTextWidth} result. Returned by another function in local useEffect, which is then debounced, to be called by a `resize` triggered `addEventListener`.
 * Called by: {@link UpcomingShowFallbackMessage},
 * @category Utilities
 * @function checkUpcomingShowWidth
 * @param {Boolean} stateValue - dictates whether marquee className should be applied
 * @param {String} wrapperClassName - className of the container to measure again
 * @param {String} textClassName  - className of the text to grab for measurement
 * @param {Function} setStateFunc - function from UpcomingShow component to set local state using {@link measureTextWidth} result.
 * @param {String}
 * @example
 * useEffect(() => {
 *  const stateLoadedFunction = () =>
 *    checkUpcomingShowWidth(activeMarquee, setActiveMarquee)
 *
 *  const debouncedWidthCheck = debounce(stateLoadedFunction, 500)
 *  window.addEventListener('resize', debouncedWidthCheck)
 *
 *  return () => {
 *    window.removeEventListener('resize', debouncedWidthCheck)
 *  }
 *})
 */
export default function checkUpcomingShowWidth(
  stateValue,
  wrapperClassName,
  textClassName,
  setStateFunc
) {
  if (stateValue !== null) {
    const marqueeIsActive = measureTextWidth(wrapperClassName, textClassName)

    setStateFunc(marqueeIsActive)
  }
}
