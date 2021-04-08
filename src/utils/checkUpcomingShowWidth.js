import { measureTextWidth } from './index'

/**
 * Receives the local setState function and current state value from UpcomingShow component using {@link measureTextWidth} result. Returned by another function in local useEffect, which is then debounced, to be called by a `resize` triggered `addEventListener`.
 * Called by: {@link UpcomingShowFallbackMessage},
 * @category Utilities
 * @function checkUpcomingShowWidth
 * @param {Boolean} stateValue - dictates whether marquee className should be applied
 * @param {Function} setStateFunc - function from UpcomingShow component to set local state using {@link measureTextWidth} result.
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
export default function checkUpcomingShowWidth(stateValue, setStateFunc) {
  if (stateValue !== null) {
    const marqueeIsActive = measureTextWidth()
    setStateFunc(marqueeIsActive)
  }
}
