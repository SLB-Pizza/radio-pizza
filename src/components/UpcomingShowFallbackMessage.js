import React from 'react'

export default function UpcomingShowFallbackMessage({ isLoading }) {
  return (
    <div
      className={
        isLoading
          ? 'column next-show is-hidden-mobile text-block'
          : 'column next-show is-hidden-mobile text-block is-loaded'
      }
    >
      <p className="subtitle is-size-6-desktop is-size-7-touch">
        No upcoming shows planned. Follow us on our{' '}
        <a href="https://twitter.com/halfmoonbk" rel="noopener" target="_blank">
          Twitter
        </a>
        {', '}
        <a
          href="https://www.instagram.com/halfmoonbk/"
          rel="noopener"
          target="_blank"
        >
          Instagram
        </a>
        {', and '}
        <a
          href="https://www.facebook.com/halfmoonbk/"
          rel="noopener"
          target="_blank"
        >
          Facebook
        </a>
        {' for all the latest HMBK news.'}
      </p>
    </div>
  )
}
