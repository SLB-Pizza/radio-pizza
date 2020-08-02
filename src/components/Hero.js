import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import { navigate } from "gatsby";
import { RichText } from "prismic-reactjs";

const dummySlides = [
  {
    layout_bg_image: "https://source.unsplash.com/1920x1080/daily?music",
    slide_headline: "/bio",
    slide_cta: "Music your way instrument jazz saxophone big boom bap sound.",
    slide_link: "/bio",
  },
  {
    layout_bg_image: "https://source.unsplash.com/1920x1080/daily?headphones",
    slide_headline: "Slide 3",
    slide_cta: "Expertly crafted aural experience hand-made artisan materials.",
    slide_link: "/mixes",
  },
  {
    layout_bg_image: "https://source.unsplash.com/1920x1080/daily?food",
    slide_headline: "Slide 4",
    slide_cta: "Finest dishes meal dinner family time barbeque on a stick.",
    slide_link: "/search",
  },
  {
    layout_bg_image: "https://source.unsplash.com/1920x1080/daily?concert",
    slide_headline: "External Link",
    slide_cta: "Click anywhere on this slide; it links to HMBK twitter.",
    slide_link: "https://twitter.com/halfmoonbk",
  },
];

function HeroContentCarousel(props) {
  /**
   * @function slideGenerator
   * @param {Object[]} slidesArray - An array containing data objects from the GraphQL query for the home page.
   * @param {string} slidesArray[].layout_bg_image - The URL from Prismic of that slide's background image. This can be a relative local path (e.g. "/static/something-local.jpg") or an external image link (e.g. "https://source.unsplash.com/1920x1080/daily?music"). Both work.
   * @param {string} slidesArray[].slide_headline - Short string announcing that slide's content
   * @param {string} slidesArray[].slide_cta - Medium string giving context to that slide's content; might be a call to action or a breadcrumb for the reader
   * @param {string} slidesArray[].slide_link - The link to navigate to onClick, This can either be an internal link (e.g. "/events"), or an external link (e.g. "https://www.instagram.com").
   * @returns {jsx} a complete layout fragment for use in the return statement, inside the <Slider> component
   */
  const slideGenerator = (slidesArray) => {
    return slidesArray.map((slide, idx) => (
      <section
        key={idx}
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
                <h1 className="title is-size-3-desktop is-size-5-touch is-size-6-mobile hero-title">
                  {RichText.asText(slide.slide_headline)}
                </h1>
                <br />
                <h2 className="subtitle is-size-5-desktop is-size-6-touch is-size-7-mobile hero-title">
                  {RichText.asText(slide.slide_cta)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    ));
  };

  /**
   * @param {number} timePerSlide - amount of time in ms to stay on each slide before <Slider> auto moves to next slide; preset to 8000
   * @param {object} heroBullets - style object for bullets to pass as props for <Slider>
   * @param {object} heroArrows - style object for arrows to pass as props for <Slider>
   */

  const timePerSlide = 8000;
  const heroBullets = { backgroundColor: "#000", border: "2px solid white" };
  const heroArrows = {
    border: "solid white",
    borderWidth: "0 5px 5px 0",
    color: "black",
  };

  return (
    <div className="slider-sizing">
      <Slider
        auto={timePerSlide}
        hasArrows
        arrowStyle={heroArrows}
        hasBullets
        bulletStyle={heroBullets}
      >
        {}
        {slideGenerator(props.slides)}
      </Slider>
    </div>
  );
}

export default HeroContentCarousel;
