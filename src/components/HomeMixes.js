import React from "react";
import { SingleMixCard } from "./index";

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

function HomeMixes() {
  return (
    <div id="home-mixes">
      <div className="container is-fluid image-diffuser">
        {/*
      Desktop Sizes
      */}
        <div className="columns is-hidden-touch">
          <div className="column is-3">
            <div className="sticky-section-blurb">
              <p className="title is-size-3">Daily Mixes</p>
              <p className="subtitle is-size-5">
                These dummy mixes are the same as the ones on the sample bio
                page. You can hover/touch and play them the same way. Try it!
              </p>
              <button className="sticky-link button">More ></button>
            </div>
          </div>
          <div className="column is-9">
            <div className="columns is-multiline">
              {dummyTwelveMixes.map((mix) => (
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="columns is-mobile is-hidden-desktop mobile-single-items">
          {dummyTwelveMixes.map((mix) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeMixes;
