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
              <p className="title is-3">Ears to the concrete.</p>
              <hr />
              <p className="subtitle is-4">Team</p>
              <p>Surf Allah – Owner & Founder</p>
              <p style={{ marginBottom: "2.5rem" }}>
                Edrick Chu – Head of Marketing & Partnerships
              </p>
              <p className="subtitle is-4">Contact</p>
              <p>Business: business@halfmoonbk.com</p>
              <p>Info: info@halfmoonbk.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutIndexPage;
