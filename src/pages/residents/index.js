import React, { useState } from "react";
import { SingleResident } from "../../components";

/**
 * TO REMOVE IN THIS FILE FOR SHIPMENT
 * alphabetizedResidents helper function (do it in gql query)
 *
 * TO CHANGE IN THIS FILE
 * change alphabetizedResidents map to actual artist data
 *
 * @category Pages
 * @subcategory Indexes
 * @function ResidentIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build the `/residents` landing page
 * @returns {jsx}
 */

function ResidentsIndex({ data }) {
  const [isOpen, setIsOpen] = useState("Residents");

  const prismicContent = data.prismic.allResidents.edges;
  if (!prismicContent) return null;
  const allResidentsData = prismicContent;

  const residentTypes = ["Residents", "Guests", "Alumni"];
  let residents = [];
  let guests = [];
  let alumni = [];

  allResidentsData.forEach(({ node }) => {
    if (node.resident_status === "Resident") {
      residents.push(node);
    }
    if (node.resident_status === "Guest") {
      guests.push(node);
    }
    if (node.resident_status === "Alumnus") {
      alumni.push(node);
    }
  });

  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id);
    }
  }

  // const alphabetizedResidents = dummyArtists.sort((a, b) => {
  //   let nameA = a.name.toUpperCase(); // make both uppercase so...
  //   let nameB = b.name.toUpperCase(); // ...it ignore capitals in sorting

  //   if (nameA < nameB) {
  //     return -1; //nameA comes first
  //   }
  //   if (nameA > nameB) {
  //     return 1; // nameB comes first
  //   }
  //   return 0; // names are the same
  // });

  return (
    <div className="container is-fluid black-bg-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full content">
          <h1 className="title is-size-1-desktop is-size-2-tablet is-size-3-mobile">
            Halfmoon Residents
          </h1>
        </div>

        {/* COLUMN SELECTOR BUTTONS */}
        {residentTypes.map((type, index) => (
          <div className="column" key={`column-${index}-${type}`}>
            <button
              className="button is-fullwidth is-outlined is-rounded display-text"
              id={type}
              onClick={toggleColumn}
            >
              {type}
            </button>
          </div>
        ))}
      </div>

      {/* CURRENT HMBK RESIDENTS */}
      {isOpen === "Residents" ? (
        <div className="columns is-mobile is-multiline">
          {residents.map((resident, index) => {
            return (
              <SingleResident key={`Event-${index}`} resident={resident} />
            );
          })}
          <pre>{JSON.stringify(residents, null, 2)}</pre>
        </div>
      ) : null}

      {/* HMBK GUESTS */}
      {isOpen === "Guests" ? (
        <div className="columns is-mobile is-multiline">
          {guests.map((guest, index) => {
            return <SingleResident key={`Event-${index}`} resident={guest} />;
          })}
          <pre>{JSON.stringify(guests, null, 2)}</pre>
        </div>
      ) : null}

      {/* HMBK ALUMNI */}
      {isOpen === "Alumni" ? (
        <div className="columns is-mobile is-multiline">
          {alumni.map((alumnus, index) => {
            return <SingleResident key={`Event-${index}`} resident={alumnus} />;
          })}
          <pre>{JSON.stringify(alumni, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
}

export const query = graphql`
  query ResidentIndexPage {
    prismic {
      allResidents(sortBy: resident_status_ASC) {
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
`;

export default ResidentsIndex;
