import React from "react";
import { SingleMixCard } from "./index";

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
    tags: ["heavy metal", "dark electronic", "soundtrack"],
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

function HomeMixes() {
  // See SingleMixCard - playAudioButton() for details about playBtnInfo usage
  const playBtnInfo = [{ btnSize: "7x" }];
  const homeMixesLayout =
    "column is-9-mobile is-two-fifths-tablet is-4-desktop";

  return (
    <div id="home-mixes">
      <div className="container is-fluid image-diffuser">
        {/*
      Desktop Sizes
      */}
        <div className="columns is-hidden-touch">
          <div className="column is-3">
            <div className="sticky-section-blurb">
              <p className="title is-size-3">Recent Mixes</p>
              <p className="subtitle is-size-5">
                These dummy mixes are the same as the ones on the sample bio
                page. You can hover/touch and play them the same way. Try it!
              </p>
              <button className="sticky-link button">More ></button>
            </div>
          </div>
          <div className="column is-9">
            <div className="columns is-multiline">
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
                  columnLayout={homeMixesLayout}
                />
              ))}
            </div>
          </div>
        </div>
        {/*
      Touch Sizes
      */}
        <div className="columns is-mobile is-multiline is-vcentered is-hidden-desktop">
          <div className="column">
            <p className="title is-size-3 mobile-headers">Daily Mixes</p>
          </div>
          <div className="column is-narrow more-link">
            <button className="button is-small">More ></button>
          </div>
          <div className="column is-12">
            <p className="subtitle is-size-5 mobile-headers">
              These dummy mixes are the same as the ones on the sample bio page.
              You can hover/touch and play them the same way. Try it!
            </p>
          </div>
        </div>
        <div className="columns is-mobile is-hidden-desktop mobile-single-items">
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
              columnLayout={homeMixesLayout}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeMixes;
