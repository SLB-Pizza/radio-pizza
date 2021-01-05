import React from 'react'

function FeatureArticleTile({ secondaryFeature }) {
  return (
    <article className="tile is-child box">
      <div className="article-image">
        <figure className="image">
          <img src="https://dummyimage.com/1500x500/123eac/fff.jpg" />
        </figure>
      </div>
      {!secondaryFeature ? (
        <div className="article-content">
          <p className="title">Title</p>
          <p className="subtitle">Subtitle</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
      ) : (
        <div className="article-content">
          <p className="title is-5">Title</p>
          <p className="subtitle is-7">Subtitle</p>
          <p className="is-size-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </div>
      )}
    </article>
  )
}

export default FeatureArticleTile
