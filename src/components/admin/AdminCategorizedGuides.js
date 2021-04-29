import React from 'react'
import { Link } from 'gatsby'
import { linkResolver } from '../../utils'
import { SingleFeatureCard } from '../../components'

export default function AdminCategorizedGuides({ guideData }) {
  return Object.values(guideData).map(({ title, data }, index) => (
    <section className="container is-fluid">
      <div className="columns is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="title is-size-3-desktop is-size-4-touch">{title}</h2>
        </div>
        {data.map((node, index) => (
          <div key={`HMBK-guide-${index}`} className="column is-12">
            <Link to={linkResolver(node._meta)}>
              <SingleFeatureCard
                data={node}
                columnLayout={'column is-12-mobile is-6-tablet'}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  ))
}
