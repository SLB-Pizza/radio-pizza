import React from "react";

function EventMap({ eventLocation }) {
  const position = [eventLocation.latitude, eventLocation.longitude];
  console.log(position);

  if (typeof window !== "undefined") {
    return <p>Map Placeholder</p>;
  }
  return null;
}

export default EventMap;
