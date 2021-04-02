import React from 'react'
import { SamplesAdminContent } from '../../../components'
import linkData from './data/SampleIndexLinkData.json'

/**
 * Renders the Admin-only route `/hmbk-admin/samples` index page.
 * @category Pages
 * @function AdminSampleIndex
 * @returns {jsx}
 */
export default function AdminSampleIndex() {
  return (
    <main className="black-bg-page">
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-12 content">
            <h1 className="title is-4-touch">Samples Index Page</h1>
          </div>
        </div>
      </header>
      <section className="section container">
        {linkData.map(({ section }, index) => (
          <SamplesAdminContent key={`sample-page-${index}`} section={section} />
        ))}
      </section>
      <pre>{JSON.stringify(linkData, null, 2)}</pre>
    </main>
  )
}
