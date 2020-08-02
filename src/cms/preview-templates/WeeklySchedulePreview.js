import React from 'react';
import PropTypes from 'prop-types';
import { WeeklyScheduleTemplate } from '../../templates/weekly-schedule';

const WeeklySchedulePreview = ({ entry, widgetFor }) => (
	<WeeklyScheduleTemplate
		content={widgetFor('artists')}
		description={entry.getIn(['data', 'description'])}
		// tags={entry.getIn(['data', 'tags'])}
		// title={entry.getIn(['data', 'name'])}
		// featured={entry.getIn(['data', 'featuredartist'])}
		// artistImage={entry.getIn(['data', 'artistimage'])}
		// featuredImage={entry.getIn(['data', 'featuredimage'])}
	/>
);

WeeklySchedulePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
	// artistImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	// featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default WeeklySchedulePreview;
