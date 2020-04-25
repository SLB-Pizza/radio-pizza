import React from "react";

function SearchResults(props) {
  return (
    <>
      <div
        className={
          props.isSelected === "mixes"
            ? "column is-4 is-hidden-mobile is-active"
            : "column is-4 is-hidden-mobile"
        }
        id="mixes"
        onClick={props.toggleColumn}
      >
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          Mixes (40)
        </p>
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
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          Residents (12)
        </p>
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
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          Events (5)
        </p>
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
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          News (10)
        </p>
      </div> */}
    </>
  );
}

export default SearchResults;
