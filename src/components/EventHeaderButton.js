import React from 'react'

/**
 * On {@link EventTemplate}: renders a button with instructional text that onClick links to you a page.
 * @category Layout Helper
 * @function EventHeaderButton
 * @param {String} buttonText
 * @param {Object.<String>} buttonLink
 * @param {Boolean} isSticky
 * @returns {jsx}
 */
export default function EventHeaderButton({
  buttonText,
  buttonLink,
  isSticky,
}) {
  return (
    <>
      <div className="column is-narrow is-hidden-mobile">
        <a href={buttonLink.url} target="_blank">
          <button
            className={
              isSticky
                ? 'button is-small is-fullwidth is-outlined is-rounded'
                : 'button is-fullwidth is-outlined is-rounded'
            }
          >
            {buttonText}
          </button>
        </a>
      </div>
      <div className="column is-8 is-offset-2 is-hidden-tablet">
        <a href={buttonLink.url} target="_blank">
          <button
            className={
              isSticky
                ? 'button is-small is-fullwidth is-outlined is-rounded'
                : 'button is-fullwidth is-outlined is-rounded'
            }
          >
            {buttonText}
          </button>
        </a>
      </div>
    </>
  )
}
