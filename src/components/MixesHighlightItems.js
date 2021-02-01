import React from 'react'
import { SingleMixCard } from '../components'

function MixesHighlightItems({ highlightItemsData }) {
  const highlightMixLayout = 'column is-12-mobile is-6-tablet is-3-desktop'
  return (
    <div className="columns is-mobile is-multiline">
      {highlightItemsData.map(({ featured_mix }, index) => (
        <SingleMixCard
          key={`highlight-mix-${index}`}
          mixData={featured_mix}
          columnLayout={highlightMixLayout}
        />
      ))}
    </div>
  )
}

export default MixesHighlightItems
