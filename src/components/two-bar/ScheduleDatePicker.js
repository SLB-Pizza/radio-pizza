import React from "react";

function ScheduleDatePicker() {
  return (
    <div className="columns date-picker">
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">MON</p>
        <p className="subtitle is-5-widescreen">3/16</p>
      </div>
      <div className="column time-date has-text-centered" id="test-active">
        <p className="title is-3-widescreen">TUE</p>
        <p className="subtitle is-5">3/17</p>
      </div>
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">WED</p>
        <p className="subtitle is-5">3/18</p>
      </div>
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">THU</p>
        <p className="subtitle is-5">3/19</p>
      </div>
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">FRI</p>
        <p className="subtitle is-5">3/20</p>
      </div>
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">SAT</p>
        <p className="subtitle is-5">3/21</p>
      </div>
      <div className="column time-date has-text-centered">
        <p className="title is-3-widescreen">SUN</p>
        <p className="subtitle is-5">3/22</p>
      </div>
    </div>
  );
}

export default ScheduleDatePicker;
