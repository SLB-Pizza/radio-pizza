import { measureTextWidth } from './index'

/**
 * Receives the local setState function from UpcomingShow component using {@link measureTextWidth} result.
 * Called by: {@link UpcomingShowFallbackMessage},
 * @category Utilities
 * @function setInitialMarqueeState
 * @param {Function} setStateFunc - function from UpcomingShow component to set local state using {@link measureTextWidth} result.
 * @example
 * useEffect(() => {
 *   return setInitialMarqueeState(setActiveMarquee)
 * }, [])
 */
export default function setInitialMarqueeState(setStateFunc) {
  const marqueeIsActive = measureTextWidth()
  setStateFunc(marqueeIsActive)
}
