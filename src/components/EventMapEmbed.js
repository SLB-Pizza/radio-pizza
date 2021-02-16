import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

function LocationPin(text) {
  return (
    <div className="pin">
      <Icon size="sm" icon="map-marker-alt" className="pin-icon">
        <p className="pin-text">{text}</p>
      </Icon>
    </div>
  )
}

function EventMapEmbed({ description, address }) {
  const [processedDescription, setDescription] = useState(null)
  const [mapWidth, setMapWidth] = useState(null)

  useEffect(() => {
    const mapPreparation = () => {
      const placeWithAddress = `${description} ${address}`

      /**
       * Prepping the query portion of the map embed src URL
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent | encodeURIComponent()}
       */
      const encodedDescription = encodeURIComponent(placeWithAddress)
      setDescription(encodedDescription)

      const containerWidth =
        document.querySelector('#event-blurb').clientWidth - 48 // 3rem padding
      setMapWidth(containerWidth)
    }

    return mapPreparation()
  }, [])

  if (processedDescription && mapWidth) {
    return (
      <iframe
        width={mapWidth}
        height="600"
        frameBorder="0"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GATSBY_MAPS_EMBED_KEY}&q=${processedDescription}&zoom=19`}
        allowFullScreen
      />
    )
  }

  return null
}

export default EventMapEmbed
