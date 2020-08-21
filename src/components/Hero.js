import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import slideGenerator from "../utils/slideGenerator";

/**
 * @category Site Elements
 * @subcategory Layout Section
 * @function HeroCarousel
 * @param {Object[]} slides - An array containing data objects from the HomePage query to process and display as slides
 * @returns {jsx} the complete Slider element with slides created by {@link slideGenerator}
 */
function HeroCarousel({ slides }) {
  /**
   * Amount of time in ms to stay on each slide before <Slider> auto moves to next slide; preset to 8000
   */
  const timePerSlide = 8000;

  /**
   * Style object for bullets to pass as props for <Slider>
   */
  const heroBullets = { backgroundColor: "#000", border: "2px solid white" };

  /**
   * Style object for arrows to pass as props for <Slider>
   */
  const heroArrows = {
    border: "solid white",
    margin: "auto 3rem auto 2rem",
    borderWidth: "0 10px 10px 0",
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
        {slideGenerator(slides)}
      </Slider>
    </div>
  );
}

export default HeroCarousel;
