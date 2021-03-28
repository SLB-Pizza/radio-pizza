import React from 'react'
import { ShowSubtitle } from './index'

/**
 * Renders the layout as decided by the logic dictated in {@link SingleScheduledShowTitling}.
 * @category LayoutHelper
 * @function RenderShowTitlingLayout
 * @param {?String} showTitle - optional live show title; is sourced from either `mix_title` for pre-recorded mixes, or `liveShowTitle` for live streams
 * @param {Object[]|String} showSubtitle - Can be either an array of links to Resident pages or simple key text strings
 * @returns {jsx} The show details portion of a single show row on `/schedule` page.
 */
export default function RenderShowTitlingLayout({ showTitle, showSubtitle }) {
  return showTitle !== null ? (
    <div className="column is-8">
      <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
        {showTitle}
      </p>
      <ShowSubtitle subtitleData={showSubtitle} useAsShowTitle={false} />
    </div>
  ) : (
    <div className="column is-8">
      <ShowSubtitle subtitleData={showSubtitle} useAsShowTitle={true} />
    </div>
  )
}
