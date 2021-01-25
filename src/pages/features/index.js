import React from 'react'
import { Link, graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import {
  MainFeatureArticle,
  HighlightFeature,
  FeatureArticleTile,
  LandingPageElement,
  StickyFeature,
  SingleFeatureCard,
} from '../../components'
import { htmlSerializer } from '../../utils'
import PropTypes from 'prop-types'

/**
 * @category Pages
 * @subcategory Indexes
 * @function FeaturesIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/features` landing page
 */
function FeaturesIndex({ data }) {
  /**
   * Focus the node for the allFeaturesData check below.
   */
  const featuresHeaderData = data.prismic.allLandingpages.edges[0].node
  const allFeaturesData = data.prismic.allFeatures.edges

  /**
   * This line is here to prevent an error from occurring when you eventually deploy the site live. There is an issue with the preview functionality that requires this check on every page.
   * @see https://prismic.io/docs/gatsby/rendering/retrieve-the-document-object#21_0-adding-a-validation-check
   */
  if (!allFeaturesData || !featuresHeaderData) return null

  /**
   * Grab the first node object from the allFeaturesData array of nodes to pass as leadfeatureData prop to StickyFeature.
   *
   * The data from the 'FeaturesIndexPage' query comes pre-sorted to show the most recent published feature, NOT the most recently updated.
   *
   * The remaining array of node objects can be mapped over normally using XYZ_Component.
   */

  /**
   * Break down featuresHeaderData for use
   */

  const {
    features_page_header,
    features_page_subtitle,
    bottom_right_feature,
    top_right_feature,
    main_feature_article,
  } = featuresHeaderData

  const backdropImg =
    main_feature_article.headline_block[0].primary.article_headline_img ?? null

  const featuresHeadline = features_page_header ?? 'Features'
  const featuresSubheadline =
    features_page_subtitle ?? 'Your music, residents and more, in depth.'

  const lfLayout = 'column is-12 landing-page-element'
  const lfImageAspectRatio = 'image is-2by1'

  const allOtherFeatures = allFeaturesData.slice(1)
  const aofLayout = 'column is-6 landing-page-element'
  const aofImageAspectRatio = 'image is-16by9'

  const featuresPageLayout = 'column is-12-mobile is-6-tablet is-4-desktop'

  return (
    <main className="full-height-page" id="features">
      <header className="hero has-background">
        <img
          className="hero-background"
          src={backdropImg.url}
          alt={backdropImg.alt}
        />
        <div className="hero-body">
          <div className="container is-fluid">
            <header className="title is-size-1 is-size-3-touch hero-title">
              features
            </header>
            <MainFeatureArticle articleData={main_feature_article} />
            {/* <div className="columns is-mobile secondary-features">
            </div> */}
          </div>
        </div>
      </header>
      <section className="highlight-features">
        <HighlightFeature articleData={top_right_feature} />
        <HighlightFeature articleData={bottom_right_feature} />
      </section>
      <section className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          {allFeaturesData.length &&
            allFeaturesData.map(({ node }, index) => (
              <SingleFeatureCard
                key={`halfmoon-feature-${index}`}
                featureData={node}
                featureColumnLayout={featuresPageLayout}
              />
            ))}
        </div>
      </section>
      <pre>
        main_feature_article {JSON.stringify(main_feature_article, null, 2)}
      </pre>
    </main>
  )

  // Current state
  // return (
  //   <main className="full-height-page" id="features">
  //     <section
  //       className="hero homepage-hero"
  //       style={{
  //         backgroundImage: backdropImgUrl ? `url(${backdropImgUrl})` : null,
  //       }}
  //     >
  //       <div className="hero-body">
  //         <div className="container is-fluid">
  //           <header className="title is-size-1 is-size-3-touch hero-title">
  //             features
  //           </header>
  //           <MainFeatureArticle articleData={main_feature_article} />
  //           <div className="columns is-mobile secondary-features">
  //             <HighlightFeature articleData={top_right_feature} />
  //             <HighlightFeature articleData={bottom_right_feature} />
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     <pre>
  //       main_feature_article {JSON.stringify(main_feature_article, null, 2)}
  //     </pre>
  //   </main>
  // );

  // return (
  //   <main className="container is-fluid black-bg-page">
  //     <section className="columns is-multiline is-mobile">
  //       <div className="column is-12">
  //         <div className="content">
  //           {/*
  //             If string : using default value; use RichText.asText
  //             Else      : content from Prismic, use RichText render
  //           */}
  //           {typeof featuresHeadline !== "string" ? (
  //             <RichText
  //               render={featuresHeadline}
  //               htmlSerializer={htmlSerializer}
  //             />
  //           ) : (
  //             <h1 className="title">{RichText.asText(featuresHeadline)}</h1>
  //           )}
  //           {typeof featuresSubheadline !== "string" ? (
  //             <RichText
  //               render={featuresSubheadline}
  //               htmlSerializer={htmlSerializer}
  //             />
  //           ) : (
  //             <h1 className="title">{RichText.asText(featuresSubheadline)}</h1>
  //           )}

  //           {/* <h1 className="title is-size-2-widescreen is-size-3-desktop is-size-4-touch">
  //             Features
  //           </h1>
  //           <h4 className="subtitle is-size-6-touch">
  //             Your reference for Prismic CMS, image guidelines, editorial
  //             standards and more.
  //           </h4> */}
  //         </div>
  //       </div>
  //     </section>

  //     {/* Featured Articles Section */}
  //     <section className="tile is-ancestor has-background-primary">
  //       <div className="tile is-parent is-6">
  //         <FeatureArticleTile data={main_feature_article} />
  //       </div>
  //       <div className="tile is-vertical">
  //         {/* LEFT 8 COLUMNS */}
  //         <div className="tile is-parent">
  //           <FeatureArticleTile
  //             secondaryFeature={true}
  //             data={top_right_feature}
  //           />
  //         </div>
  //         <div className="tile is-parent">
  //           <FeatureArticleTile
  //             secondaryFeature={true}
  //             data={bottom_right_feature}
  //           />
  //         </div>
  //       </div>
  //     </section>

  //     <pre>
  //       featuresHeaderData {JSON.stringify(featuresHeaderData, null, 2)}
  //     </pre>
  //     {/* <section
  //       className="columns is-multiline is-mobile has-background-info"
  //       id="featured-articles"
  //     >
  //       <div className="column is-6-widescreen has-background-dark">
  //         <article className="content">
  //           <h1 className="title">Title</h1>
  //           <p className="subtitle">Subtitle summarizing the content below.</p>
  //           <p>
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
  //             ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
  //             non massa sem. Etiam finibus odio quis feugiat facilisis.
  //           </p>
  //         </article>
  //       </div>

  //       <div className="column is-6-widescreen" id="secondary-articles">
  //         <div className="columns">
  //           <div className="column has-background-dark">
  //             <article className="content">
  //               <h1 className="title">Title</h1>
  //               <p className="subtitle">
  //                 Subtitle summarizing the content below.
  //               </p>
  //               <p>
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
  //                 ornare magna eros, eu pellentesque tortor vestibulum ut.
  //                 Maecenas non massa sem. Etiam finibus odio quis feugiat
  //                 facilisis.
  //               </p>
  //             </article>
  //           </div>
  //         </div>
  //         <div className="columns">
  //           <div className="column has-background-dark">
  //             <article className="content">
  //               <h1 className="title">Title</h1>
  //               <p className="subtitle">
  //                 Subtitle summarizing the content below.
  //               </p>
  //               <p>
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
  //                 ornare magna eros, eu pellentesque tortor vestibulum ut.
  //                 Maecenas non massa sem. Etiam finibus odio quis feugiat
  //                 facilisis.
  //               </p>
  //             </article>
  //           </div>
  //           <div className="column has-background-dark">
  //             <article className="content">
  //               <h1 className="title">Title</h1>
  //               <p className="subtitle">
  //                 Subtitle summarizing the content below.
  //               </p>
  //               <p>
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
  //                 ornare magna eros, eu pellentesque tortor vestibulum ut.
  //                 Maecenas non massa sem. Etiam finibus odio quis feugiat
  //                 facilisis.
  //               </p>
  //             </article>
  //           </div>
  //         </div>
  //       </div>
  //     </section> */}

  //     {/* Other Articles Section */}

  //     {/* Lead Feature */}
  //     {/* <LandingPageElement
  //         pageElement={leadFeatureData}
  //         layout={lfLayout}
  //         imageAspectRatio={lfImageAspectRatio}
  //       /> */}

  //     {/* All other Features */}
  //     {/* {allOtherFeatures.map((singleFeature, index) => (
  //         <LandingPageElement
  //           key={`Feature-#${index + 1}`}
  //           pageElement={singleFeature}
  //           layout={aofLayout}
  //           imageAspectRatio={aofImageAspectRatio}
  //         />
  //       ))} */}

  //     {/* <div className="column is-12">
  //         <h1 className="title">leadFeatureData Data Object</h1>
  //         <pre>{JSON.stringify(leadFeatureData, null, 2)}</pre>
  //       </div>
  //       <div className="column is-12">
  //         <h1 className="title">allOtherFeatures Data Object</h1>
  //         <pre>{JSON.stringify(allOtherFeatures, null, 2)}</pre>
  //       </div> */}
  //   </main>
  // );
}

FeaturesIndex.propTypes = {
  leadFeatureData: PropTypes.exact({
    _meta: PropTypes.object.isRequired,
    body: PropTypes.arrayOf(PropTypes.object),
  }),
  allOtherFeatures: PropTypes.arrayOf(PropTypes.object),
}

export const query = graphql`
  query FeaturesIndexPage {
    prismic {
      allLandingpages {
        edges {
          node {
            features_page_header
            features_page_subtitle
            main_feature_article {
              ... on PRISMIC_Feature {
                _linkType
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                headline_block {
                  ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                    primary {
                      article_headline_img
                      article_headline
                      article_category
                      article_subcategory
                      article_subtitle
                    }
                  }
                }
              }
            }
            top_right_feature {
              ... on PRISMIC_Feature {
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                headline_block {
                  ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                    type
                    primary {
                      article_headline_img
                      article_headline
                      article_category
                      article_subtitle
                    }
                  }
                }
              }
            }
            bottom_right_feature {
              ... on PRISMIC_Feature {
                _linkType
                _meta {
                  uid
                  type
                  lastPublicationDate
                  firstPublicationDate
                }
                headline_block {
                  ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                    primary {
                      article_headline_img
                      article_headline
                      article_category
                      article_subtitle
                    }
                  }
                }
              }
            }
          }
        }
      }
      allFeatures(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              firstPublicationDate
              lastPublicationDate
              type
              tags
            }
            headline_block {
              ... on PRISMIC_FeatureHeadline_blockHeadline_block {
                primary {
                  article_headline_img
                  article_headline
                  article_subcategory
                  article_subtitle
                }
              }
            }
          }
        }
      }
    }
  }
`

// export const query = graphql`
//   query FeaturesIndexPage {
//     prismic {
//       allFeatures(sortBy: meta_firstPublicationDate_DESC) {
//         edges {
//           node {
//             _meta {
//               uid
//               firstPublicationDate
//               lastPublicationDate
//               type
//               tags
//             }
//             body {
//               ... on PRISMIC_FeatureBodyHeadline_block {
//                 type
//                 primary {
//                   article_headline
//                   article_headline_img
//                   article_subcategory
//                   article_subtitle
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `

export default FeaturesIndex
