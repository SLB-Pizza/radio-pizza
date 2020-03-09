import React from "react";

function SchedulePage() {
  return (
    <section className="schedule-page">
      <div className="hero schedule-hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-multiline">
              <div className="column is-12">
                <p className="title is-1">Schedule</p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Today
                  <p className="subtitle is-6">March 16th</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Tuesday
                  <p className="subtitle is-6">March 17th</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Wednesday
                  <p className="subtitle is-6">March 18th</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Thursday
                  <p className="subtitle is-6">March 19th</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Friday
                  <p className="subtitle is-6">March 20th</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Saturday
                  <p className="subtitle is-6">March 21st</p>
                </p>
              </div>
              <div className="column time-date">
                <p className="title is-5 has-text-centered">
                  Sunday
                  <p className="subtitle is-6">March 22nd</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-4">img</div>
          <div className="column is-8">times</div>
        </div>
      </div>
    </section>
  );
}

export default SchedulePage;
