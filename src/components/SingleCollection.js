import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { FeaturedResident, MixPlayOverlay, TagButtons } from './index'
import { RichText } from 'prismic-reactjs'
import {
  displayCollectionPlaylistDetails,
  makeCollectionDispatch,
  getResidentString,
  htmlSerializer,
} from '../utils'

function SingleCollection({ singleCollection }) {
  const [collectionDetails, setDetails] = useState(null)
  const [dispatchData, setDispatch] = useState(null)

  const {
    _meta,
    collection_title,
    collection_blurb,
    collection_img,
    shuffle_mix_order,
    collection_playlist,
  } = singleCollection

  let mixCount =
    collection_playlist.length === 1
      ? `${collection_playlist.length} mix`
      : `${collection_playlist.length} mixes`

  useEffect(() => {
    const makeCollection = () => {
      if (singleCollection) {
        const displayDetails = displayCollectionPlaylistDetails(
          collection_playlist
        )
        const currentDispatch = makeCollectionDispatch(singleCollection)

        setDetails(displayDetails)
        setDispatch(currentDispatch)
      }
    }

    return makeCollection()
  }, [])

  return (
    <div className="columns is-mobile is-multiline curated-mix">
      <div className="column is-3-tablet is-12-mobile">
        {dispatchData && (
          <MixPlayOverlay
            wrapperClassName="card collection-play"
            img={collection_img}
            isCollection={true}
            collectionDetails={dispatchData}
          />
        )}
      </div>

      <div className="column is-9-tablet is-12-mobile curated-description">
        <div className="content details">
          <p className="title is-4">{collection_title}</p>
          <p className="subtitle is-6">{mixCount}</p>
          {collection_blurb && (
            <RichText
              render={collection_blurb}
              htmlSerializer={htmlSerializer}
            />
          )}
        </div>
        {collectionDetails && <TagButtons tagsArray={collectionDetails.tags} />}

        {/* <pre>Links {JSON.stringify(collection_playlist, null, 2)}</pre> */}
        <pre>Collection Dispatch {JSON.stringify(dispatchData, null, 2)}</pre>
        {/* <pre>Links {JSON.stringify(collectionDetails.mixes, null, 2)}</pre> */}
        {/* <pre>
          Residents {JSON.stringify(collectionDetails.residents, null, 2)}
        </pre> */}
        {/* <pre>Tags {JSON.stringify(collectionDetails.tags, null, 2)}</pre> */}
      </div>
    </div>
  )
}

SingleCollection.propTypes = {
  singleCollection: PropTypes.shape({
    _meta: PropTypes.shape({
      tags: PropTypes.array,
    }),
    collection_blurb: PropTypes.any,
    collection_img: PropTypes.object,
    collection_playlist: PropTypes.array,
    collection_title: PropTypes.title,
    shuffle_mix_order: PropTypes.bool,
  }),
}

export default SingleCollection
