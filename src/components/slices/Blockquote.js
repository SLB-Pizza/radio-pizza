import React from "react";

// const Blockquote = ( { slice }) => {
const Blockquote = (props) => {
  const { bgUrl } = props;

  let imgStyle = null;
  if (bgUrl) {
    imgStyle = {
      backgroundImage: `url(${bgUrl})`,
    };
  }

  return (
    <section className="hero sample-feature" style={imgStyle}>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <blockquote className="is-size-1-desktop is-size-3-tablet is-size-4-mobile">
              If we open a quarrel between past and present, we shall find that
              we have lost the future.
            </blockquote>
            <cite className="is-size-4-desktop is-size-5-tablet is-size-6-mobile has-text-right">
              Winston Churchill
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blockquote;
