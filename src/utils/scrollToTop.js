/**
 * Scrolls user back to top of page.
 * @category Utilities
 * @function scrollToTop
 */
export const scrollToTop = () =>
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
