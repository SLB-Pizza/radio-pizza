import React from 'react';
import PropTypes from 'prop-types';
import { DjPageTemplate } from '../../templates/dj-page';

const DjPagePreview = ({ entry, widgetFor }) => (
  <DjPageTemplate
    content={widgetFor('streams')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'name'])}
    featured={entry.getIn(['data', 'featuredartist'])}
    image={entry.getIn(['data', 'artistimage'])}
  />
);

DjPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DjPagePreview;
