import { measureTextWidth } from './index'

export default function setInitialMarqueeState(setStateFunc) {
  const marqueeIsActive = measureTextWidth()
  setStateFunc(marqueeIsActive)
}
