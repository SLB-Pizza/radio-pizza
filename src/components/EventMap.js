import React, { useRef, useEffect, useState } from "react";
import MapGL from "react-map-gl";

const MAPBOX_TOKEN = process.env.HALFMOONBK_MAPBOX_PUBLIC_KEY;

function EventMap({ eventLocation }) {
  const [viewport, setViewport] = useState({
    latitude: eventLocation.latitude,
    longitude: -eventLocation.longitude,
    zoom: 13,
    bearing: 0,
    pitch: 0,
  });

  return (
    <section className="hero is-small is-primary">
      <div className="hero-body">
        <MapGL
          {...viewport}
          width="89vw"
          height="25rem"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      </div>
    </section>
  );

  // if (typeof window !== "undefined") {
  //   return <p>Map Placeholder</p>;
  // }
  // return null;
}

export default EventMap;
