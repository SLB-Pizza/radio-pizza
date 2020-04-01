import React from "react";
import { BioHorizItem } from "./index";

const sampleMixes = [
  {
    date: "10.21.19",
    url: "https://www.youtu.be/TYntD4ZEXWY?t=0",
    name: "BLASTOYZ @ Transmission Prague 2019",
    artist: "BLASTOYZ",
    img: "../img/blastoyz.png",

    tags: ["Electro", "Complextro", "Trance", "Psytrance", "Live Set"]
  },
  {
    date: "04.28.2016",
    url: "https://www.youtu.be/Ae6JTalX8qg?t=0",
    name: "sleepmakeswaves on Audiotree (Live)",
    artist: "sleepmakeswaves",
    img: "../img/sleepmakeswaves.jpg",
    tags: ["Post Rock", "Prog Rock", "Instrumental Rock", "Live Set"]
  },
  {
    date: "03.28.2020",
    url: "https://www.youtu.be/ozpzTdcZOkQ?t=0",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img: "../img/dj-soda.jpg",
    tags: ["Electronic", "Dubstep", "UK Hardcore", "Live Set"]
  },
  {
    date: "12.21.2016",
    url: "https://youtu.be/sLmzceCFE8Y?t=0",
    name: "Final Fantasy XV - All Battle Themes",
    artist: "Yoko Shimamura",
    img: "../img/ffxv.jpg",
    tags: ["Video Game", "Soundtrack", "Compilation", "Orchestral"]
  },
  {
    date: "02.02.2020",
    url: "https://youtu.be/5qap5aO4i9A",
    name: "lofi hip hop radio - beats to relax/study to",
    artist: "ChilledCow",
    img: "../img/lo-fi.jpg",
    tags: ["lo-fi", "Hip-Hop", "Ambient", "Instrumental"]
  },
  {
    date: "04.01.2020",
    url: "https://youtu.be/PiLCHmyAgEU?t=0",
    name: "Liquicity Yearmix 2019",
    artist: "Various Artists",
    img: "../img/liquicity-2019.jpg",
    tags: ["Liquid D&B", "Uplifting", "Compilation", "Instrumental"]
  }
];

function BioMixList(props) {
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
      {sampleMixes.map(mix => (
        <BioHorizItem
          key={mix.name}
          date={mix.date}
          url={mix.url}
          name={mix.name}
          artist={mix.artist}
          img={mix.img}
          tags={mix.tags}
        />
      ))}
    </div>
  );
}

export default BioMixList;
