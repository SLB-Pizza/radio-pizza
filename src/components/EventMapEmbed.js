import React, { useState, useEffect } from 'react'

/**
 * Returns a Google Map embed on an event page, if `event_location` and `event_location_physical_address` both exist. Props are guaranteed to exists; component renders only if ` event_location && event_location_physical_address` is true; both exist.
 * @category Site Elements
 * @function EventMapEmbed
 * @param {String} locationName - the name of the event venue
 * @param {String} address - the physical address of the event venue
 * @returns {jsx}
 */
function EventMapEmbed({ locationName, address }) {
  const [processedDescription, setDescription] = useState(null)
  const [mapWidth, setMapWidth] = useState(null)

  /**
   * Encode `locationName` and `address` to use as the map embed query.
   * @category useEffect
   * @name mapPreparation
   */
  useEffect(() => {
    const mapPreparation = () => {
      const placeWithAddress = `${locationName} ${address}`

      /**
       * Prepping the query portion of the map embed src URL
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent encodeURIComponent()}
       */
      const encodedDescription = encodeURIComponent(placeWithAddress)
      setDescription(encodedDescription)

      const containerWidth =
        document.querySelector('#map-section').clientWidth - 48 // 3rem padding
      setMapWidth(containerWidth)
    }

    return mapPreparation()
  }, [])

  return (
    <section className="section container" id="map-section">
      <div className="columns is-mobile is-multiline">
        <div className="column is-12 content">
          <p className="title is-4">Map</p>
        </div>
        <div className="column is-12">
          <figure className="image">
            <iframe
              width={mapWidth}
              height="500"
              frameBorder="0"
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GATSBY_MAPS_EMBED_KEY}&q=${processedDescription}&zoom=19`}
              allowFullScreen
            />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default EventMapEmbed
