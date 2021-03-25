import React from 'react'
import { HMBKSpeaking, Interviewee } from '../helpers'

/**
 * Renders an interview. Calls {@link HMBKSpeaking} and {@link Interviewee}.
 * @category CMS Slices
 * @function Interview
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create this slice
 * @returns {jsx}
 */
function Interview({ slice }) {
  return (
    <section className="section container slice">
      <div>
        {slice?.fields.map(
          ({ current_line, current_speaker, speaking_now }, index) => {
            return (
              <div
                className="columns is-mobile interview-segment"
                key={`feature-interview-${index}`}
              >
                {!speaking_now ? (
                  <HMBKSpeaking line={current_line} speaker={current_speaker} />
                ) : (
                  <Interviewee line={current_line} speaker={current_speaker} />
                )}
              </div>
            )
          }
        )}
      </div>
    </section>
  )
}

export default Interview
