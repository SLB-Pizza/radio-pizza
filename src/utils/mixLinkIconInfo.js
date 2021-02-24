/**
 * Grab the string detailing which site the mix is from to use with {@link IconMaker}. Called by {@link SingleMixCard} onMount `useEffect`.
 * @category Utilities
 * @function mixLinkIconInfo
 * @param {String} mixLink
 * @return {jsx}
 */
export default function mixLinkIconInfo(mixLink) {
  let platform = ''

  /**
   * Default details object to spread as props into {@link IconMaker} inside {@link SingleMixCard}
   */
  let details = {
    iconDetails: 'globe',
    iconLink: mixLink,
  }

  /**
   * If mixLink is null, return the default `details` object.
   */
  if (!mixLink) {
    return details
  }

  /**
   * SPLIT PROCEDURE
   * Example mixLinkStr = "https://www.bandcamp.com/OTHERSTUFF"
   *
   * Gotta get rid of stuff after ".com",
   *
   * 1. Split at the '.com' and grab the first String entry of that result array to enable searching for the site name.
   */

  // Grab the first entry of the resulting array
  const splitOnCOM = mixLink.split('.com')[0]
  const splitOnWWW = splitOnCOM.split('www.')

  /**
   * IF (split on "www." produces 2 entries)
   *    Second entry is the platform.
   *    OTHERWISE .split("www.") === 1 entry -> .split("//") on only entry, [0]
   * ElSE IF (.split("//") produces 2 entries)
   *    Second entry is the platform.
   * ELSE
   *    Somehow we got one entry OR more than 2; something went wrong.
   *    Just use default platform to obtain icon info
   */
  if (splitOnWWW.length === 2) {
    platform = splitOnWWW[1]
  } else if (splitOnWWW[0].split('//').length === 2) {
    platform = splitOnWWW[0].split('//')[1]
  }

  /**
   * Determine Platform icon data, set details object and return
   */
  switch (platform) {
    case 'bandcamp':
      details.iconDetails = ['fab', 'bandcamp']
      return details
    case 'facebook':
      details.iconDetails = ['fab', 'facebook-square']
      return details
    case 'instagram':
      details.iconDetails = ['fab', 'instagram']
      return details
    case 'mixcloud':
      details.iconDetails = ['fab', 'mixcloud']
      return details
    case 'soundcloud':
      details.iconDetails = ['fab', 'soundcloud']
      return details
    case 'spotify':
      details.iconDetails = ['fab', 'spotify']
      return details
    case 'twitter':
      details.iconDetails = ['fab', 'twitter']
      return details
    case 'youtube':
      details.iconDetails = ['fab', 'youtube']
      return details
    default:
      return details
  }
}
