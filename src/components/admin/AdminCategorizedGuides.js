import React from 'react'
import { SingleFeatureCard } from '../../components'

/**
 * Renders the CMS Guide data categorized by {@link AdminGuides} by creating a section with titling for each new category.
 * @category Admin Helper
 * @function AdminCategorizedGuides
 * @param {Object} guideData -
 * @prop {String} guideData.title - name of the category section
 * @prop {Object[]} guideData.data - array of CMS guide objects to map based on their category
 * @returns {jsx}
 */
export default function AdminCategorizedGuides({ guideData }) {
  return Object.values(guideData).map(({ title, data }, index) => (
    <section
      key={`HMBK-guide-category-${index}`}
      className="container is-fluid"
    >
      <div className="columns is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="title is-size-3-desktop is-size-4-touch">
            {title ? title : 'Uncategorized'}
          </h2>
        </div>
        {data?.map((node, index) => (
          <SingleFeatureCard
            key={`HMBK-guide-${index}`}
            data={node}
            columnLayout={'column is-12-mobile is-6-tablet'}
          />
        ))}
      </div>
    </section>
  ))
}
