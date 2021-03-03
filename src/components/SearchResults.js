import React from 'react'
import { SingleMixCard, SingleResidentCard, SingleEventCard } from './index'

// Dummy data in __test__ folder
import hmbkMixesResidents from '../../__test__/HMBK-mixes-with-residents.json'
import dummyArtists from '../../__test__/dummyArtists.json'
import dummyEvents from '../../__test__/dummyEvents.json'

const mixListLayout =
  'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'
const eventsResultLayout =
  'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

function SearchResults(props) {
  return (
    <div className="columns is-mobile is-multiline">
      {props.isSelected === 'mixes'
        ? hmbkMixesResidents.map(({ node }, index) => {
            return (
              <SingleMixCard
                key={`resident-mix-#${index}`}
                mixData={node}
                columnLayout={mixListLayout}
              />
            )
          })
        : null}
      {props.isSelected === 'residents'
        ? dummyArtists.map(resident => (
            <SingleResidentCard
              key={resident.name}
              name={resident.name}
              img={'https://source.unsplash.com/1280x1280/daily?robot'}
            />
          ))
        : null}
      {props.isSelected === 'events'
        ? dummyEvents.map(event => (
            <SingleEventCard
              key={`search-result-event-${index}`}
              eventData={event}
              eventColumnLayout={eventsResultLayout}
            />
          ))
        : null}
      {props.isSelected === 'news' ? (
        <div className="column is-full">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
            Dummy News results here
          </p>
        </div>
      ) : null}
    </div>
  )
}

export default SearchResults
