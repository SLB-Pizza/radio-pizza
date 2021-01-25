import React from 'react'
import NanoClamp from 'nanoclamp'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { htmlSerializer, linkResolver } from '../utils'

function HighlightFeature({ articleData }) {
  const { _meta, headline_block } = articleData
  const {
    article_headline_img,
    article_headline,
    article_category,
    article_subtitle,
  } = headline_block[0].primary

  // Set up hyperlink url data
  const linkTo = { type: _meta.type, uid: _meta.uid }

  // Grab the specific cropped image details
  const image = article_headline_img.desktop

  // Use the article headline if the image doesn't have alt text
  const altText = image.alt ?? article_headline[0].text

  return (
    <article className="hero highlight-features has-background">
      <img
        className="hero-background"
        src={article_headline_img.url}
        alt={article_headline_img.alt}
      />
      <div className="hero-foot">
        <div className="container is-fluid">
          <div className="columns is-vcentered">
            <div className="column">
              <p className="title is-size-5-desktop is-size-6-touch">
                {RichText.asText(article_headline)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

// Old in-hero version
// return (
//   <div className="column">
//     <Link to={linkResolver(linkTo)}>
//       <article
//         className="highlight-feature border-color"
//         style={{
//           backgroundImage: `url(${image.url})`,
//         }}
//       >
//         <div className="highlight-details">
//           <div className="content">
//             <span className="tag is-outlined is-rounded is-black is-hidden-mobile">
//               {article_category}
//             </span>
//             <NanoClamp
//               className="title is-5 is-size-6-touch is-size-7-mobile"
//               is="p"
//               lines={2}
//               text={RichText.asText(article_headline)}
//             />
//             <NanoClamp
//               className="subtitle is-7 is-hidden-touch"
//               is="p"
//               lines={1}
//               text={RichText.asText(article_subtitle)}
//             />
//           </div>
//         </div>
//       </article>
//     </Link>
//   </div>
// )
export default HighlightFeature
