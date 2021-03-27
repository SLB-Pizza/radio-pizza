import React from 'react'
import { mappableDataFilter, getResidentLinks } from '../utils'

/**
 * Examines the incoming single date's entries and renders them, in preferential order:
 * 1. if `prerecordedMix` exists
 * 2. if either of `liveShowTitle` or `liveShowGuests
 * 3. render the 'Live Broadcast' fallback
 * Called by {@link SingleDateScheduleEntries}.
 * @category Layout Helper
 * @function SingleScheduledShowTitling
 * @param {?Object} preRecordedMix - Prismic mix object
 * @param {?String} liveShowTitle - optional string detailing show's name
 * @param {?String} liveShowGuests - optional string detailing show's guest list (no link)
 * @returns {jsx}
 */
export default function SingleScheduledShowTitling({
  preRecordedMix,
  liveShowTitle,
  liveShowGuests,
}) {
  if (preRecordedMix) {
    const { mix_title, featured_residents } = preRecordedMix
    let processedResidents, recordedMixResidents

    if (!mix_title) {
      processedResidents = mappableDataFilter(featured_residents)
      recordedMixResidents = Array.isArray(processedResidents)
        ? getResidentLinks(featured_residents, null, true)
        : null
    } else {
      processedResidents = mappableDataFilter(featured_residents)
      recordedMixResidents = Array.isArray(processedResidents)
        ? getResidentLinks(featured_residents)
        : null
    }

    return (
      <RenderScheduledShowDetails
        showTitle={mix_title}
        showSubtitle={recordedMixResidents}
      />
    )
  } else if (liveShowTitle || liveShowGuests) {
    return (
      <RenderScheduledShowDetails
        showTitle={liveShowTitle}
        showSubtitle={liveShowGuests}
      />
    )
  } else {
    return (
      <div className="column is-8">
        <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
          Live Broadcast
        </p>
      </div>
    )
  }
}

function RenderScheduledShowDetails({ showTitle, showSubtitle }) {
  return showTitle !== null ? (
    <div className="column is-8">
      <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
        {showTitle}
      </p>
      {/* {showSubtitle} */}
      {showSubtitle !== null ? showSubtitle : <FallbackResident />}
    </div>
  ) : (
    <div className="column is-8">
      {showSubtitle !== null ? showSubtitle : <FallbackResident />}
    </div>
  )
}

const FallbackResident = () => (
  <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
    HMBK Resident
  </p>
)
