import React, { useState, useEffect, useCallback } from "react";
import Slider from "@farbenmeer/react-spring-slider";
import { HomeContent } from "../../components/index";
import { navigate } from "gatsby";

const dummySlides = [
  {
    bgUrl: "https://source.unsplash.com/1920x1080/daily?space",
    headline: "Slide 0",
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

function ReactSpringSlider() {
  /**
   * @function slideGenerator
   * @param {Object[]} slidesArr - An array containing data objects from the GraphQL query for the home page.
   * @param {string} slidesArr[].bgUrl - The location of that slides background image
   * @param {string} slidesArr[].headline - Short string announcing that slide's content
   * @param {string} slidesArr[].blurb - Medium string giving context to that slide's content; might be a call to action or a breadcrumb for the reader
   * @param {string} slidesArr[].contentLink - This can either be an internal link e.g. "/events", or an external link e.g. "https://www.instagram.com"
   * @returns {jsx} a complete layout fragment for use with the <Slider> component below
   */

  const slideGenerator = (slidesArr) => {
    return slidesArr.map((slide, idx) => (
      <section
        key={idx}
        className="hero is-fullheight-with-navbar"
        draggable="false"
        onClick={() => {
          navigate(`${slide.contentLink}`);
        }}
        style={{
          height: `calc(100vh - 10.5rem)`,
          backgroundImage: `url(${slide.bgUrl})`,
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
                <h1 className="title hero-title">{slide.headline}</h1>
                <br />
                <h2 className="subtitle hero-title">{slide.blurb}</h2>
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
        <Slider
          auto={8000}
          hasBullets
          bulletStyle={{ backgroundColor: "#000", border: "2px solid white" }}
        >
          {slideGenerator(dummySlides)}
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
//         navigate(`${slide.contentLink}`);
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
//           <p>Go to {slide.contentLink}</p>
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
