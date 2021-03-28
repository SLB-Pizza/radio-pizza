import React from 'react'

/**
 * Checks the incoming data to decide how to style and render that data.
 * If `subtitleData` is a string, that means it originally came from `live_show_guests` and is there a live show; wrap in a `<p>` with the appropriate class.
 * If `subtitleData` ISN'T a string, but exists, it's a React object; render it as is.
 * If `subtitleData` doesn't exist, render "HMBK Resident" in a `<p>` with the appropriate class.
 * Called by {@link RenderShowTitlingLayout}.
 * @category Layout Helper
 * @function ShowSubtitle
 * @param {React|String} subtitleData
 * @param {Boolean} useAsShowTitle - dictate which wrapper class style to use in the cases where a `<p>` tag is rendered.
 * @returns {jsx}
 */
export default function ShowSubtitle({ subtitleData, useAsShowTitle }) {
  const subtitleStyle = useAsShowTitle
    ? 'title is-size-5-desktop is-size-6-touch has-text-centered text-block'
    : 'subtitle is-size-6-desktop is-size-7-touch has-text-centered text-block'

  if (typeof subtitleData === 'string') {
    return <p className={subtitleStyle}>{subtitleData}</p>
  } else if (subtitleData) {
    return subtitleData
  } else {
    return <p className={subtitleStyle}>HMBK Resident</p>
  }
}
