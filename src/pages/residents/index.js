import React, { Fragment, useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import { SingleResident } from '../../components'

/**
 * @category Pages
 * @function ResidentIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentsIndex({ data }) {
  const [isOpen, setIsOpen] = useState('Residents')
  const [residentsData, setResidentsData] = useState(null)
  const [alumniData, setAlumniData] = useState(null)
  const [guestsData, setGuestsData] = useState(null)
  const [categoryStatus, setCategoryStatus] = useState(null)

  const prismicContent = data.prismic
  if (!prismicContent) return null

  useEffect(() => {
    /**
     * Get the three data subarrays and set their respective states.
     */
    const setCategoryData = () => {
      setResidentsData(data.prismic.residents.edges)
      setAlumniData(data.prismic.alumni.edges)
      setGuestsData(data.prismic.guests.edges)

      /**
       * categoryStatus mapped to make the resident type selection buttons
       * type: used to name the resident category button
       * hasData: uses length of each edges data array to set up a ternary return
       *  - if length > 0: Render a button with the onClick toggle function
       *  - else: don't render a button for that category
       */
      setCategoryStatus([
        {
          type: 'Residents',
          hasData: data.prismic.residents.edges.length,
        },
        {
          type: 'Alumni',
          hasData: data.prismic.alumni.edges.length,
        },
        {
          type: 'Guests',
          hasData: data.prismic.guests.edges.length,
        },
      ])
    }

    return setCategoryData()
  }, [data])

  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id)
    }
  }

  return (
    <main className="black-bg-page">
      <div className="container is-fluid">
        <header className="columns is-mobile">
          <div className="column is-full">
            <h1 className="title is-size-3-desktop is-size-5-touch">
              Halfmoon Residents
            </h1>
          </div>
        </header>

        <section className="columns is-mobile is-variable is-2">
          {/* RESIDENT TYPE SELECTOR BUTTONS */}
          {categoryStatus &&
            categoryStatus.map(({ type, hasData }, index) =>
              hasData ? (
                <Fragment key={`column-${index}-${type}`}>
                  {/* DESKTOP SIZED BUTTONS */}
                  <div className="column is-hidden-mobile">
                    <button
                      className={
                        isOpen === type
                          ? 'button active is-fullwidth is-outlined is-rounded'
                          : 'button is-fullwidth is-outlined is-rounded'
                      }
                      id={type}
                      onClick={toggleColumn}
                    >
                      {type}
                    </button>
                  </div>
                  {/* TOUCH SIZED BUTTONS */}
                  <div className="column is-hidden-tablet">
                    <button
                      className={
                        isOpen === type
                          ? 'button is-small active is-fullwidth is-outlined is-rounded'
                          : 'button is-small is-fullwidth is-outlined is-rounded'
                      }
                      id={type}
                      onClick={toggleColumn}
                    >
                      {type}
                    </button>
                  </div>
                </Fragment>
              ) : null
            )}
        </section>

        {/* CURRENT HMBK RESIDENTS */}
        {isOpen === 'Residents' ? (
          <div className="columns is-mobile is-multiline">
            {residentsData &&
              residentsData.map(({ node }, index) => {
                return (
                  <SingleResident key={`Resident-${index}`} resident={node} />
                )
              })}
          </div>
        ) : null}

        {/* HMBK ALUMNI */}
        {isOpen === 'Alumni' ? (
          <div className="columns is-mobile is-multiline">
            {alumniData &&
              alumniData.map(({ node }, index) => {
                return (
                  <SingleResident key={`Alumnus-${index}`} resident={node} />
                )
              })}
          </div>
        ) : null}

        {/* HMBK GUESTS */}
        {isOpen === 'Guests' ? (
          <div className="columns is-mobile is-multiline">
            {guestsData &&
              guestsData.map(({ node }, index) => {
                return (
                  <SingleResident key={`Guests-${index}`} resident={node} />
                )
              })}
          </div>
        ) : null}
        {/* <pre>{JSON.stringify(data.prismic, null, 2)}</pre> */}
      </div>
    </main>
  )
}

export const query = graphql`
  query ResidentIndexPage {
    prismic {
      residents: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Resident" }
      ) {
        edges {
          node {
            _meta {
              uid
              type
            }
            resident_name
            resident_image
            resident_status
          }
        }
      }
      alumni: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Alumni" }
      ) {
        edges {
          node {
            _meta {
              uid
              type
            }
            resident_name
            resident_image
            resident_status
          }
        }
      }
      guests: allResidents(
        sortBy: resident_name_ASC
        where: { resident_status: "Guest" }
      ) {
        edges {
          node {
            _meta {
              uid
              type
            }
            resident_name
            resident_image
            resident_status
          }
        }
      }
    }
  }
`

export default ResidentsIndex

// Resident Square Image sizes
// --- MOBILE ---
// --- CMS Size: 500
// --- min-max avg:  513.5---
// --- mean:  495.67---
// 767  - 695

// 768  - 218
// 1023 - 307

// --- DESKTOP ---
// --- min-max avg:  350---
// --- mean:  329.33---
// 1024 - 222
// 1215 - 269

// 1216 - 270
// 1407 - 318

// 1408 - 318
// 1920 - 446
