import React from "react";
import { HomeMixes, HomeEvents, HomeNews } from "./index";

function HomeContent(props) {
  const { homeMixesText, homeEventsText, homeFeaturesText } = props;
  return (
    <section className="home-content">
      <HomeMixes homeMixesText={homeMixesText} />
      <HomeEvents homeEventsText={homeEventsText} />
      <HomeNews homeFeaturesText={homeFeaturesText} />
    </section>
  );
}

export default HomeContent;
