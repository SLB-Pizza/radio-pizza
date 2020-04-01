import React from "react";
import { BioHorizItem } from "./index";

const sampleMixes = [
  {
    date: "10.21.19",
    url: "https://www.youtube.com/watch?v=TYntD4ZEXWY?t=0",
    name: "BLASTOYZ @ Transmission Prague 2019",
    artist: "BLASTOYZ",
    img: "../img/blastoyz.png",

    tags: ["Electro", "Complextro", "Trance", "Psytrance", "Live Set"]
  },
  {
    date: "04.28.2016",
    url: "https://www.youtube.com/watch?v=Ae6JTalX8qg?t=0",
    name: "sleepmakeswaves on Audiotree (Live)",
    artist: "sleepmakeswaves",
    img: "../img/sleepmakeswaves.jpg",
    tags: ["Post Rock", "Prog Rock", "Instrumental Rock", "Live Set"]
  },
  {
    date: "03.28.2020",
    url: "https://www.youtube.com/watch?v=ozpzTdcZOkQ?t=0",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img: "../img/dj-soda.jpg",
    tags: ["Electronic", "Dubstep", "UK Hardcore", "Live Set"]
  },
  {
    date: "03.28.2020",
    url: "https://www.youtube.com/watch?v=ozpzTdcZOkQ?t=0",
    name: "Countdown Virtual Rave-A-Thon",
    artist: "DJ Soda",
    img: "../img/dj-soda.jpg",
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
          NB: These are test mixes. onHover mix play buttons are active; tags
          are placeholder.
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
      {/* PAGINATION -- POSITION SUBJECT TO CHANGE*/}
      <div className="column is-7-desktop is-12 is-hidden-touch">
        <nav
          className="pagination has-background-light"
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
