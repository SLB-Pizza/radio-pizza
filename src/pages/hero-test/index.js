import React from "react";
import { Carousel } from "react-responsive-carousel";

function HeroTest() {
  const testImgs = [
    "https://source.unsplash.com/1920x1080/?movies",
    "https://source.unsplash.com/1920x1080/?food",
    "https://source.unsplash.com/1920x1080/?water",
  ];

  const carouselOptions = {};

  const makeHeroTestImgs = (array) => {
    return array.map((image) => (
      <div>
        <img src={image} />
        <p className="legend">Movies</p>
      </div>
    ));
  };

  return (
    <div className="container is-fluid site-content">
      <div className="columns is-mobile">
        <div className="column is-full">
          <Carousel>{makeHeroTestImgs(testImgs)}</Carousel>
        </div>
      </div>
    </div>
  );
}

export default HeroTest;
