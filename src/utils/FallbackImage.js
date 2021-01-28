import React from 'react'

/**
 * Used to cover in places where an image is needed but not present. Props received include things like className, onClick etc.
 * Image is in the /static/img folder and SHOULD NOT be deleted
 * @function FallbackImage
 * @param {String} styleName - used to set the `<img>` className
 * @param {Object} rest - whatever other props the `<img>` needs
 * @return {jsx}
 */
export default function FallbackImage({ styleName, ...rest }) {
  return (
    <img
      src={`img/halfmoon_white.png`}
      alt="Halfmoon BK"
      className={styleName}
      {...rest}
    />
  )
}
