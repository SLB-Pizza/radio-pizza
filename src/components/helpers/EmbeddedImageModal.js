import React, { useState } from 'react'
import { OneSizeImageModal } from '../index'

function EmbeddedImageModal({ url, alt, copyright }) {
  const [imgModalOpen, setImgModalOpen] = useState(false)

  return (
    <>
      <figure
        className="is-pulled-right image-embed"
        onClick={() => setImgModalOpen(true)}
        tabIndex="0"
        aria-labelledby={alt ? alt : 'article image'}
      >
        <img
          className="has-ratio lazyload inline-image"
          src={url}
          alt={alt || 'article image'}
          width={300}
        />
        {alt && <figcaption className="credit">{alt}</figcaption>}
        {copyright && <figcaption className="credit">{copyright}</figcaption>}
      </figure>
      {imgModalOpen ? (
        <OneSizeImageModal
          imgURL={url}
          alt={alt}
          copyright={copyright}
          setOpenFunc={setImgModalOpen}
        />
      ) : null}
    </>
  )
}

export default EmbeddedImageModal
