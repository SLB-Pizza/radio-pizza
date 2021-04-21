import React from 'react'
import { RenderShowTitlingLayout, ResidentLinks } from '../../components'
import { mappableDataFilter } from '../../utils'

/**
 * Examines the incoming single date's entries and renders them, in preferential order:
 * 1. if `prerecordedMix` exists
 * 2. if either of `liveShowTitle` or `liveShowGuests
 * 3. render the 'Live Broadcast' fallback
 * Called by {@link AdminScheduleGenerator}.
 * @category Layout Helper
 * @function AdminSingleShowTitling
 * @param {?Object} preRecordedMix - Prismic mix object
 * @param {?String} liveShowTitle - optional string detailing show's name
 * @param {?String} liveShowGuests - optional string detailing show's guest list (no link)
 * @returns {jsx}
 * @see {@link mappableDataFilter We need to pass an objectKeyCount of 2 when checking preRecordedMix.featured_residents since `__typename` counts as a key-value pair!}
 */
export default function AdminSingleShowTitling({
  preRecordedMix,
  liveShowTitle,
  liveShowGuests,
}) {
  /**
   * If `preRecordedMix` exists:
   * 1. If `mix_title` is null, filter the residents array,
   * and create resident links using {@link ResidentLinks} with the
   * optional `residentsAsTitle` true. {@link RenderShowTitlingLayout}: `showTitle` - null; `showSubtitle` - processedMixResidents
   * 2. `mix_title` exists; filter the residents array, create resident links.
   * create resident links; {@link RenderShowTitlingLayout}: `showTitle` - mix_title; `showSubtitle` - processedMixResidents
   */
  if (preRecordedMix) {
    const { mix_title, featured_residents } = preRecordedMix
    let processedResidents, recordedMixResidents

    /**
     * Data arrays containing `__typename`, like HMBK GraphQL Prismic queries, like {@link getSevenDaySchedule} feeding through props to {@link SingleScheduledShowTitling}, **NEED THIS VALUE SET TO 2** in order to receive a properly filtered array.
     */
    if (!mix_title) {
      processedResidents = mappableDataFilter(featured_residents, 2)
      recordedMixResidents = Array.isArray(processedResidents) ? (
        <ResidentLinks
          residentsArr={featured_residents}
          residentsAsTitle={true}
        />
      ) : null
    } else {
      processedResidents = mappableDataFilter(featured_residents, 2)
      recordedMixResidents = Array.isArray(processedResidents) ? (
        <ResidentLinks residentsArr={featured_residents} />
      ) : null
    }

    return (
      <RenderShowTitlingLayout
        showTitle={mix_title}
        showSubtitle={recordedMixResidents}
      />
    )
  } else if (liveShowTitle || liveShowGuests) {
    /**
     * No `preRecordedMix`; if either liveShowTitle or liveShowGuests exists,
     * pass both to {@link RenderShowTitlingLayout}.
     */
    return (
      <RenderShowTitlingLayout
        showTitle={liveShowTitle}
        showSubtitle={liveShowGuests}
      />
    )
  } else {
    /**
     * Render a "Live Broadcast" fallback.
     */
    return (
      <div className="column is-8">
        <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
          Live Broadcast
        </p>
      </div>
    )
  }
}
