import React from "react";

function InProgress() {
  return (
    <div className="columns in-progress is-hidden-desktop">
      <p className="title is-size-5 has-text-centered">
        ⚠️ Layout in progress! ⚠️
      </p>
      <p className="subtitle is-size-7 has-text-centered">
        Please view this page on desktop.
      </p>
    </div>
  );
}

export default InProgress;
