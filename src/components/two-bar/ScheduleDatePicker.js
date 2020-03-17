import React from "react";

function ScheduleDatePicker() {
  return (
    <div className="columns date-picker">
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">MON</p>
        <p className="subtitle is-6-desktop is-7-touch">3/16</p>
      </div>
      <div className="column day-of-week has-text-centered" id="test-active">
        <p className="title is-4-desktop is-5-touch">TUE</p>
        <p className="subtitle is-6-desktop is-7-touch">3/17</p>
      </div>
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">WED</p>
        <p className="subtitle is-6-desktop is-7-touch">3/18</p>
      </div>
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">THU</p>
        <p className="subtitle is-6-desktop is-7-touch">3/19</p>
      </div>
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">FRI</p>
        <p className="subtitle is-6-desktop is-7-touch">3/20</p>
      </div>
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">SAT</p>
        <p className="subtitle is-6-desktop is-7-touch">3/21</p>
      </div>
      <div className="column day-of-week has-text-centered">
        <p className="title is-4-desktop is-5-touch">SUN</p>
        <p className="subtitle is-6-desktop is-7-touch">3/22</p>
      </div>
    </div>
  );
}

export default ScheduleDatePicker;
