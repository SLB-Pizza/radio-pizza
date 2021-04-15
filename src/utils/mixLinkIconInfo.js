import { getMixLinkSite } from './index'

/**
 * Grab the string detailing which site the mix is from to use with {@link IconMaker}. Called by {@link SingleMixCard} onMount `useEffect`.
 * @category Utilities
 * @function mixLinkIconInfo
 * @param {String} mixLink
 * @return {Object.<String,(String|String[])>
 */
export default function mixLinkIconInfo(mixLink) {
  /**
   * Default details object to spread as props into {@link IconMaker} inside {@link SingleMixCard}
   */
  let details = {
    iconToUse: 'globe',
    linkAddress: mixLink,
  }

  /**
   * If mixLink is null, return the default `details` object.
   */
  if (!mixLink) {
    return details
  }

  let platform = ''
  platform = getMixLinkSite(mixLink)

  /**
   * Determine Platform icon data, set details object and return
   */
  switch (platform) {
    case 'bandcamp':
      details.iconToUse = ['fab', 'bandcamp']
      return details
    case 'facebook':
      details.iconToUse = ['fab', 'facebook-square']
      return details
    case 'instagram':
      details.iconToUse = ['fab', 'instagram']
      return details
    case 'mixcloud':
      details.iconToUse = ['fab', 'mixcloud']
      return details
    case 'soundcloud':
      details.iconToUse = ['fab', 'soundcloud']
      return details
    case 'spotify':
      details.iconToUse = ['fab', 'spotify']
      return details
    case 'twitter':
      details.iconToUse = ['fab', 'twitter']
      return details
    case 'youtube':
      details.iconToUse = ['fab', 'youtube']
      return details
    default:
      return details
  }
}
