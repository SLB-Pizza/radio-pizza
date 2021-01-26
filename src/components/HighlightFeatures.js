import React from 'react'
import NanoClamp from 'nanoclamp'
import { RichText } from 'prismic-reactjs'
import { Link } from 'gatsby'
import { SingleFeatureCard } from '../components'
import { htmlSerializer, linkResolver } from '../utils'

function HighlightFeatures({ titling, leftFeature, rightFeature }) {
  // Dictates SingleFeatureCard layout
  const highlightFeatureLayout = 'column is-12-mobile is-6 tablet'

  return (
    <section
      className="section container is-fluid highlight-features"
      style={{ backgroundColor: '#f600ff' }}
    >
      <h2 className="title hero-title">{titling}</h2>
      <div className="columns is-mobile">
        <SingleFeatureCard
          featureData={leftFeature}
          featureColumnLayout={highlightFeatureLayout}
        />
        <SingleFeatureCard
          featureData={rightFeature}
          featureColumnLayout={highlightFeatureLayout}
        />
      </div>
    </section>
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
export default HighlightFeatures
