/**
 * Processes `globalState` to derive the site's title, (in the tab), using HMBK's radio.co status, and the default mix set in the CMS.
 *
 * `isLoading` is `true`
 *    return the default titling
 *
 * IF site is `live`
 *    IF the player is playing
 *      start titling with "LIVE"
 *    ELSE
 *      start titling with "ON AIR"
 *
 *    IF `liveShowTitle` exists
 *      append it to titling
 *    ELSE
 *      append `liveShowGuests` to titling
 *    NB: Because of how {@link submitMarquee} prevents
 *    `liveShowTitle` and `liveShowGuests` from both being null `onSubmit`,
 *    at least one of the two is always guaranteed to exists.
 * ELSE
 *    IF title exists
 *      IF resident also exists
 *        `title - resident | Half Moon`
 *      ELSE
 *        `title | Half Moon`
 *    ELSE IF resident exists
 *        `resident | Half Moon`
 * FALLBACK
 *    default string is returned to use
 * @category Utilities
 * @function setHelmetSiteTitling
 * @param {Object} globalState - from {@link GlobalContextProvider}
 * @returns {String} the final title to pass to Helmet
 */
export default function setHelmetSiteTitling(globalState) {
  const { isLoading, live, liveMarquee, playing, title, resident } = globalState

  /**
   * The default titling string to use:
   * - if `isLoading` is true
   * - as the ultimate fallback if all tested conditions fail
   */

  let titling = 'Half Moon | Ears to the Concrete'

  if (isLoading) {
    return titling
  } else {
    if (live) {
      // Prefix live broadcast with playing status
      if (playing) {
        titling = 'LIVE | '
      } else {
        titling = 'ON AIR | '
      }
      // Add on the live titling
      // Use the set broadcast show titling
      // ELSE use the guest string, if all that's set
      // No double null case needed,
      if (liveMarquee.liveShowTitle) {
        titling += `${liveMarquee.liveShowTitle} | Half Moon`
      } else {
        titling += `${liveMarquee.liveShowGuests} | Half Moon`
      }
    }
    // Use title and resident string together when both are present
    // else use title
    // else use resident
    else if (title) {
      if (resident) {
        titling = `${title} - ${resident}} | Half Moon`
      } else {
        titling = `${title} | Half Moon`
      }
    } else if (resident) {
      titling = `${resident} | Half Moon`
    }
    // If HMBK is NOT live and there is no title OR resident to use
    // the original titling will be returned
  }
  return titling
}
