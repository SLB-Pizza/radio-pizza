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
          <p className="title">{collection_title}</p>
          <p className="subtitle is-6">{mixCount}</p>
          {collection_blurb && (
            <RichText
              render={collection_blurb}
              htmlSerializer={htmlSerializer}
            />
          )}
        </div>

        {collection_playlist.map(({ endless_mix_entry }, index) => {
          const {
            _meta,
            mix_title,
            mix_link,
            featured_residents,
          } = endless_mix_entry

          // Add the mix_link to this
          mixLinks.push(mix_link)

          // Add the tags to the tags set
          _meta.tags.map(tag => {
            mixTags.add(tag.toLowerCase())
          })

          // Add the residents to the resident set
          featured_residents.map(({ mix_resident }) => {
            // let nameToCheck = mix_resident.resident_name
            // if()
            mixResidents.add(mix_resident)
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

export default SingleCollection
