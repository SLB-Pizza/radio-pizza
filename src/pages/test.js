import React from "react";

function TestPage() {
  return (
    <main className="site-page">
      <section className="container is-fluid">
        <div className="columns is-variable is-3">
          <div
            className="column"
            style={{ backgroundColor: "darkBlue", border: "2px solid white" }}
          >
            <p>Text</p>
          </div>
          <div
            className="column"
            style={{ backgroundColor: "darkBlue", border: "2px solid white" }}
          >
            <p>Text</p>
          </div>
          <div
            className="column"
            style={{ backgroundColor: "darkBlue", border: "2px solid white" }}
          >
            <p>Text</p>
          </div>
        </div>
      </section>
    </main>
  );
}
export default TestPage;
