import React from 'react'
import { FallbackImage } from '../utils'

function HMBKDivider() {
  return (
    <>
      <div className="column">
        <hr />
      </div>
      <div className="column is-narrow">
        <figure className="image is-64x64">
          <FallbackImage />
        </figure>
      </div>

      <div className="column">
        <hr />
      </div>
    </>
  )
}

export default HMBKDivider
