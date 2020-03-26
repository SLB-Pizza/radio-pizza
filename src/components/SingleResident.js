import React from "react";

function SingleResident() {
  return (
    <div className="column is-10-touch is-one-third-desktop resident-box">
      {/*
      Desktop
      */}
      <div className="columns is-vcentered is-hidden-touch single-resident">
        <div className="column is-narrow">
          <div className="resident-image">
            <figure className="image is-96x96">
              <img
                src="https://robohash.org/4H1.png?set=set1"
                alt="Rowdy Robo"
              />
            </figure>
          </div>
        </div>
        <div className="column">
          <p className="title is-size-3-desktop is-size-5-touch">RowdyRobo</p>
        </div>
      </div>
      {/*
      TOUCH
      */}
      <div className="columns is-vcentered is-mobile is-hidden-desktop single-resident">
        <div className="column is-narrow">
          <div className="resident-image">
            <figure className="image is-64x64">
              <img
                src="https://robohash.org/4H1.png?set=set1"
                alt="Rowdy Robo"
              />
            </figure>
          </div>
        </div>
        <div className="column">
          <p className="title is-size-3-desktop is-size-5-touch">RowdyRobo</p>
        </div>
      </div>
    </div>
  );
}
export default SingleResident;
