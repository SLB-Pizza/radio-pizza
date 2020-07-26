import React, { useState, useEffect, useCallback } from "react";
import Slider from "@farbenmeer/react-spring-slider";
import { HomeContent } from "../../components/index";
import { navigate } from "gatsby";

const slides = [
  {
    id: 0,
    url: "https://source.unsplash.com/1920x1080/daily?coffee",
    text: "Slide 0",
    internalLink: "/events",
  },
  {
    id: 1,
    url: "https://source.unsplash.com/1920x1080/daily?music",
    text: "Slide 2",
    internalLink: "/bio",
  },
  {
    id: 2,
    url: "https://source.unsplash.com/1920x1080/daily?headphones",
    text: "Slide 3",
    internalLink: "/mixes",
  },
  {
    id: 3,
    url: "https://source.unsplash.com/1920x1080/daily?food",
    text: "Slide 4",
    internalLink: "/search",
  },
];

function ReactSpringSlider() {
  const coffee = "https://source.unsplash.com/1920x1080/daily?coffee";

  const slideGenerator = (slidesArr) => {
    return slidesArr.map((slide, idx) => (
      <div
        key={idx}
        className="container is-fluid"
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
        <div className="columns">
          <div className="column">
            <p className="title is-size-1 has-text-centered">Source #{idx}</p>
            <p>Go to {slide.internalLink}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="site-page">
      <div
        style={{
          width: "100vw",
          height: `calc(100vh - 10.5rem)`,
        }}
      >
        <Slider auto={8000} hasBullets hasArrows>
          {slideGenerator(slides)}
        </Slider>
      </div>

      <HomeContent />
    </div>
  );
}

export default ReactSpringSlider;

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
