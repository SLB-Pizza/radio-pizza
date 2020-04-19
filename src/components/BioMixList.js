import React from "react";
import { BioHorizItem, SingleMixCard } from "./index";

/**
 * Dummy mixes with real data
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
    date: "04.28.16",
    url:
      "https://soundcloud.com/sleepmakeswaves/sets/sleepmakeswaves-on-audiotree",
    testSrc: "Soundcloud",
    name: "sleepmakeswaves on Audiotree (Live)",
    artist: "sleepmakeswaves",
    img: "../img/sleepmakeswaves.jpg",
    tags: ["post rock", "prog rock", "instrumental rock", "live set"],
  },
  {
    date: "03.28.20",
    url: "https://soundcloud.com/derek-d2/dj-soda-countdown-virtual-rave",
    testSrc: "Soundcloud",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img: "../img/dj-soda.jpg",
    tags: ["electronic", "dubstep", "uk hardcore", "live set"],
  },
  {
    date: "03.20.20",
    url: "https://www.mixcloud.com/HalfMoonbk/plusnone-3252020/",
    testSrc: "Mixcloud",
    name: "plusNONE - 3.25.2020",
    artist: "plusNONE",
    img: "../img/plusNONE-032020.jpg",
    tags: ["plusNONE", "r&b", "neo soul", "hip hop"],
  },
  {
    date: "04.01.20",
    url: "https://www.mixcloud.com/adamkvasnica3/shibuya-jazz-classics/",
    testSrc: "Mixcloud",
    name: "Shibuya Jazz Classics",
    artist: "Various Artists",
    img: "../img/shibuya-jazz.jpg",
    tags: ["jazz", "modal jazz", "jazz fusion", "japanese jazz", "free jazz"],
  },
  {
    date: "02.02.20",
    url: "https://youtu.be/5qap5aO4i9A",
    testSrc: "Youtube Livestream",
    name: "lofi hip hop radio - beats to relax/study to",
    artist: "ChilledCow",
    img: "../img/lo-fi.jpg",
    tags: ["lo-fi", "hip-hop", "ambient", "instrumental", "beats"],
  },
  {
    date: "04.09.20",
    url: "https://soundcloud.com/monstercat/cotw293",
    testSrc: "Soundcloud",
    name:
      "293 - Monstercat: Call of the Wild (Community Picks with Dylan Todd)",
    artist: "Monstercat",
    img: "../img/lo-fi.jpg",
    tags: ["dance", "edm", "community", "psytrance", "drumstep"],
  },
  {
    date: "01.02.20",
    url:
      "https://soundcloud.com/madukdnb/liquicity-yearmix-2019-mixed-by-maduk",
    testSrc: "Soundcloud",
    name: "Liquicity Yearmix 2019 (Mixed by Maduk)",
    artist: "Maduk",
    img: "../img/lo-fi.jpg",
    tags: ["electronic", "dance", "yearmix", "drum & bass"],
  },
  {
    date: "11.10.14",
    url:
      "https://soundcloud.com/ukf/camo-krooked-present-zeitgeist-ukf-5th-birthday-at-building-six",
    testSrc: "Soundcloud",
    name: "Camo & Krooked Present Zeitgeist @ UKF 5th Birthday at Building Six",
    artist: "UKF",
    img: "../img/lo-fi.jpg",
    tags: ["live set", "ukf", "drum & bass"],
  },
];

function BioMixList(props) {
  // See SingleMixCard - playAudioButton() for details about playBtnInfo usage
  const playBtnInfo = [
    { btnSize: "7x", viewportClass: "is-hidden-touch" },
    { btnSize: "3x", viewportClass: "is-hidden-desktop" },
  ];

  return (
    <div className="columns is-vcentered is-multiline bio-mixes">
      <div className="column is-12">
        <p className="title is-size-2-desktop is-size-4-touch has-text-centered">
          Mixes by RowdyRobo
        </p>
        <p className="subtitle is-size-4-desktop is-size-6-touch has-text-centered">
          NB: These are test mixes. Hover (and touch) play buttons are active;
          tags are placeholder.
        </p>
      </div>
      {/* SINGLE MIXES LIST */}
      {sampleMixes.map((mix) => (
        <SingleMixCard
          key={mix.name}
          date={mix.date}
          url={mix.url}
          testSrc={mix.testSrc}
          name={mix.name}
          artist={mix.artist}
          img={mix.img}
          tags={mix.tags}
          playBtnInfo={playBtnInfo}
        />
      ))}
    </div>
  );
}

export default BioMixList;

// {
//   sampleMixes.map((mix) => (
//     <BioHorizItem
//       key={mix.name}
//       date={mix.date}
//       url={mix.url}
//       testSrc={mix.testSrc}
//       name={mix.name}
//       artist={mix.artist}
//       img={mix.img}
//       tags={mix.tags}
//     />
//   ));
// }
