import React from 'react'
// import Embed from "react-embed";

function HMBKIFrame({ oembedData }) {
  const { embed_url, provider_name, type, ...rest } = oembedData
  let embedSrc

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

      return (
        <YTIframe
          dataUrl={embed_url}
          type={type}
          provider={provider_name}
          src={embedSrc}
        />
      )
    case 'Facebook':
      let fbEmbedHead, fbEmbedTail, className
      /**
       * Read the type of the content from `oEmbedData`: "video" or "rich":
       *
       */
      if (type === 'video') {
        /**
         * Build and encode the Facebook video src string.
         */
        fbEmbedHead = 'https://www.facebook.com/plugins/video.php?href='
        fbEmbedTail = `&width=${rest.width}&show_text=false&height=${rest.height}&appId`

        const encodedSrc = encodeURIComponent(embed_url)
        embedSrc = `${fbEmbedHead}${encodedSrc}${fbEmbedTail}`

        className = 'image is-16by9'
        return (
          <>
            <FBIframe
              dataUrl={embed_url}
              className={className}
              type={type}
              provider={provider_name}
              width={rest.width}
              height={rest.height}
              src={embedSrc}
            />
            <pre>{JSON.stringify(oembedData, null, 2)}</pre>
          </>
        )
      }
    // else {
    //   /**
    //    * Build and encode the Facebook post src string.
    //    */
    //   fbEmbedHead = "https://www.facebook.com/plugins/post.php?href=";
    //   fbEmbedTail = `&width=${rest.width}&show_text=true&appId`;

    //   const encodedSrc = encodeURIComponent(embed_url);
    //   embedSrc = `${fbEmbedHead}${encodedSrc}${fbEmbedTail}`;

    //   className = "image";
    //   return (
    //     <>

    //       <div class="fb-post" data-href={embed_url} data-width="500" />
    //     </>
    //   );
    // }

    default:
      return <pre>{JSON.stringify(oembedData, null, 2)}</pre>
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

const FBIframe = ({
  dataUrl,
  className,
  type,
  provider,
  width,
  height,
  src,
}) => (
  // <iframe
  //   src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2F4ebOmGacif%2F&width=500&show_text=false&height=280&appId"
  //   width="500"
  //   height="280"
  //   scrolling="no"
  //   frameborder="0"
  //   allowfullscreen="true"
  //   allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
  //   allowFullScreen="true"
  // ></iframe>

  <figure
    className={className}
    data-oembed={dataUrl}
    data-oembed-type={type}
    data-oembed-provider={provider}
  >
    <iframe
      className="has-ratio"
      src={src}
      width={width}
      height={height}
      scrolling="no"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
    />
  </figure>
)

const getAspectRatio = (a, b) => {
  if (b === 0) {
    return a
  }
  return getAspectRatio(b, a % b)
}

// Video Link: https://fb.watch/4ebOmGacif/

// iframe code generator
// <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Ffb.watch%2F4ebOmGacif%2F&width=500&show_text=true&height=416&appId" width="500" height="416" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

// Multiple Image Post: https://www.facebook.com/LiverpoolFC/posts/10160304586157573

// <iframe
// src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FLiverpoolFC%2Fposts%2F10160304586157573&width=500&show_text=true&height=645&appId" width="500"
// height="645"
// style="border:none;overflow:hidden"
// scrolling="no"
// frameborder="0"
// allowfullscreen="true"
// allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

{
  /* <iframe
  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Ffb.watch%2F4ebOmGacif%2F&width=500&show_text=false&height=280&appId"
  width="500"
  height="280"
  style="border:none;overflow:hidden"
  scrolling="no"
  frameborder="0"
  allowfullscreen="true"
  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true">
  </iframe> */
}
