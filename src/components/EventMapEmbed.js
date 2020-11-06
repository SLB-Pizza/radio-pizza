import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
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

function EventMapEmbed({ description, physicalLocation, onlineLocation }) {
  const [processedDescription, setDescription] = useState(null)

  useEffect(() => {
    const mapPreparation = () => {
      /**
       * Prepping the query portion of the map embed src URL
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent|encodeURIComponent()}
       */
      const encodedDescription = encodeURIComponent(description)
      setDescription(encodedDescription)
    }
    return mapPreparation()
  }, [])

  if (processedDescription) {
    // Small correction to
    const mapWidth = window.innerWidth - 12

    return (
      <section className="hero" id="event-map">
        <iframe
          width={mapWidth}
          height="600"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_EMBED_KEY}&q=${processedDescription}&zoom=19`}
          allowFullScreen
        />
      </section>
    )
  }

  return <section className="hero is-large" id="event-map" />
}

export default EventMapEmbed

{
  /* <GoogleMapReact
  bootstrapURLkeys={{ key: process.env.MAPS_EMBED_KEY }}
  defaultCenter={center}
  defaultZoom={17}
>
  <LocationPin lat={center.lat} lng={center.lng} text={description} />
</GoogleMapReact> */
}
