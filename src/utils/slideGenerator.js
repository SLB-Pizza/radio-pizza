import React from "react";
import { navigate } from "gatsby";
import { RichText } from "prismic-reactjs";

/**
 * @category Site Elements
 * @subcategory Layout Helper
 * @function slideGenerator
 * @param {Object[]} slidesArray - An array containing data objects from the GraphQL query for the home page.
 * @property {Object} slide - data object containing the details used to build the slide
 * @property {String} slide.slide_bg_url.url - The URL from Prismic of that slide's background image. This can be a relative local path (e.g. "/static/something-local.jpg") or an external image link (e.g. "https://source.unsplash.com/1920x1080/daily?music"). Both work.
 * @property {String} slide.slide_headline - Short string announcing that slide's content
 * @property {String} slide.slide_cta - Medium string giving context to that slide's content; might be a call to action or a breadcrumb for the reader
 * @property {String} slide.slide_link.url - The link to navigate to onClick, This can either be an internal link (e.g. "/events"), or an external link (e.g. "https://www.instagram.com").
 * @returns {jsx} a complete layout fragment for use in the return statement, inside the <Slider> component
 */
function slideGenerator(slidesArray) {
  return slidesArray.map((slide, idx) => (
    <section
      key={`hero-slide-#${idx}`}
      className="hero is-fullheight-with-navbar homepage-hero"
      onClick={() => {
        navigate(`${slide.slide_link.url}`);
      }}
      style={{
        backgroundImage: `url(${slide.slide_bg_url.url})`,
      }}
    >
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 className="title is-size-1-desktop is-size-3-touch is-size-5-mobile hero-title">
                {RichText.asText(slide.slide_headline)}
              </h1>
              <br />
              <h2 className="subtitle is-size-5-desktop is-size-5-touch is-size-7-mobile hero-title cta">
                {RichText.asText(slide.slide_cta)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  ));
}

export default slideGenerator;
