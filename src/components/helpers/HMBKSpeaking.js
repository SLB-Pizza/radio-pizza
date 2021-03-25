import React from 'react'
import { RichText } from 'prismic-reactjs'

/**
 * Renders the HMBK side of an {@link Interview} slice.
 * @category Slice Helper
 * @function HMBKSpeaking
 * @param {Object} line - The question from the HMBK side
 * @param {String} [speaker="HMBK"] - Name of the HMBK speaker
 * @returns {jsx}
 */
export default function HMBKSpeaking({ line, speaker }) {
  return (
    <div className="column is-10 interview-speaker__hmbk content">
      {line && <p className="title is-5">{RichText.asText(line)}</p>}
      {speaker && <p className="subtitle is-6 is-italic speaker">{speaker}</p>}
    </div>
  )
}
