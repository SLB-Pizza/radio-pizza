import React from "react";
import { BioSingleMix } from "./index";

function BioMixList(props) {
  return (
    <div className="columns is-mobile is-vcentered is-multiline bio-mixes">
      <div className="column is-12">
        <p className="title is-size-2-desktop is-size-4-touch has-text-centered">
          Mixes by RowdyRobo
        </p>
      </div>
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <BioSingleMix />
      <div className="column is-12">
        <nav
          className="pagination is-small is-centered is-rounded"
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
