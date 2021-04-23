import React from 'react'

/**
 * Renders when there are no future (including today) dates with scheduled entries
 * @category Admin Helper
 * @function NoFutureShowsScheduled
 * @returns {jsx}
 */
export default function NoFutureShowsScheduled() {
  return (
    <article className="columns is-mobile is-multiline schedule-page-entries">
      <div className="column schedule-date-header__sched-page">
        <p className="title is-size-4-desktop is-size-5-touch has-text-centered">
          No Future Shows Scheduled!
        </p>
      </div>
      <div className="section is-medium column is-12 content">
        <p className="subtitle is-size-5-desktop is-size-6-touch has-text-centered text-block">
          <a href="https://hmbk-cms.prismic.io/" target="_blank" rel="noopener">
            Add some schedule entries to the CMS!
          </a>
        </p>
      </div>
    </article>
  )
}
