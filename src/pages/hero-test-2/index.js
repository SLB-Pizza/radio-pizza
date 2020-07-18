import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import { HomeContent } from "../../components/index";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function AwesomeTest() {
  const testMedia = [
    {
      source: "https://source.unsplash.com/1920x1080/weekly?movies",
    },
    {
      source: "https://source.unsplash.com/1920x1080/weekly?food",
    },
    {
      source: "https://source.unsplash.com/1920x1080/weekly?music",
    },
    {
      source: "https://source.unsplash.com/1920x1080/weekly?art",
    },
    {
      source: "https://source.unsplash.com/1920x1080/weekly?water",
    },
    {
      source: "https://source.unsplash.com/1920x1080/weekly?concert",
    },
  ];

  // const bgStyles = {
  //   backgroundPosition: "center center",
  //   backgroundRepeat:,
  //   backgroundAttachment:"scroll"
  //   backgroundSize: "{"
  // }

  return (
    <div className="site-page">
      <div className="container is-fluid hero-test-2">
        <div className="columns">
          <AwesomeSlider bullets={false} fillParent={true}>
            <div data-src="https://source.unsplash.com/1920x1080/weekly?concert" />
            <div data-src="https://source.unsplash.com/1920x1080/weekly?music" />
            <div data-src="https://source.unsplash.com/1920x1080/weekly?food" />
            <div data-src="https://source.unsplash.com/1920x1080/weekly?art" />
          </AwesomeSlider>
        </div>
      </div>
      <HomeContent />
    </div>
  );
}

export default AwesomeTest;

// Version that slide with broken art
// <div className="container is-fluid site-content">
//   <div className="columns">
//     <AwesomeSlider bullets={false} fillParent={true}>
//       <div data-src="../img/art-test.jpeg" />
//     </AwesomeSlider>
//   </div>
// </div>;

//  <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?movies",
//               backgroundAttachment: "no-repeat",
//               backgroundSize: "cover",
//             }}
//           >
//             <p className="title is-size-1">123098</p>
//           </div>
//           <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?food",
//             }}
//           >
//             123098
//           </div>
//           <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?music",
//             }}
//           >
//             123098
//           </div>
//           <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?art",
//             }}
//           >
//             123098
//           </div>
//           <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?water",
//             }}
//           >
//             123098
//           </div>
//           <div
//             style={{
//               backgroundImage: "https://source.unsplash.com/1920x1080/?concert",
//             }}
//           >
//             123098
//           </div>
