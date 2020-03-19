import React from "react";
import { ScheduleDatePicker, ScheduleShowEntry } from "./index";

function ScheduleModal() {
  return (
    <div className="modal is-active is-hidden-desktop">
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
                aria-label="close"
                onClick={() => setOpen(!open)}
              ></button>
            </div>
          </div>
          <div
            className="columns is-vcentered is-mobile"
            id="scroll-instructions"
          >
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
          <ScheduleShowEntry />
          <ScheduleShowEntry />
          <ScheduleShowEntry />
          <ScheduleShowEntry />
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
  );
}

export default ScheduleModal;
