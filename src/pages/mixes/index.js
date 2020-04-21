import React from "react";
import { SingleMixCard } from "../../components";

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
    img: "../img/blastoyz.png",
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
  {
    date: "04.30.15",
    url: "https://www.youtube.com/watch?v=cRmwFBK0cyk",
    testSrc: "Youtube",
    name: "Inferno (Cinder's Theme) - Killer Instinct Season 2 Soundtrack",
    artist: "Mick Gordon",
    img: "../img/lo-fi.jpg",
    tags: ["metal", "electronic", "soundtrack"],
  },

  {
    date: "04.21.16",
    url:
      "https://soundcloud.com/user18081971/avril-14th-reversed-music-not-audio",
    testSrc: "Soundcloud",
    name: "avril 14th, notes played backwards, not the audio",
    artist: "Aphex Twin (user18081971)",
    img: "../img/lo-fi.jpg",
    tags: ["piano", "ambient", "atmospheric", "light"],
  },
];

function MixesIndexPage() {
  const playBtnInfo = [{ btnSize: "7x" }];
  const mixListLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";

  return (
    <div className="container is-fluid mixes-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <p className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Recent Mixes
          </p>
          <p className="subtitle is-size-4-desktop is-size-5-tablet is-size-6-mobile">
            These dummy mixes are the same as the ones on the home page. You can
            hover/touch and play them the same way. Try it!
          </p>
        </div>
        <div className="column is-9-widescreen is-8-tablet is-12-mobile">
          <div className="field">
            <div className="control is-expanded">
              <input
                className="input is-medium is-hidden-touch"
                type="text"
                placeholder="Search all mixes..."
              />
              <input
                className="input is-hidden-desktop"
                type="text"
                placeholder="Search all mixes..."
              />
            </div>
          </div>
        </div>
        <div className="column is-3-widescreen is-4-tablet is-12-mobile">
          <div className="field">
            <div className="control is-expanded">
              <div className="select is-medium is-fullwidth is-hidden-touch">
                <select name="country">
                  <option value="">Select a country</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
              <div className="select is-fullwidth is-hidden-desktop">
                <select name="country">
                  <option value="">Select a country</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Venezuela">Venezuela</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="column is-12-mobile is-narrow-tablet">
          <div className="field">
            <div className="control">
              <button className="button is-medium is-dark is-hidden-touch">
                Search
              </button>
              <button className="button is-fullwidth is-dark is-hidden-desktop">
                Search
              </button>
            </div>
          </div>
        </div> */}
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
            columnLayout={mixListLayout}
          />
        ))}
      </div>
    </div>
  );
}

export default MixesIndexPage;
