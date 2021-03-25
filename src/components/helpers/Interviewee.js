import React from 'react'
import { RichText } from 'prismic-reactjs'
import { htmlSerializer, linkResolver } from '../../utils'

/**
 * Render the Answer side of an {@link Interview} slice.
 * @category Slice Helper
 * @function Interviewee
 * @param {Object} line - The answer to a question
 * @param {String} [speaker="Answer"] - Name of the speaker
 * @returns
 */
export default function Interviewee({ line, speaker = 'Answer' }) {
  return (
    <div className="column is-offset-1 is-11 interview-speaker__answer content">
      {line && (
        <RichText
          render={line}
          htmlSerializer={htmlSerializer}
          linkResolver={linkResolver}
        />
      )}
      {speaker && <p className="subtitle is-6 is-italic speaker">{speaker}</p>}
    </div>
  )
}
