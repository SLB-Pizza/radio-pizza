import React from 'react';
import PropTypes from 'prop-types';
import { ShowPageTemplate } from '../../templates/show-page';

const ShowPagePreview = ({ entry, widgetFor }) => (
  <ShowPageTemplate
    // content={widgetFor('streams')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'name'])}
    featuredArtist={entry.getIn(['data', 'featuredartist'])}
    showImage={entry.getIn(['data', 'showimage'])}
    featuredShowImage={entry.getIn(['data', 'featuredshowimage'])}
    replays={entry.getIn(['data', 'replays'])}
    recurring={entry.getIn(['data', 'recurring'])}
    airTime={entry.getIn(['data', 'airtime'])}
    url={entry.getIn(['data', 'streamurl'])}
  />
);

ShowPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  showImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featuredShowImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default ShowPagePreview;
