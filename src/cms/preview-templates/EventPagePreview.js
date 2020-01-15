import React from 'react';
import PropTypes from 'prop-types';
import { EventPageTemplate } from '../../templates/event-page';

const EventPagePreview = ({ entry, widgetFor }) => (
  <EventPageTemplate
    // content={widgetFor('streams')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    active={entry.getIn(['data', 'active'])}
    eventImage={entry.getIn(['data', 'eventimage'])}
    featuredImage={entry.getIn(['data', 'featuredeventimage'])}
    startTime={entry.getIn(['data', 'start'])}
    endTime={entry.getIn(['data', 'end'])}
    location={entry.getIn(['data', 'location'])}
    url={entry.getIn(['data', 'eventurl'])}
  />
);

EventPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
  eventImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  featuredEventImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default EventPagePreview;
