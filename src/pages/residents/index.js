import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import { SingleResident } from "../../components";

/**
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

  return (
    <div className="container is-fluid black-bg-page">
      <div className="columns is-mobile is-multiline">
        <div className="column is-full">
          <h1 className="title">Halfmoon Residents</h1>
        </div>

        {/* COLUMN SELECTOR BUTTONS */}
        {["Residents", "Alumni", "Guests"].map((type, index) => (
          <div className="column" key={`column-${index}-${type}`}>
            <button
              className={
                isOpen === type
                  ? "button active is-fullwidth is-outlined is-rounded display-text"
                  : "button is-fullwidth is-outlined is-rounded display-text"
              }
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

      {/* HMBK ALUMNI */}
      {isOpen === "Alumni" ? (
        <div className="columns is-mobile is-multiline">
          {alumni.map((alumnus, index) => {
            return <SingleResident key={`Event-${index}`} resident={alumnus} />;
          })}
          <pre>{JSON.stringify(alumni, null, 2)}</pre>
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
    </div>
  );
}

export const query = graphql`
  query ResidentIndexPage {
    prismic {
      allResidents(sortBy: resident_name_ASC) {
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
