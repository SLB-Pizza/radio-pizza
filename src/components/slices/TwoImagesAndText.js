import React from "react";

/**
 * @function TwoImagesAndText
 * @param {object} { slice }
 * @returns {jsx}
 */
function TwoImagesAndText({ slice }) {
  const threeEvenColumnsObj = {
    "section-1": "column is-one-third",
    "section-2": "column is-one-third",
    "section-3": "column is-one-third",
  };

  const halfLeftObj = {
    "section-1": "column is-half",
    "section-2": "column is-one-quarter",
    "section-3": "column is-one-quarter",
  };
  const halfRightObj = {
    "section-1": "column is-one-quarter",
    "section-2": "column is-one-quarter",
    "section-3": "column is-half",
  };
  return (
    <section className="container">
      <div className="columns is-mobile">
        <div className="column is-4">
          <figure className="image is-square">
            <img src={`../../static/img/test/bright-forest.png`} />
          </figure>
        </div>
        <div className="column is-4">
          <figure className="image is-square">
            <img src={`../../static/img/test/fantasy-forest.png`} />
          </figure>
        </div>
        <div className="column is-4">
          <div className="content">
            <p>
              HODOR? Hodor hodor! Hodor... Hodor hodor. Hodor! Hodor hodor.
              Hodor? Hodor, hodor, hodor hodor.
            </p>
            <p>
              HODOR HODOR! Hodor, hodor. Hodor. Hodor. Hodor, hodor. Hodor.
              Hodor. Hodor, hodor, hodor hodor. HODOR HODOR! Hodor hodor HODOR!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TwoImagesAndText;
