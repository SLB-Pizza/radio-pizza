import React from "react";

function SearchResults(props) {
  return (
    <div className="columns is-mobile is-hidden-mobile">
      <div
        className={
          props.isSelected === "mixes"
            ? "column is-4 is-hidden-mobile is-active"
            : "column is-4 is-hidden-mobile"
        }
        id="mixes"
        onClick={props.toggleColumn}
      >
        <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
          Mixes (40)
        </button>
      </div>
      <div
        className={
          props.isSelected === "residents"
            ? "column is-4 is-hidden-mobile is-active"
            : "column is-4 is-hidden-mobile"
        }
        id="residents"
        onClick={props.toggleColumn}
      >
        <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
          Residents (12)
        </button>
      </div>
      <div
        className={
          props.isSelected === "events"
            ? "column is-4 is-hidden-mobile is-active"
            : "column is-4 is-hidden-mobile"
        }
        id="events"
        onClick={props.toggleColumn}
      >
        <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
          Events (5)
        </button>
      </div>
      {/* <div
        className={
          props.isSelected === "news"
            ? "column is-4 is-hidden-mobile is-active"
            : "column is-4 is-hidden-mobile"
        }
        id="news"
        onClick={props.toggleColumn}
      >
        <button className="button is-fullwidth is-outlined is-rounded is-dark is-inverted display-text">
        </button>
        </p>
          News (10)
      </div> */}
    </div>
  );
}

export default SearchResults;
