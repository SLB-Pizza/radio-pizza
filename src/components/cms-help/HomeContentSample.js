import React from "react";
import { RichText } from "prismic-reactjs";

export default function HomeContentSample(props) {
  const { homeContentData } = props;

  return (
    <section className="columns is-multiline cms-section" id="HomeContent">
      <div className="column is-full">
        <div className="content">
          <h2 className="subtitle">Home Content Sections</h2>
        </div>
      </div>
      <div className="column is-full">
        <div className="content">
          <h4 className="subtitle">CMS Data for Home Mixes</h4>
          <p>
            Home Mixes Headline{": "}
            <span>{RichText.asText(homeContentData.mixesHeadline)}</span>
          </p>
          <p>
            Home Mixes Blurb{": "}
            <span>{RichText.asText(homeContentData.mixesBlurb)}</span>
          </p>
        </div>
        <hr />
      </div>
      <div className="column is-full">
        <div className="content">
          <h4 className="subtitle">CMS Data for Home Mixes</h4>
          <p>
            Home Events Headline{": "}
            <span>{RichText.asText(homeContentData.eventsHeadline)}</span>
          </p>
          <p>
            Home Events Blurb{": "}
            <span>{RichText.asText(homeContentData.eventsBlurb)}</span>
          </p>
        </div>
        <hr />
      </div>
      <div className="column is-full">
        <div className="content">
          <h4 className="subtitle">CMS Data for Home Mixes</h4>
          <p>
            Home Features Headline{": "}
            <span>{RichText.asText(homeContentData.featuresHeadline)}</span>
          </p>
          <p>
            Home Features Blurb{": "}
            <span>{RichText.asText(homeContentData.featuresBlurb)}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
