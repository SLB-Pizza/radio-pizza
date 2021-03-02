import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/**
 * Returns a FontAwesomeIcon with surrounding span.
 * Used by {@link ResidentSocialLinks} and {@link SingleMixCard}
 * @category Layout Helper
 * @function IconMaker
 * @param {String} spanClass - className for the `<span>` wrapper
 * @param {String|String[]} iconDetails - details for the icon
 * @param {String} iconSize - size of the icon
 * @param {String} iconClass - className used to style the icon
 * @param {?String} iconLink - link the icon takes you to onClick
 * @param {String} textAfter - string that goes after the Icon
 * @returns {jsx}
 *
 * @see {@link https://github.com/FortAwesome/react-fontawesome React-FontAwesome repo}
 * @see {@link https://fontawesome.com/how-to-use/on-the-web/using-with/react React-FontAwesome documentation}
 */
export default function IconMaker({
  spanClass = 'icon',
  iconDetails = 'globe',
  iconSize = 'lg',
  iconClass = 'icon-color',
  iconLink,
  textAfter,
}) {
  if (iconLink) {
    return (
      <a href={iconLink} rel="noopener" target="_blank">
        <span className={spanClass}>
          <Icon icon={iconDetails} size={iconSize} className={iconClass} />
        </span>
        {textAfter && <span>{textAfter}</span>}
      </a>
    )
  } else {
    return (
      <>
        <span className={spanClass}>
          <Icon icon={iconDetails} size={iconSize} className={iconClass} />
        </span>
        {textAfter && <span>{textAfter}</span>}
      </>
    )
  }
}
