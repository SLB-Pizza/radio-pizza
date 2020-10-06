import React, { useState } from "react";
import { graphql } from "gatsby";
import { HMBKDivider, LandingPageElement, SingleMixCard } from "../components";
import { ResidentBio } from "../components";

/**
 * @category Templates
 * @subcategory Resident
 * @function ResidentTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/residents/:uid`
 * @param {object} path - the :uid of `/residents/:uid`; passed to {@link SingleMixCard} so that it can be used by {@link getResidentLink} to compare to the `featured_residents` _meta data
 * @returns {jsx}
 */
function ResidentTemplate({ data }) {
  const [isOpen, setIsOpen] = useState("Mixes");

  const prismicContent = data.prismic.allResidents.edges[0];
  if (!prismicContent) return null;
  const residentData = prismicContent.node;

  const {
    resident_mixes,
    resident_features,
    resident_events,
    ...rest
  } = residentData;

  const residentCardLayout = "column is-12-touch is-6-desktop is-4-widescreen";

  const residentColumns = ["Mixes", "Events", "Features"];

  function toggleColumn(event) {
    if (isOpen !== event.currentTarget.id) {
      setIsOpen(event.currentTarget.id);
    }
  }

  return (
    <div className="container is-fluid full-height-page">
      <div className="columns is-multiline">
        <ResidentBio residentData={rest} />

        <hr className="is-hidden-desktop" />

        {/* RESIDENT MIX, EVENT, FEATURE SECTION */}
        <div className="column is-8-tablet is-9-desktop resident-content">
          <div className="columns is-mobile">
            {/* COLUMN SELECTOR BUTTONS */}
            {residentColumns.map((type, index) => (
              <div className="column" key={`column-${index}-${type}`}>
                <button
                  className={isOpen === type ? "button active is-fullwidth is-outlined is-rounded display-text" : "button is-fullwidth is-outlined is-rounded display-text"}
                  id={type}
                  onClick={toggleColumn}
                >
                  {type}
                </button>
              </div>
            ))}
          </div>

          {/* RESIDENT MIXES */}
          {isOpen === "Mixes" ? (
            <div className="columns is-mobile is-multiline">
              {resident_mixes.map(({ resident_mix }, index) => (
                <SingleMixCard
                  key={`resident-mix-#${index}`}
                  mixData={resident_mix}
                  columnLayout={residentCardLayout}
                />
              ))}
              <pre>{JSON.stringify(resident_mixes, null, 2)}</pre>
            </div>
          ) : null}

          {/* RESIDENT EVENTS */}
          {isOpen === "Events" ? (
            <div className="columns is-mobile is-multiline">
              {/* {resident_events.map(({ event }, index) => (
                <SingleEventCard
                  key={`resident-event-#${index}`}
                  eventData={event}
                  columnLayout={residentCardLayout}
                />
              ))} */}
              <pre>{JSON.stringify(resident_events, null, 2)}</pre>
            </div>
          ) : null}

          {/* RESIDENT Features */}
          {isOpen === "Features" ? (
            <div className="columns is-mobile is-multiline">
              {/* {resident_features.map((feature, index) => (
                <LandingPageElement
                  key={`resident-feature-#${index}`}
                  pageElement={feature}
                  imageAspectRatio="image is-16by9"
                  columnLayout="column is-6 landing-page-element"
                />
              ))} */}
              <pre>{JSON.stringify(resident_features, null, 2)}</pre>
            </div>
          ) : null}

          {/* <pre>{JSON.stringify(residentData, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query ResidentTemplateQuery($uid: String) {
    prismic {
      allResidents(uid: $uid) {
        edges {
          node {
            resident_image
            resident_name
            resident_status
            resident_blurb
            social_media {
              resident_social_page
              resident_social_link {
                ... on PRISMIC__ExternalLink {
                  target
                  _linkType
                  url
                }
              }
            }
            resident_mixes {
              resident_mix {
                ... on PRISMIC_Mix {
                  _meta {
                    tags
                    uid
                    type
                  }
                  mix_image
                  mix_title
                  mix_link
                  mix_date
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
            resident_features {
              resident_feature {
                ... on PRISMIC_Feature {
                  body {
                    ... on PRISMIC_FeatureBodyHeadline_block {
                      primary {
                        article_headline_img
                        article_headline
                        article_subtitle
                        article_subcategory
                      }
                    }
                  }
                  _meta {
                    uid
                    type
                    lastPublicationDate
                  }
                }
              }
            }
            resident_events {
              resident_event {
                ... on PRISMIC_Event {
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

export default ResidentTemplate;

// Resident Template
// Resident Img sizes (square)
// --- MOBILE ---
// --- min-max avg:  461---
// --- mean:  403.33---
// 767  - 703

// 768  - 219
// 1023 - 304

// --- DESKTOP ---
// --- min-max avg:  453.5---
// --- mean:  417.67---
// 1024 - 304
// 1215 - 368

// 1216 - 368
// 1407 - 431

// 1408 - 432
// 1920 - 603

// Mix Img sizes (square)
// --- MOBILE ---
// --- min-max avg:  574---
// --- mean:  590.33---
// 767  - 695

// 768  - 453
// 1023 - 623

// --- DESKTOP ---
// --- min-max avg:  307.5---
// --- mean:  302.5---
// 1024 - 296
// 1215 - 360

// 1216 - 229
// 1407 - 272

// 1408 - 272
// 1920 - 386
