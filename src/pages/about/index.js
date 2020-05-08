import React from "react";

function AboutIndexPage() {
  return (
    <section className="about-page">
      <div className="about-pic">
        <img src="../../img/Halfmoon-3.png" alt="HalfMoonBK Logo" />
      </div>
      <div className="container is-fluid about-info">
        <div className="columns is-multiline">
          <div className="column is-12">
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
              <p style={{ marginBottom: "2.5rem" }}>
                Info: info@halfmoonbk.com
              </p>
              <p className="title is-size-5">Site</p>
              <p>Designed by Christian Mejia</p>
              <p>Programmed by Christian Mejia & Richard Dominguez</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIndexPage;
