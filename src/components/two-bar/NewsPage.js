import React from "react";

function NewsPage() {
  return (
    <section className="news-page container is-fluid">
      <div className="columns is-multiline">
        <div className="column is-6 news">
          <div className="news-info">
            <p>CATEGORY</p>
            <p>Article Title</p>
            <p>Article Tagline</p>
            <div className="article-info">
              <p>Author Name</p>
              <p>Article Date</p>
            </div>
          </div>
        </div>
        <div className="column is-12 news">is-12</div>
        <div className="column is-6 news">is-6</div>
        <div className="column is-6 news">is-6</div>
        <div className="column is-6 news">is-6</div>
        <div className="column is-6 news">is-6</div>
        <div className="column is-6 news">is-6</div>
      </div>
    </section>
  );
}

export default NewsPage;
