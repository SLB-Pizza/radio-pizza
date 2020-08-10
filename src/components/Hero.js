import React from "react";
import Slider from "@farbenmeer/react-spring-slider";
import slideGenerator from "../utils/slideGenerator";

function HeroContentCarousel(props) {
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
        {slideGenerator(props.slides)}
      </Slider>
    </div>
  );
}

export default HeroContentCarousel;
