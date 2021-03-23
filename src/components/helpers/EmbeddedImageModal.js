import React, { useState } from 'react'

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
        <EmbedModal
          imgURL={url}
          alt={alt}
          copyright={copyright}
          setOpenFunc={setImgModalOpen}
        />
      ) : null}
    </>
  )
}

const EmbedModal = ({ imgURL, alt, copyright, setOpenFunc }) => (
  <div className="modal is-active">
    <div className="modal-background" onClick={() => setOpenFunc(false)} />
    <div className="modal-content" aria-label={alt ? alt : 'article image'}>
      <div className="columns">
        <div className="column img-area">
          <figure className="image">
            <img
              className="has-ratio lazyload inline-image"
              src={imgURL}
              alt={alt || 'article image'}
            />
            {alt && <figcaption className="credit">{alt}</figcaption>}
            {copyright && (
              <figcaption className="credit">{copyright}</figcaption>
            )}
          </figure>
        </div>
        <button
          className="modal-close is-large"
          tabIndex="0"
          aria-label="close"
          onClick={() => setOpenFunc(false)}
        />
      </div>
    </div>
  </div>
)

export default EmbeddedImageModal
