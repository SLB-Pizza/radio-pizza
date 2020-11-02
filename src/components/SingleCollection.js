import PropTypes from 'prop-types'
import React from 'react'
import { FeaturedResident, MixPlayOverlay, TagButtons } from './index'
import { RichText } from 'prismic-reactjs'
import {
  displayCollectionPlaylistDetails,
  getResidentString,
  htmlSerializer,
} from '../utils'

function SingleCollection({ singleCollection }) {
  const {
    _meta,
    collection_title,
    collection_blurb,
    collection_img,
    shuffle_mix_order,
    collection_playlist,
  } = singleCollection

  let mixLinks = []
  let uidChecks = new Set()
  let mixResidents = new Set()
  let mixTags = new Set()
  let mixCount =
    collection_playlist.length === 1
      ? `${collection_playlist.length} mix`
      : `${collection_playlist.length} mixes`

  const collectionDetails = displayCollectionPlaylistDetails(
    collection_playlist
  )

  return (
    <div className="columns is-mobile curated-mix">
      <div className="column is-9">
        <div className="content">
          <p className="title is-4">{collection_title}</p>
          <p className="subtitle is-6">{mixCount}</p>
          {collection_blurb && (
            <RichText
              render={collection_blurb}
              htmlSerializer={htmlSerializer}
            />
          )}
        </div>

        {/* <pre>Links {JSON.stringify(mixLinks, null, 2)}</pre> */}
        {/* <pre>
          Residents {JSON.stringify(collectionDetails.residents, null, 2)}
        </pre> */}
        {/* <pre>Tags {JSON.stringify(collectionDetails.tags, null, 2)}</pre> */}
        <TagButtons tagsArray={collectionDetails.tags} />
      </div>

      <div className="column is-3">
        <MixPlayOverlay
          wrapperClassName="card"
          img={collection_img}
          title={collection_title}
          url={mixLinks}
        />
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
