import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import { navigate } from "gatsby";

const dummySlides = [
  {
    bgUrl: "/static/terraformer-ed094d03f2e3f0b51bf4af47d56a6370.jpg",
    headline: "Slide 1",
    blurb: "Something incredible is waiting to be known - the sky calls to us.",
    contentLink: "https://www.instagram.com/?hl=en",
  },
  {
    bgUrl: "https://source.unsplash.com/1920x1080/daily?music",
    headline: "Slide 2",
    blurb: "Music your way instrument jazz saxophone big boom bap sound.",
    contentLink: "/bio",
  },
  {
    bgUrl: "https://source.unsplash.com/1920x1080/daily?headphones",
    headline: "Slide 3",
    blurb: "Expertly crafted aural experience hand-made artisan materials.",
    contentLink: "/mixes",
  },
  {
    bgUrl: "https://source.unsplash.com/1920x1080/daily?food",
    headline: "Slide 4",
    blurb: "Finest dishes meal dinner family time barbeque on a stick.",
    contentLink: "/search",
  },
];

function HeroContentCarousel() {
  /**
   * @function slideGenerator
   * @param {Object[]} slidesArr - An array containing data objects from the GraphQL query for the home page.
   * @param {string} slidesArr[].bgUrl - The URL of that slide's background image. This can be a relative local path (e.g. "/static/something-local.jpg") or an external image link (e.g. "https://source.unsplash.com/1920x1080/daily?music"). Both work
   * @param {string} slidesArr[].headline - Short string announcing that slide's content
   * @param {string} slidesArr[].blurb - Medium string giving context to that slide's content; might be a call to action or a breadcrumb for the reader
   * @param {string} slidesArr[].contentLink - The link to navigate to onClick, This can either be an internal link (e.g. "/events"), or an external link (e.g. "https://www.instagram.com").
   * @returns {jsx} a complete layout fragment for use in the return statement, inside the <Slider> component
   */

  const slideGenerator = (slidesArr) => {
    return slidesArr.map((slide, idx) => (
      <section
        key={idx}
        className="hero is-fullheight-with-navbar homepage-hero"
        onClick={() => {
          navigate(`${slide.contentLink}`);
        }}
        style={{
          backgroundImage: `url(${slide.bgUrl})`,
        }}
      >
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title is-size-3-desktop is-size-4-touch hero-title">
                  {slide.headline}
                </h1>
                <br />
                <h2 className="subtitle is-size-5-desktop is-size-6-touch hero-title">
                  {slide.blurb}
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
   * @param {object} heroBullets - style object to pass as props for <Slider>
   */
  const timePerSlide = 8000;
  const heroBullets = { backgroundColor: "#000", border: "2px solid white" };

  return (
    <div className="slider-sizing">
      <Slider auto={timePerSlide} hasBullets bulletStyle={heroBullets}>
        {slideGenerator(dummySlides)}
      </Slider>
    </div>
  );
}

export default HeroContentCarousel;
