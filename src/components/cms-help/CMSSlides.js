import React from "react";
import { RichText } from "prismic-reactjs";

export default function CMSSlides(props) {
  const { slideData } = props;

  return (
    <section className="columns is-multiline cms-section" id="slides">
      <div className="column is-12">
        <div className="content">
          <h2 className="subtitle">Sample Slide</h2>
          <p>
            NB: This example uses the <em>current</em> first slide in the Hero
            Carousel.
          </p>
        </div>
      </div>
      <div className="column is-half-desktop">
        <div className="content">
          <h4 className="subtitle">Background Image for Carousel Slide</h4>
        </div>
        <figure className="image is-16by9">
          <img src={slideData.bgUrl} alt={slideData.bgAlt} />
        </figure>
      </div>
      <div className="column is-half-desktop is-flex-desktop">
        <div
          className={
            slideData.bgAlt === null ? "content cms-warning" : "content"
          }
        >
          <h4 className="subtitle">
            Does this BG image have alt text?
            {slideData.bgAlt === null ? " ❌ NO" : " ✅ YES"}
          </h4>
          {slideData.bgAlt === null ? (
            <>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Accessibility_concerns"
                target="_blank"
                rel="noopener"
              >
                <button className="button is-small is-rounded">
                  Alt text is important! Here's why →
                </button>
              </a>
              <ol>
                <li>
                  <a
                    href="https://hmbk-cms.prismic.io/medias/"
                    target="_blank"
                    rel="noopener"
                  >
                    Head to the HMBK CMS Media Library
                  </a>
                </li>
                <li>
                  Find the image(s) without alt text and add a short text
                  description of the image to the <em>Alternative Text</em>{" "}
                  field in the top right.
                </li>
                <li>
                  Make sure <strong>ALL IMAGES</strong> in the Media Library
                  have alt text!
                </li>
              </ol>
            </>
          ) : (
            <p>{slideData.bgAlt}</p>
          )}
        </div>
        <div>
          <h4 className="subtitle">Slide Headline</h4>
          <p>
            {">"} {RichText.asText(slideData.slideHeadline)}
          </p>
        </div>
        <div>
          <h4 className="subtitle">Slide Call To Action</h4>
          <p>
            {">"} {RichText.asText(slideData.slideCta)}
          </p>
        </div>
        <div
          className={slideData.slideLinkTarget === "null" ? "cms-warning" : ""}
        >
          <h4 className="subtitle">Slide Link</h4>
          <p>
            {">"} {slideData.slideLink}
          </p>
          <p>
            Opens in new tab?{" "}
            {slideData.slideLinkTarget === "null" ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </section>
  );
}
