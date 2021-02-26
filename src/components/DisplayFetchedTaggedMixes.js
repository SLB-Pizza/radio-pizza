import React from 'react'
import { SingleMixCard } from './index'

/**
 * Layout for the mixes fetched when a {@link TagButtons} is clicked.
 * Renders on {@link MixesIndexPage} when `selectedTags` isn't null and {@link fetchTaggedMixes} has returned fetchedMixes results.
 * @category Layout Helper
 * @function DisplayFetchedTaggedMixes
 * @param {Object[]} tagMixes - array received when a tag query initiates
 * @returns {jsx}
 */
function DisplayFetchedTaggedMixes({ tagMixes }) {
  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

  return (
    <div className="columns is-mobile is-multiline">
      {tagMixes?.map(({ node }, index) => (
        <SingleMixCard
          key={`tagged-mix-#${index}`}
          mixData={node}
          columnLayout={mixListLayout}
        />
      ))}
      <div className="column">
        <pre>{JSON.stringify(tagMixes, null, 2)}</pre>
      </div>
    </div>
  )
}

export default DisplayFetchedTaggedMixes
