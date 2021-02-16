/**
 * Function that calculates the sum of TopNav and BottomNav
 * @function getNavbarHeights
 * @returns {Number} combined height (with borders) of {@link TopNav} and {@link BottomNav}
 */
function getNavbarHeights() {
  const topNav = document.querySelector('.radio-and-schedule-bar')
  const bottomNav = document.querySelector('.navbar.is-fixed-bottom')

  /**
   * Using offsetHeight here because both topNav and bottomNav have borders to account for.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight |HTMLElement.offsetHeight - MDN}
   */
  return topNav.offsetHeight + bottomNav.offsetHeight
}

export default getNavbarHeights
