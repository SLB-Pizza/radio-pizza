import React from "react";

export default function StickyFeature({ leadFeatureData }) {
  const {
    feature_headline_img,
    feature_category,
    feature_subcategory,
    feature_headline,
    feature_subtitle,
    feature_author,
    feature_author_pic,
  } = leadFeatureData.primary;

  const DummyColumn = () => (
    <div className="column is-one-third">
      <figure className="image is-16by9">
        <img src={feature_headline_img.url} alt={feature_headline_img.alt} />
      </figure>
    </div>
  );

  return (
    <>
      <section className="container is-fluid">
        <div className="columns is-mobile lead-feature">
          <div className="column is-full">
            <figure className="image is-32by9">
              <img
                src={feature_headline_img.url}
                alt={feature_headline_img.alt}
              />
            </figure>
          </div>
        </div>
        <div className="columns is-mobile is-multiline">
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
        </div>
      </section>
    </>
  );
}
