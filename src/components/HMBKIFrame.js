import React, { useState, useEffect } from 'react'

function HMBKIFrame({ oembedData }) {
  console.log('inside HMBKIFrame')
  const { embed_url, provider_name, type, ...rest } = oembedData
  let embedSrc, IFrame

  /**
   * Create the iframe `src` string based on the oembed provider
   */
  switch (provider_name) {
    case 'YouTube':
      /**
       * Create an iframe instead of using `oembedData.html` because:
       * - width, height values need to be changed.
       * - className needs to be added so figure classNames work.
       *
       * Standard link: `www.youtube.com/watch?v=KRntP-q_R9s`
       * Embed link: `"https://www.youtube.com/embed/KRntP-q_R9s?feature=oembed"`
       *
       * 1. Replace the `watch?v=` portion of the standard link with `embed/`.
       * 2. Add `?feature=oembed` to the end of `embedSrc`.
       */
      embedSrc = embed_url.replace('watch?v=', 'embed/')
      embedSrc += '?feature=oembed'
      IFrame = YTIframe

      return (
        <IFrame
          dataUrl={embed_url}
          type={type}
          provider={provider_name}
          src={embedSrc}
        />
      )
    default:
      return null
  }
}

export default HMBKIFrame

const YTIframe = ({ dataUrl, type, provider, src }) => (
  <figure
    className="image is-16by9"
    data-oembed={dataUrl}
    data-oembed-type={type}
    data-oembed-provider={provider}
  >
    <iframe
      className="has-ratio"
      src={src}
      width="800"
      height="450"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    />
  </figure>
)
