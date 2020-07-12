import React from "react";
import Slider from "react-slick";

function Hero(props) {
  const settings = {
    adaptiveHeight: true,
    dots: false,
    fade: true,
    infinite: true,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return (
    <div className="homepage-hero">
      <div className="container is-fluid">
        <Slider {...settings}>
          <div
            className="columns"
            style={{
              backgroundImage:
                "https://source.unsplash.com/1920x1080/daily?coffee",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
              backgroundSize: "cover",
            }}
          >
            <div className="columns">
              <img
                src="https://source.unsplash.com/1920x1080/daily?guitar"
                alt="guitar"
              />
            </div>
          </div>
          <div className="columns">
            <img
              src="https://source.unsplash.com/1920x1080/daily?headphones"
              alt="headphones"
            />
          </div>
          <div className="columns">
            <div className="column">
              <img
                src="https://source.unsplash.com/1920x1080/daily?concert"
                alt="concert"
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <img
                src="https://source.unsplash.com/1920x1080/daily?musician"
                alt="musician"
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Hero;

// return (
// <div className="container is-fluid">
//   <div className="columns">
//     <div className="column">
//       <p className="title is-size-3-mobile is-size-1-tablet has-text-centered">
//         Sources
//       </p>
//     </div>
//   </div>
//       <div className="columns">
//         <div className="column">{props.soundcloudBtn}</div>
//         <div className="column">{props.mixcloudBtn}</div>
//         <div className="column">{props.radioCoBtn}</div>
//         <div className="column">{props.youtubeBtn}</div>
//         <div className="column">{props.vimeoBtn}</div>
//       </div>
//     </div>
//   </div>
// );
