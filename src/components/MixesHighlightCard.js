import React from 'react'
import NanoClamp from 'nanoclamp'
import { Link } from 'gatsby'

import { MixPlayOverlay, TagButtons } from '../components'
import { formatDateTime, getResidentString } from '../utils'

function MixesHighlightCard({ featuredMixData }) {
  const {
    _meta,
    mix_date,
    mix_image,
    mix_link,
    mix_title,
    featured_residents,
  } = featuredMixData

  const mixDate = formatDateTime(mix_date, 'year-month-day') ?? 'mix date'
  const residentString = getResidentString(featured_residents)

  return (
    <div className="card highlight-mix">
      <MixPlayOverlay
        url={mix_link}
        title={mix_title}
        residents={residentString}
        img={mix_image}
        wrapperClassName="card-image"
      />
      <div className="card-content"></div>
    </div>
  )
}

export default MixesHighlightCard
