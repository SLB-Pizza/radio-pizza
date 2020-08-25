import React from "react";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTag } from "@fortawesome/free-solid-svg-icons";
import { SliceZone, SingleMixCard } from "../../components/";

/**
 * @category Pages
 * @subcategory Indexes
 * @function MixesIndex
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to display all mixes on `/mixes`
 * @returns {jsx}
 */

function MixesIndex({ data }) {
  /**
   * **NB:** allMixs is NOT a typo.
   */
  const prismicContent = data.prismic.allMixs.edges;
  if (!prismicContent) return null;

  /**
   * Grab and manip the nodes array of mixs
   */
  const allMixesData = prismicContent;

  // const { _meta, body } = leadFeatureData;

  const mixListLayout =
    "column is-12-mobile is-6-tablet is-4-desktop is-3-widescreen";
  const dummyOptions = [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ];

  return (
    <main className="site-page">
      {/* FIRST SECTION - Header Section */}
      <header className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          <div className="column is-full">
            <p className="title is-size-3-desktop is-size-4-touch">
              Recent Mixes
            </p>
            <p className="subtitle is-size-5-desktop is-size-6-touch">
              These dummy mixes are the same as the ones on the home page. You
              can hover/touch and play them the same way. Try it!
            </p>
          </div>
          <div className="column is-9-widescreen is-8-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left has-icons-right">
                {/* <div className="control is-expanded has-icons-left has-icons-right is-loading is-medium"> */}
                <input
                  className="input is-rounded"
                  type="text"
                  placeholder="Search all mixes..."
                />
                <span className="icon is-left">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
              </div>
            </div>
          </div>
          <div className="column is-3-widescreen is-4-tablet is-12-mobile">
            <div className="field">
              <div className="control is-expanded has-icons-left">
                <div className="select is-fullwidth is-rounded">
                  <select name="country">
                    <option value="">--Country--</option>
                    {dummyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="icon is-left">
                  <FontAwesomeIcon icon={faTag} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* SECOND SECTION - Mix section */}
      <section className="container is-fluid">
        <div className="columns is-mobile is-multiline">
          {/* All Mixs data in pulled correctly */}
          <hr />
          {allMixesData.map((singleMix, index) => {
            const {
              _meta,
              mix_date,
              mix_image,
              mix_link,
              mix_title,
              featured_residents,
            } = singleMix.node;

            return (
              <SingleMixCard
                key={`mix-#${index}-${mix_title}`}
                date={mix_date}
                url={mix_link}
                title={mix_title}
                residents={featured_residents}
                img={mix_image}
                tags={_meta.tags}
                columnLayout={mixListLayout}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export const query = graphql`
  query MixesIndexPage {
    prismic {
      allMixs(sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
              lastPublicationDate
              firstPublicationDate
              type
              tags
            }
            mix_date
            mix_image
            mix_link
            mix_title
            featured_residents {
              mix_resident {
                ... on PRISMIC_Resident {
                  resident_name
                  _meta {
                    uid
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default MixesIndex;
