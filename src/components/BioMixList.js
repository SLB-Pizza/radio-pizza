import React from "react";
import { BioSingleMix, BioHorizItem } from "./index";

const sampleMixes = [
  {
    date: "10.21.19",
    url: "https://www.youtube.com/watch?v=TYntD4ZEXWY",
    name: "BLASTOYZ @ Transmission Prague 2019",
    artist: "BLASTOYZ",
    img:
      "https://i.ytimg.com/an_webp/TYntD4ZEXWY/mqdefault_6s.webp?du=3000&sqp=CLC1i_QF&rs=AOn4CLD-MhbcilfHfa6jL1j_vRo9tgwugg",
    tags: ["Electro", "Complextro", "Trance", "Psytrance", "Live Set"]
  },
  {
    date: "04.28.2016",
    url: "https://www.youtube.com/watch?v=Ae6JTalX8qg",
    name: "sleepmakeswaves on Audiotree (Live)",
    artist: "sleepmakeswaves",
    img:
      "https://i.ytimg.com/an_webp/Ae6JTalX8qg/mqdefault_6s.webp?du=3000&sqp=CPC2i_QF&rs=AOn4CLDB4BsZv_pGHcVY_cs93pt3rZp4yw",
    tags: ["Post Rock", "Prog Rock", "Instrumental Rock", "Live Set"]
  },
  {
    date: "03.28.2020",
    url: "https://www.youtube.com/watch?v=ozpzTdcZOkQ",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img:
      "https://i.ytimg.com/an_webp/ozpzTdcZOkQ/mqdefault_6s.webp?du=3000&sqp=CNili_QF&rs=AOn4CLDqHLKBUvX4QLM2Hxj9pVkItanuiA",
    tags: ["Electronic", "Dubstep", "UK Hardcore", "Live Set"]
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
          TODO: Port BioSingleMix code to all HomeContent sections
        </p>
      </div>
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
      <div className="column is-12 is-hidden-touch">
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next">Next page</a>
          <ul className="pagination-list">
            <li>
              <a className="pagination-link" aria-label="Goto page 1">
                1
              </a>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 45">
                45
              </a>
            </li>
            <li>
              <a
                className="pagination-link is-current"
                aria-label="Page 46"
                aria-current="page"
              >
                46
              </a>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 47">
                47
              </a>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 86">
                86
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="column is-12 is-hidden-desktop">
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <a className="pagination-previous">Previous</a>
          <a className="pagination-next">Next page</a>
          <ul className="pagination-list">
            <li>
              <a className="pagination-link" aria-label="Goto page 1">
                1
              </a>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 45">
                45
              </a>
            </li>
            <li>
              <a
                className="pagination-link is-current"
                aria-label="Page 46"
                aria-current="page"
              >
                46
              </a>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 47">
                47
              </a>
            </li>
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            <li>
              <a className="pagination-link" aria-label="Goto page 86">
                86
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BioMixList;
