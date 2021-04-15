/**
 * Returns the mix link's hosting site.
 * Called by: {@link mixLinkIconInfo}, {@link MixLinkOverlay}
 * @category Utilities
 * @function getMixLinkSite
 * @param {String} mixURL
 */
export default function getMixLinkSite(mixURL) {
  let platform

  /**
   * SPLIT PROCEDURE
   * Example mixLinkStr = "https://www.bandcamp.com/OTHERSTUFF"
   *
   * Gotta get rid of stuff after ".com",
   *
   * 1. Split at the '.com' and grab the first String entry of that result array to enable searching for the site name.
   */

  // Grab the first entry of the resulting array
  const splitOnCOM = mixURL.split('.com')[0]
  const splitOnWWW = splitOnCOM.split('www.')

  /**
   * IF (split on "www." produces 2 entries)
   *    Second entry is the platform.
   *    OTHERWISE .split("www.") === 1 entry -> .split("//") on only entry, [0]
   * ElSE IF (.split("//") produces 2 entries)
   *    Second entry is the platform.
   * ELSE
   *    Somehow we got one entry OR more than 2; something went wrong.
   *    Just use default platform to return default icon info
   */
  if (splitOnWWW.length === 2) {
    platform = splitOnWWW[1]
  } else if (splitOnWWW[0].split('//').length === 2) {
    platform = splitOnWWW[0].split('//')[1]
  }
  return platform
}
