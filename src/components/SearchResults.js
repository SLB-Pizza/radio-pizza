import React from "react";
import { SingleMixCard, SingleResident } from "./index";

/**
 * Dummy mixes with real data
 */

const sampleMixes = [
  {
    date: "03.02.20",
    url:
      "https://soundcloud.com/soundcloud-circuits/sets/equalizers-female-electronic-producers",
    testSrc: "Soundcloud",
    name: "Female Electronic Producers",
    artist: "Circuits",
    img: "../img/fem-elec-prod.jpg",
    tags: ["deep bass", "future bass", "dark", "beats", "international"],
  },
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
    img: "../img/lo-fi.jpeg",
    tags: ["lo-fi", "hip-hop", "ambient", "instrumental", "beats"],
  },
  {
    date: "06.14.19",
    url: "https://soundcloud.com/thank-you-scientist/sets/terraformer-3",
    testSrc: "Soundcloud",
    name: "Terraformer",
    artist: "Thank You Scientist",
    img: "../img/terraformer.jpg",
    tags: [
      "jazz fusion",
      "prog rock",
      "funk",
      "experimental",
      "live instruments",
    ],
  },
  {
    date: "01.02.20",
    url:
      "https://soundcloud.com/madukdnb/liquicity-yearmix-2019-mixed-by-maduk",
    testSrc: "Soundcloud",
    name: "Liquicity Yearmix 2019 (Mixed by Maduk)",
    artist: "Maduk",
    img: "../img/liquicity-2019.jpg",
    tags: ["electronic", "dance", "yearmix", "drum & bass"],
  },
  {
    date: "08.21.19",
    url: "https://soundcloud.com/ukf/ukf-podcast-121-technimatic",
    testSrc: "Soundcloud",
    name: "UKF Podcast #121 - Technimatic",
    artist: "UKF",
    img: "../img/ukf-pod-121.jpg",
    tags: ["live set", "ukf", "drum & bass", "liquid"],
  },
  {
    date: "04.30.15",
    url: "https://www.youtube.com/watch?v=cRmwFBK0cyk",
    testSrc: "Youtube",
    name: "Inferno (Cinder's Theme) - Killer Instinct Season 2 Soundtrack",
    artist: "Mick Gordon",
    img: "../img/ki-s2.jpg",
    tags: ["metal", "electronic", "soundtrack"],
  },

  {
    date: "04.21.16",
    url:
      "https://soundcloud.com/user18081971/avril-14th-reversed-music-not-audio",
    testSrc: "Soundcloud",
    name: "avril 14th, notes played backwards, not the audio",
    artist: "Aphex Twin (user18081971)",
    img: "../img/aphex.jpg",
    tags: ["piano", "ambient", "atmospheric", "light"],
  },
];

const dummyArtists = [
  {
    name: "Black Ironbox",
  },
  {
    name: "Riverbank Vervain",
  },
  {
    name: "Rugel's Indianplantain",
  },
  {
    name: "Rusby's Globemallow",
  },
  {
    name: "Philonotis Moss",
  },
  {
    name: "Hooker's Townsend Daisy",
  },
  {
    name: "Streamside Fleabane",
  },
  {
    name: "Alpine Lady's Mantle",
  },
  {
    name: "Smooth Bogrush",
  },
  {
    name: "Flatleaf Flatsedge",
  },
  {
    name: "Alpine Draba",
  },
  {
    name: "Pale Agoseris",
  },
  {
    name: "African Signalgrass",
  },
  {
    name: "Italian Buckthorn",
  },
  {
    name: "Black Sweetwood",
  },
  {
    name: "Frosted Lichen",
  },
  {
    name: "Muskeg Lousewort",
  },
  {
    name: "Armand Pine",
  },
  {
    name: "Merced Monardella",
  },
  {
    name: "Italian Woodbine",
  },
  {
    name: "Sierra Currant",
  },
  {
    name: "Monument Valley Milkvetch",
  },
  {
    name: "Clauzadeana",
  },
  {
    name: "Muenscher's Waternymph",
  },
];

const playBtnInfo = [{ btnSize: "7x" }];
const mixListLayout =
  "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";
function SearchResults(props) {
  return (
    <>
      {props.isSelected === "mixes"
        ? sampleMixes.map((mix) => (
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
              columnLayout={mixListLayout}
            />
          ))
        : null}
      {props.isSelected === "residents"
        ? dummyArtists.map((resident) => (
            <SingleResident key={resident.name} name={resident.name} />
          ))
        : null}
      {props.isSelected === "events" ? (
        <div className="column is-full">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
            Dummy Events results here
          </p>
        </div>
      ) : null}
      {props.isSelected === "news" ? (
        <div className="column is-full">
          <p className="title is-size-5-desktop is-size-6-touch has-text-centered">
            Dummy News results here
          </p>
        </div>
      ) : null}
    </>
  );
}

export default SearchResults;
