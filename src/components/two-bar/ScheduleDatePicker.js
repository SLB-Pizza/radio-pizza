import React from "react";

function ScheduleDatePicker() {
  return (
    <div className="columns is-mobile date-picker">
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">MON</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/16</p>
      </div>
      <div
        className="column is-5-touch has-text-centered day-of-week"
        id="test-active"
      >
        <p className="title is-size-3-desktop is-size-4-touch">TUE</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/17</p>
      </div>
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">WED</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/18</p>
      </div>
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">THU</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/19</p>
      </div>
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">FRI</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/20</p>
      </div>
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">SAT</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/21</p>
      </div>
      <div className="column is-5-touch has-text-centered day-of-week">
        <p className="title is-size-3-desktop is-size-4-touch">SUN</p>
        <p className="subtitle is-size-5-desktop is-size-6-touch">3/22</p>
      </div>
    </div>
  );
}

export default ScheduleDatePicker;
