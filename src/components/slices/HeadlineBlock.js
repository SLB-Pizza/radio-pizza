import React from "react";

function HeadlineBlock({ slice }) {
  return (
    <main style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <section
        className="hero"
        style={{
          height: "60vh",
          backgroundImage: `url(https://w.wallhaven.cc/full/ey/wallhaven-ey12dw.jpg)`,
        }}
      >
        <div className="hero-body" style={{ marginTop: "25vh" }}>
          <div className="container">
            <div
              className="columns"
              style={{
                position: "relative",
                marginTop: "1rem",
                backgroundColor: "rgba(0,0,0, .85)",
                minHeight: "25vh",
                border: "2px solid white",
                borderRadius: ".75rem",
              }}
            >
              <div className="column" style={{ padding: "2rem" }}>
                <div className="content">
                  <p className="is-size-6 has-text-centered">MUSIC</p>
                  <h1 className="title is-size-1 has-text-centered">
                    Beyond 174: The Search for the Ultimate High Speed Workout
                    Playlist
                  </h1>
                  <h3 className="headline-block-subtitle has-text-centered">
                    Add these ten must-add songs to your playlist to bring your
                    next workout to blistering heights.
                  </h3>
                  <hr style={{ margin: "2rem 45%" }} />
                  <p className="has-text-centered">by Christian Mejia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HeadlineBlock;
