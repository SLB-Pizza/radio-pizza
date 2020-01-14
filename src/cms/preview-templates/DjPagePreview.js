import React from 'react';
import PropTypes from 'prop-types';
import { DjPageTemplate } from '../../templates/dj-page';

const DjPagePreview = ({ entry, widgetFor }) => (
  <DjPageTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
);

DjPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default DjPagePreview;
