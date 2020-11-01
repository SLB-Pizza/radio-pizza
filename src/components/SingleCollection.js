import PropTypes from 'prop-types'
import React from 'react'
import { MixPlayOverlay, TagButtons } from './index'
import { RichText } from 'prismic-reactjs'
import { htmlSerializer, getResidentString, linkResolver } from '../utils'

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

        {collection_playlist.map(({ endless_mix_entry }) => {
          const { _meta, mix_link, featured_residents } = endless_mix_entry

          // Add the mix_link to this
          mixLinks.push(mix_link)

          // Add the tags to the tags set
          _meta.tags.map(tag => {
            mixTags.add(tag.toLowerCase())
          })

          // Add the residents to the resident set
          featured_residents.map(({ mix_resident }) => {
            let nameToCheck = mix_resident._meta.uid
            if (!uidChecks.has(nameToCheck)) {
              uidChecks.add(nameToCheck)
              mixResidents.add(mix_resident)
            } else {
              uidChecks.add(nameToCheck)
            }
          })
        })}
        <pre>Links {JSON.stringify(mixLinks, null, 2)}</pre>
        <pre>
          Residents {JSON.stringify([...mixResidents.values()], null, 2)}
        </pre>
        <pre>Tags {JSON.stringify([...mixTags.values()], null, 2)}</pre>
        <TagButtons tagsArray={[...mixTags.values()]} />
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
