import React from "react";

/**
 * STRUCTURE
 *
 * schedule-page container
 * - 'columns' div for day picker
 * - 'columns' divs for schedule entry
 * --- each of these columns contains one show's info
 * ---- could setup contditional render for:
 * ---- tagline, halfmoon bio page, twitter, instagram
 */

function SchedulePage() {
  return (
    <div className="container is-fluid schedule-page">
      {/*
      DESKTOP -- 769px and up
      */}
      <div className="columns is-hidden-touch">
        <div className="column">
          <p className="title is-1">Schedule</p>
        </div>
      </div>
      {/*
          DAYS OF WEEK
          */}
      <div className="columns is-hidden-touch date-picker">
        <div className="column time-date has-text-centered">
          <p className="title is-3">MON</p>
          <p className="subtitle is-5">3/16</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">TUE</p>
          <p className="subtitle is-5">3/17</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">WED</p>
          <p className="subtitle is-5">3/18</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">THU</p>
          <p className="subtitle is-5">3/19</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">FRI</p>
          <p className="subtitle is-5">3/20</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">SAT</p>
          <p className="subtitle is-5">3/21</p>
        </div>
        <div className="column time-date has-text-centered">
          <p className="title is-3">SUN</p>
          <p className="subtitle is-5">3/22</p>
        </div>
      </div>
      {/*
        SCHEDULE ENTRIES
        */}
      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">1:30PM - 4:00PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">Short Show</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">4:00PM - 5:45PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">Longer Show Name</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">5:45PM - 7:00PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">Medium Show Name</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">7:00PM - 10:00PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">
            The Show with the Longest Name of Them All
          </p>
          {/* <p className="is-size-6">Show Host</p> */}
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>
      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">10:00PM - 1:30AM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">Late Night Show</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>
      <div className="columns is-vcentered is-hidden-touch time-slot">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">1:30AM - 6:00AM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-4">In Search of Sunrise</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      {/*
      MOBILE -- < 768px
      */}
      <div
        className="columns is-vcentered is-hidden-desktop"
        id="scroll-instructions"
      >
        <div className="column">
          <p className="is-size-7 has-text-centered">
            ⇦ Scroll to view more dates ⇨
          </p>
        </div>
      </div>
      <div
        className="columns is-mobile is-hidden-desktop"
        id="mobile-date-picker"
      >
        {/*
          DAYS OF WEEK
          */}
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">MON</p>
          <p className="subtitle is-6">3/16</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">TUE</p>
          <p className="subtitle is-6">3/17</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">WED</p>
          <p className="subtitle is-6">3/18</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">THU</p>
          <p className="subtitle is-6">3/19</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">FRI</p>
          <p className="subtitle is-6">3/20</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">SAT</p>
          <p className="subtitle is-6">3/21</p>
        </div>
        <div className="column is-4 time-date has-text-centered">
          <p className="title is-4">SUN</p>
          <p className="subtitle is-6">3/22</p>
        </div>
      </div>

      {/*
        SCHEDULE ENTRIES
        */}
      <div className="columns is-mobile is-vcentered is-hidden-desktop">
        <div className="column is-3">
          <p className="is-size-7 has-text-centered">1:30PM - 4:00PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-7">Short Show</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-mobile is-vcentered is-hidden-desktop">
        <div className="column is-3">
          <p className="is-size-7 has-text-centered">4:00PM - 5:45PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-7">Longer Show Name</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-mobile is-vcentered is-hidden-desktop">
        <div className="column is-3">
          <p className="is-size-7 has-text-centered">5:45PM - 7:00PM</p>
        </div>
        <div className="column is-narrow">
          <p className="is-size-7">Medium Show Name</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>

      <div className="columns is-mobile is-vcentered is-hidden-desktop">
        <div className="column is-3">
          <p className="is-size-7 has-text-centered">7:00PM - 10:00PM</p>
        </div>
        <div className="column">
          <p className="is-size-7">The Show with the Long Long Name</p>
          <p className="is-size-6">Show Host</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>
      <div className="columns is-mobile is-vcentered is-hidden-desktop">
        <div className="column is-3">
          <p className="is-size-7 has-text-centered">10:00PM - 1:30AM</p>
          <p className="is-size-7">Late Night Show</p>
        </div>
        <div className="column is-narrow">
          <p>bio</p>
        </div>
        <div className="column is-narrow">
          <p>twitter</p>
        </div>
        <div className="column is-narrow">
          <p>instagram</p>
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
