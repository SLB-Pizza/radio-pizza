import React from 'react'
import { Link } from 'gatsby'
import Nanoclamp from 'nanoclamp'
import { FallbackImage, linkResolver } from '../utils'

/**
 * Returns a Resident card that onClick takes you to that Resident's page, generated by {@link ResidentTemplate}. Calls on {@link FallbackImage} to provide images in the case that a resident's resident_image is null.
 * @category Media Card
 * @function SingleResidentCard
 * @param {Object} resident - Prismic CMS data object containing all data needed to build resident cards that link out to a `/residents/:uid`
 * @property {Object} _meta - contains the uid and type for use with {@link linkResolver}
 * @property {String} resident_name - the resident's name
 * @property {Object} resident_image - contains the resident image's dimensions object, alt text string, copyright string, and url string
 * @returns {jsx}
 */
function SingleResidentCard({ resident }) {
  const { _meta, resident_name, resident_image } = resident

  return (
    <article className="column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen resident-box">
      <Link to={linkResolver(_meta)}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-1by1">
              {resident_image ? (
                <img src={resident_image.url} alt={resident_image.alt} />
              ) : (
                <FallbackImage />
              )}
            </figure>
          </div>
          <div className="card-content">
            <Nanoclamp
              is="p"
              className="title has-text-centered is-size-6"
              lines={2}
              text={resident_name}
            />
          </div>
        </div>
      </Link>
    </article>
  )
}
export default SingleResidentCard