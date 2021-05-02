import React from 'react'
import { SingleEventCard, StickyItemsLayout } from './index'

/**
 * Returns the Events content section of the Homepage.
 * @category Layout Section
 * @function HomeEvents
 * @param {String} headline - the label for this section
 * @param {String} blurb - short description to give the user context
 * @param {Object[]} homeEventsData - Array of data from Prismic received from /index; original data set in Prismic Homepage document
 * @returns {jsx}
 */
export default function HomeEvents({ blurb, headline, homeEventsData }) {
  const eventPageLayout = 'column is-9-mobile is-two-fifths-tablet is-4-desktop'

  return (
    homeEventsData && (
      <StickyItemsLayout
        headline={headline}
        blurb={blurb}
        linkURL={'/events'}
        linkBtnText={'All Events'}
        itemsToMap={homeEventsData}
        ItemComponent={SingleEventCard}
        layout={eventPageLayout}
      />
    )
  )
}
