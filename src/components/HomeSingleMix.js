import React from "react";
import { SingleMixCard } from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

/**
 * Important to know for the HomeMixes section
 */

const sampleMixes = [
  {
    date: "10.21.19",
    url: "https://soundcloud.com/transmissionfestival/tmprg19-blastoyz",
    testSrc: "Soundcloud",
    name: "BLASTOYZ @ Transmission Prague 2019",
    artist: "BLASTOYZ",
    img: "../img/blastoyz.png",
    tags: ["electro", "complextro", "trance", "psytrance", "live set"],
  },
  {
    date: "04.28.2016",
    url:
      "https://soundcloud.com/sleepmakeswaves/sets/sleepmakeswaves-on-audiotree",
    testSrc: "Soundcloud",
    name: "sleepmakeswaves on Audiotree (Live)",
    artist: "sleepmakeswaves",
    img: "../img/sleepmakeswaves.jpg",
    tags: ["post rock", "prog rock", "instrumental rock", "live set"],
  },
  {
    date: "03.28.2020",
    url:
      "https://soundcloud.com/derek-du/dj-soda-countdown-virtual-rave-a-thon-2020",
    testSrc: "Soundcloud",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img: "../img/dj-soda.jpg",
    tags: ["electronic", "dubstep", "uk hardcore", "live set"],
  },
  {
    date: "03.20.2020",
    url: "https://www.mixcloud.com/HalfMoonbk/plusnone-3252020/",
    testSrc: "Mixcloud",
    name: "plusNONE - 3.25.2020",
    artist: "plusNONE",
    img: "../img/plusNONE-032020.jpg",
    tags: ["plusNONE", "r&b", "neo soul", "hip hop"],
  },
  {
    date: "04.01.2020",
    url: "https://www.mixcloud.com/adamkvasnica3/shibuya-jazz-classics/",
    testSrc: "Mixcloud",
    name: "Shibuya Jazz Classics",
    artist: "Various Artists",
    img: "../img/shibuya-jazz.jpg",
    tags: ["jazz", "modal jazz", "jazz fusion", "japanese jazz", "free jazz"],
  },
  {
    date: "02.02.2020",
    url: "https://youtu.be/5qap5aO4i9A",
    testSrc: "Youtube Livestream",
    name: "lofi hip hop radio - beats to relax/study to",
    artist: "ChilledCow",
    img: "../img/lo-fi.jpg",
    tags: ["lo-fi", "hip-hop", "ambient", "instrumental", "beats"],
  },
];
const dummyTwelveMixes = [...sampleMixes, ...sampleMixes];

function HomeSingleMix() {
  return dummyTwelveMixes.map((mix) => (
    <SingleMixCard
      key={mix.name}
      date={mix.date}
      url={mix.url}
      testSrc={mix.testSrc}
      name={mix.name}
      artist={mix.artist}
      img={mix.img}
      tags={mix.tags}
    />
  ));
}

export default HomeSingleMix;

// <div className="column is-9-mobile is-two-fifths-tablet is-4-desktop">
//   <div className="card">
//     <div className="card-image">
//       <figure className="image is-1by1">
//         <img
//           src="https://source.unsplash.com/1080x1080/daily?concert"
//           alt="mix-img"
//         />
//         <div className="play-btn-diffuser is-overlay">
//           {/* <span>{playAudioSource(props.url, props.name)}</span> */}
//         </div>
//       </figure>
//     </div>
//     <div className="card-content">
//       <p className="content-date subtitle is-size-7-touch is-size-6-desktop">
//         04.21.20 | Some Resident
//       </p>
//       <p className="title is-size-6-mobile is-size-5-tablet is-size-4-fullhd">
//         Lorem Ipsum Dolor
//       </p>

//       <div className="tags are-small">
//         <span className="tag is-black">Genre</span>
//         <span className="tag is-black">Genrerock</span>
//         <span className="tag is-black">Alt-Genre</span>
//         <span className="tag is-black">Genrecore</span>
//         <span className="tag is-black">Post-Genre</span>
//       </div>
//     </div>
//   </div>
// </div>
