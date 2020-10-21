import React from 'react'
import processPublicationDates from '../utils/processPublicationDates'

export default function StickyFeature({ leadFeatureData }) {
  /**
   * leadFeatureData is an object with "_meta" and "body" keys available
   */

  // console.log("StickyFeature > {leadFeatureData}", leadFeatureData);
  const {
    feature_headline_img,
    feature_category,
    feature_subcategory,
    feature_headline,
    feature_subtitle,
    feature_author,
    feature_author_pic,
  } = leadFeatureData.body[0].primary

  // const DummyColumn = () => {
  //   return (
  //     <>
  //       <div className="column is-3"></div>
  //       <div className="column is-9">
  //         <figure className="image is-3by1">
  //           <img
  //             src={feature_headline_img.url}
  //             alt={feature_headline_img.alt}
  //           />
  //         </figure>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <section className="container is-fluid">
        <div className="columns is-mobile">
          <div className="column is-3">No variables</div>
          <div className="column is-9">
            <figure className="image is-3by1">
              <img
                src={feature_headline_img.url}
                alt={feature_headline_img.alt}
              />
            </figure>
          </div>
        </div>
        {/* <div className="columns is-mobile is-multiline other-features">
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
          <DummyColumn />
        </div>*/}
      </section>
    </>
  )
}
