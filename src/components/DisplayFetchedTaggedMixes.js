import React from 'react'
import { SingleMixCard } from './index'

/**
 * Renders the mixes fetched when a SingleMixCard button is clicked. On a boolean with {@link MixesIndexPage} mixesToMap when `selectedTags` is []
 * @category Layout Helper
 * @function DisplayFetchedTaggedMixes
 * @param {*} {}
 * @returns {jsx}
 */
function DisplayFetchedTaggedMixes({ fetchedMixes }) {
  const mixListLayout =
    'column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen'

  return (
    <div className="columns is-mobile is-multiline">
      <div className="column is-3">
        <pre>{JSON.stringify(fetchedMixes, null, 2)}</pre>
      </div>
      {fetchedMixes?.map(({ node }, index) => (
        <SingleMixCard
          key={`tagged-mix-#${index}`}
          mixData={node}
          columnLayout={mixListLayout}
        />
      ))}
    </div>
  )
}

export default DisplayFetchedTaggedMixes
