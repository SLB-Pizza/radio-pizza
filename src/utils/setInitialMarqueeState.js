import { measureTextWidth } from './index'

/**
 * Receives the local setState function from UpcomingShow component using {@link measureTextWidth} result.
 * Called by: {@link UpcomingShowFallbackMessage},
 * @category Utilities
 * @function setInitialMarqueeState
 * @param {Function} setStateFunc - function from UpcomingShow component to set local state using {@link measureTextWidth} result.
 * @param {String} wrapperClassName - className of the container to measure again
 * @param {String} textClassName  - className of the text to grab for measurement
 * @example
 * useEffect(() => {
 *   return setInitialMarqueeState(setActiveMarquee)
 * }, [])
 */
export default function setInitialMarqueeState(
  wrapperClassName,
  textClassName,
  setStateFunc
) {
  const marqueeIsActive = measureTextWidth(wrapperClassName, textClassName)
  setStateFunc(marqueeIsActive)
}
