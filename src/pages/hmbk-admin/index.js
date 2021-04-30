import React from 'react'
import { graphql } from 'gatsby'
import { AdminHeader, AdminLinkButtons } from '../../components/admin'
import { HMBKFooter } from '../../components/helpers'

/**
 * Renders the `/hmbk-admin/` landing page
 * @category Admin Page
 * @function HMBKAdminPage
 * @returns {jsx}
 */
export default function HMBKAdminPage({ data }) {
  const totalCount = data.prismic._allDocuments.totalCount
  if (!totalCount) return null

  return (
    <main className="black-bg-page">
      {totalCount && <AdminHeader totalCount={totalCount} />}
      <section className="section container is-fluid">
        <AdminLinkButtons />
      </section>
      <HMBKFooter isFluid={true} />
    </main>
  )
}

export const query = graphql`
  query HMBKAdminQuery {
    prismic {
      _allDocuments {
        totalCount
      }
    }
  }
`
