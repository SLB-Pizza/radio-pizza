import React from "react";

/**
 * STRUCTURE
 *
 * schedule-page
 * -- container
 * ---- 'columns' div for day picker
 * ---- 'columns' divs for schedule entry
 * ----- each of these columns contains one show's info
 * ------ could setup contditional render for:
 * ------ tagline, halfmoon bio page, twitter, instagram
 */

function SchedulePage() {
  return (
    <div className="container is-fluid schedule-page">
      <div className="columns">
        {/*
          DAYS OF WEEK
          */}
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
      <div className="columns is-vcentered">
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

      <div className="columns is-vcentered">
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

      <div className="columns is-vcentered">
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

      <div className="columns is-vcentered">
        <div className="column is-3">
          <p className="is-size-4 has-text-centered">7:00PM - 10:00PM</p>
        </div>
        <div className="column">
          <p className="is-size-4">The Show with the Long Long Name</p>
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
      <div className="columns is-vcentered">
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
    </div>
  );
}

export default SchedulePage;
