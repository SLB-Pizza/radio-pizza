import React from 'react'

function HighlightFeatures({ titling = 'hot off the press', layoutComponent }) {
  return (
    <section className="section container is-fluid highlight-features">
      <h2 className="title is-2 is-size-3-touch hero-title">{titling}</h2>
    </section>
  )
}

export default HighlightFeatures
