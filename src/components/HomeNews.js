import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { HomeSingleNews } from './index'

function HomeFeatures({ headline, blurb, homeFeaturesData }) {
  return (
    <div className="container is-fluid" id="home-news">
      {/* DESKTOP */}
      <div className="columns is-hidden-touch">
        <div className="column is-3">
          <div className="sticky-section-blurb content">
            <p className="title">{RichText.asText(headline)}</p>
            <p className="subtitle">{RichText.render(blurb)}</p>

            <Link to="/features">
              <button className="button is-outlined is-rounded">
                All Features
              </button>
            </Link>
          </div>
        </div>

        <div className="column is-9">
          <div className="columns is-multiline">
            {homeFeaturesData.map((singleFeature, index) => {
              const { _meta, headline_block } = singleFeature.node

              return (
                // <pre>node {JSON.stringify(singleFeature, null, 2)}</pre>
                <HomeSingleNews
                  key={`index-#${index}-home-feature`}
                  metadata={_meta}
                  body={headline_block}
                />
              )
            })}
          </div>
        </div>
      </div>
      {/*
      Touch Sizes
      */}
      <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
        <div className="column">
          <p className="title is-4">{RichText.asText(headline)}</p>
          <p className="subtitle is-6">{RichText.asText(blurb)}</p>
        </div>
        <div className="column is-narrow">
          <Link to="/features">
            <button className="button is-small is-outlined is-rounded">
              All Features
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile is-hidden-desktop mobile-single-items">
        {homeFeaturesData.map((singleFeature, index) => {
          const { _meta, headline_block } = singleFeature.node

          return (
            // <pre>node{JSON.stringify(singleFeature, null, 2)}</pre>
            <HomeSingleNews
              key={`index-#${index}-home-feature`}
              metadata={_meta}
              body={headline_block}
            />
          )
        })}
      </div>
    </div>
  )
}

export default HomeFeatures
