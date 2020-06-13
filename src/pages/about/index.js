import React from "react";

function AboutIndexPage() {
  return (
    <div className="container is-fluid site-page">
      <div className="columns is-vcentered" id="about">
        <div className="column is-3">
          <figure className="image is-9by16">
            <img src="https://source.unsplash.com/720x1280/daily?soundboard" />
          </figure>
        </div>
        <div className="column is-9">
          <div className="content">
            <p className="title is-size-3">Ears to the concrete.</p>
            <p className="subtitle is-size-5">
              Brooklyn based music network connecting music culture across the
              world through radio, events, and more.
            </p>
            <hr />
            <p className="title is-size-5">Team</p>
            <p>Surf Allah – Owner & Founder</p>
            <p style={{ marginBottom: "2.5rem" }}>
              Edrick Chu – Head of Marketing & Partnerships
            </p>
            <p className="title is-size-5">Contact</p>
            <p>Business: business@halfmoonbk.com</p>
            <p style={{ marginBottom: "2.5rem" }}>Info: info@halfmoonbk.com</p>
            <p className="title is-size-5">Site</p>
            <p>Designed by Christian Mejia</p>
            <p>Programmed by Christian Mejia & Richard Dominguez</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutIndexPage;
