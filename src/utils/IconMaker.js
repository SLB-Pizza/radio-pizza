import React from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/**
 * Returns a FontAwesomeIcon with surrounding span.
 * Used by {@link ResidentSocialLinks} and {@link SingleMixCard}
 * @category Layout Helper
 * @function IconMaker
 * @param {String} [spanClass="icon"] - className for the `<span>` wrapper
 * @param {String|String[]} [iconToUse="globe"] - details for the icon
 * @param {String} [iconSize="lg"] - size of the icon
 * @param {String} [iconClass="icon-color"] - className used to style the icon
 * @param {?String} iconOnClickFunc - onClick to trigger when Icon is clicked
 * @param {?String} linkAddress - link address the icon takes you to
 * @param {?Boolean} linkIsLocal - optional boolean that when `true` adds `rel="noopener" target="_blank"` to the anchor tag
 * @param {?String} linkClassName - optional className to style the link
 * @param {?Function} linkOnClickFunc - callback to trigger onClick
 * @param {?Object.<String, *>} linkProps - optional props to spread into the link's anchor tag
 * @param {?String} textAfterIcon - optional string that goes after the Icon
 * @returns {jsx}
 *
 * @see {@link https://github.com/FortAwesome/react-fontawesome React-FontAwesome repo}
 * @see {@link https://fontawesome.com/how-to-use/on-the-web/using-with/react React-FontAwesome documentation}
 */
export default function IconMaker({
  spanClass = 'icon',
  iconToUse = 'globe',
  iconSize = 'lg',
  iconClass = 'icon-color',
  iconOnClickFunc,
  linkAddress,
  linkIsLocal,
  linkClassName,
  linkOnClickFunc,
  linkProps,
  textAfterIcon,
}) {
  /**
   * The Fragment for the Icon and `textAfterIcon`, if present.
   */
  const IconAndAfterText = () => (
    <>
      <span className={spanClass}>
        <Icon
          icon={iconToUse}
          size={iconSize}
          className={iconClass}
          onClick={iconOnClickFunc}
        />
      </span>
      {textAfterIcon && <span>{textAfterIcon}</span>}
    </>
  )

  if (linkAddress) {
    if (linkIsLocal) {
      return (
        <a
          href={linkAddress}
          className={linkClassName}
          onClick={linkOnClickFunc}
          {...linkProps}
        >
          <IconAndAfterText />
        </a>
      )
    } else {
      return (
        <a
          href={linkAddress}
          rel="noopener"
          target="_blank"
          className={linkClassName}
          onClick={linkOnClickFunc}
          {...linkProps}
        >
          <IconAndAfterText />
        </a>
      )
    }
  } else {
    return <IconAndAfterText />
  }
}
