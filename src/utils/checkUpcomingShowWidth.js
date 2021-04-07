import { measureTextWidth } from './index'

export default function checkUpcomingShowWidth(stateValue, setStateFunc) {
  if (stateValue !== null) {
    const marqueeIsActive = measureTextWidth()
    setStateFunc(marqueeIsActive)
  }
}
