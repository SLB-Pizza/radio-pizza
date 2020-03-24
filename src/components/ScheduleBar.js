import React, { useState } from "react";
import {
  ScheduleModal,
  ScheduleDropdown,
  ScheduleDatePicker,
  ScheduleShowEntry
} from "./index";

function ScheduleBar() {
  const [open, setOpen] = useState(false);

  return !open ? (
    <div className="schedule-bar container is-fluid">
      <div className="columns is-vcentered is-mobile up-next">
        <div className="column is-narrow">
          <p className="is-size-6">in 1hr 1m</p>
        </div>
        <div className="column">
          <p className="title is-size-6 has-text-light">Loremip.</p>
        </div>
        <div className="column is-narrow" id="expand-button">
          <button
            className="button is-fullwidth is-black"
            onClick={() => setOpen(!open)}
          >
            Schedule ▼
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="schedule-bar container is-fluid is-open">
      {/*
      FOR MOBILE
      SCHEDULE MODAL
      <ScheduleModal />
      */}
      <div className="modal is-active is-hidden-tablet">
        <div className="modal-background"></div>
        <div className="modal-card is-dark">
          <header className="modal-card-head">
            <div className="columns is-mobile schedule-modal">
              <div className="column">
                <p className="title is-size-2 has-text-light">Schedule</p>
              </div>
              <div className="column is-narrow">
                <button
                  className="delete is-large"
                  aria-label="close schedule"
                  onClick={() => setOpen(!open)}
                ></button>
              </div>
            </div>
            <div className="columns" id="scroll-instructions">
              <div className="column">
                <p className="is-size-7 has-text-centered">
                  ⇦ SWIPE TO VIEW MORE DATES ⇨
                </p>
              </div>
            </div>
            <ScheduleDatePicker />
          </header>
          <section className="modal-card-body">
            <ScheduleShowEntry />
            <ScheduleShowEntry />
            <ScheduleShowEntry />
            <ScheduleShowEntry />
            <ScheduleShowEntry />
            <ScheduleShowEntry />
            <ScheduleShowEntry />
          </section>
        </div>
      </div>
      {/*
      FOR DESKTOP
      BUILT INTO THE BAR
      <ScheduleDropdown />
      */}
      <div className="columns up-next is-hidden-mobile">
        <div className="column is-narrow">
          <p>in 1hr 1m</p>
        </div>
        <div className="column">Lorem ipsum dolor sit.</div>
      </div>
      <div id="mobile-hide-dropdown">
        <ScheduleDatePicker />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
        <ScheduleShowEntry />
      </div>
      <div className="columns is-hidden-mobile">
        <div className="column is-12 has-background-dark">
          <button
            className="button is-fullwidth is-dark"
            onClick={() => setOpen(!open)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleBar;
