import { checkPropTypes } from 'prop-types'
import React from 'react'
import PropTypes from 'prop-types'
import { linkResolver } from '../utils'

function FeaturedResident({ collectionResidents }) {
  return collectionResidents.map((resident, index) => {
    const { _meta, resident_name } = resident
    return (
      <li key={`collection-resident-${index}`} className="column is-4">
        {resident_name}
      </li>
    )
  })
}
export default FeaturedResident
