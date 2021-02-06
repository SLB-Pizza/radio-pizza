import React from 'react'
import { MixesHighlightCard, SingleMixCard } from '../components'

function MixesHighlightItems({ highlightItemsData }) {
  const highlightMixLayout = 'column is-12-mobile is-6-tablet is-3-desktop'

  const firstMix = highlightItemsData[0].featured_mix
  const secondMix = highlightItemsData[1].featured_mix
  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-6-tablet is-12-mobile">
        <MixesHighlightCard featuredMixData={firstMix} />
      </div>
      <pre>first mix {JSON.stringify(firstMix, null, 2)}</pre>

      {/* {highlightItemsData.map(({ featured_mix }, index) => (
        <SingleMixCard
          key={`highlight-mix-${index}`}
          mixData={featured_mix}
          columnLayout={highlightMixLayout}
        />
      ))} */}
    </div>
  )
}

export default MixesHighlightItems
