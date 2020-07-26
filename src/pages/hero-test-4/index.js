import React, { useState, useEffect, useCallback } from "react";
import Slider from "@farbenmeer/react-spring-slider";
import { HomeContent } from "../../components/index";
import { navigate } from "gatsby";

const slides = [
  {
    url: "https://source.unsplash.com/1920x1080/daily?coffee",
    text: "Slide 0",
    internalLink: "/events",
  },
  {
    url: "https://source.unsplash.com/1920x1080/daily?music",
    text: "Slide 2",
    internalLink: "/bio",
  },
  {
    url: "https://source.unsplash.com/1920x1080/daily?headphones",
    text: "Slide 3",
    internalLink: "/mixes",
  },
  {
    url: "https://source.unsplash.com/1920x1080/daily?food",
    text: "Slide 4",
    internalLink: "/search",
  },
];

function ReactSpringSlider() {
  const slideGenerator = (slidesArr) => {
    return slidesArr.map((slide, idx) => (
      <section
        key={idx}
        className="hero is-fullheight-with-navbar"
        draggable="false"
        onClick={() => {
          navigate(`${slide.internalLink}`);
        }}
        style={{
          height: `calc(100vh - 10.5rem)`,
          backgroundImage: `url(${slide.url})`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
        }}
      >
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <h1 className="title hero-title">Source #{idx}</h1>
                <h2>Go to {slide.internalLink}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    ));
  };

  return (
    <div className="site-page">
      <div
        style={{
          width: "100vw",
          height: `calc(100vh - 10.75rem)`,
        }}
      >
        <Slider auto={2000} hasBullets hasArrows>
          {slideGenerator(slides)}
        </Slider>
      </div>

      <HomeContent />
    </div>
  );
}

export default ReactSpringSlider;

// const slideGenerator = (slidesArr) => {
//   return slidesArr.map((slide, idx) => (
//     <div
//       key={idx}
//       className="container is-fluid"
//       draggable="false"
//       onClick={() => {
//         navigate(`${slide.internalLink}`);
//       }}
//       style={{
//         height: `calc(100vh - 10.5rem)`,
//         backgroundImage: `url(${slide.url})`,
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "scroll",
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="columns">
//         <div className="column">
//           <p className="title is-size-1 has-text-centered">Source #{idx}</p>
//           <p>Go to {slide.internalLink}</p>
//         </div>
//       </div>
//     </div>
//   ));
// };

// function layoutGenerator(layouts) {
//   return layouts.map((layout, idx) => (
//     <div key={`${idx} - ${layout.text}`} className="container is-fluid">
//       <div
//         className="columns"
//         style={{
//           backgroundImage: `${layout.url}`,
// backgroundPosition: "center center",
// backgroundRepeat: "no-repeat",
// backgroundAttachment: "scroll",
// backgroundSize: "cover",
//         }}
//       >
//         {console.log(layout)}
//         <div className="column">
//           <p className="title is-size-3-mobile is-size-1-tablet has-text-centered">
//             {layout.text}
//           </p>
//         </div>
//       </div>
//       {/* <div className="columns">
//         <div className="column">Column 1</div>
//         <div className="column">Column 2</div>
//         <div className="column">Column 3</div>
//         <div className="column">Column 4</div>
//         <div className="column">Column 5</div>
//       </div> */}
//     </div>
//   ));
// }

// style={{
//   maxHeight: `calc((100vh - 10.5rem))`,
//   backgroundImage: `url(${coffee})`,
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   backgroundAttachment: "scroll",
//   backgroundSize: "cover",
// }}
