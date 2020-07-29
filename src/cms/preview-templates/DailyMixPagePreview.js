import React from "react";
import PropTypes from "prop-types";
import { DailyMixPageTemplate } from "../../templates/daily-mix";

const DailyMixPagePreview = ({ entry, widgetFor }) => (
  <DailyMixPageTemplate
    content={widgetFor("mixes")}
    description={entry.getIn(["data", "description"])}
    tags={entry.getIn(["data", "tags"])}
    title={entry.getIn(["data", "name"])}
    artistList={entry.getIn(["data", "artistlist"])}
    dailyMixImage={entry.getIn(["data", "dailymiximage"])}
    featuredDailyMixImage={entry.getIn(["data", "featureddailymiximage"])}
    urls={entry.getIn(["data", "streamurls"])}
  />
);

DailyMixPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  dailyMixImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featuredDailyMixImage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};

export default DailyMixPagePreview;
