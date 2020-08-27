import React from "react";
import { graphql } from "gatsby";
import { RichText } from "prismic-reactjs";
import { HMBKDivider, SingleMixCard } from "../components";
import { ResidentSocialLinks } from "../utils";

/**
 * @category Templates
 * @subcategory Resident
 * @function ResidentTemplate
 * @param {object} data - the data object coming from Prismic CMS that contains all data needed to build cms-help off of `/residents/:uid`
 * @returns {jsx}
 */
function ResidentTemplate({ data }) {
  const prismicContent = data.prismic.allResidents.edges[0];
  if (!prismicContent) return null;
  const residentData = prismicContent.node;

  const {
    _meta,
    resident_image,
    resident_name,
    resident_status,
    resident_blurb,
    social_media,
    featured_mixes,
  } = residentData;

  return (
    <div className="container is-fluid site-page">
      <div className="columns is-multiline">
        <div className="column is-4-desktop is-4-tablet is-12-mobile sticky-bio">
          <div className="columns is-multiline">
            <div className="column is-12">
              <figure className="image is-1by1">
                <img src={resident_image.url} alt={resident_image.alt} />
              </figure>
            </div>
            <div className="column is-12 content">
              <p className="title is-size-4-desktop is-size-5-touch">
                {resident_name}
              </p>
              {RichText.render(resident_blurb)}
            </div>
          </div>
          <div className="columns is-mobile is-vcentered is-centered">
            {social_media.map((page, index) => {
              const { resident_social_page, resident_social_link } = page;
              const { url, ...rest } = resident_social_link;

              return (
                <ResidentSocialLinks
                  key={`link-${index}-${resident_social_page}`}
                  url={url}
                  platform={resident_social_page}
                />
              );
            })}
          </div>
        </div>
        <hr className="is-hidden-desktop" />

        <div className="column is-8">
          <div className="columns is-multiline">
            {/* {hmbkMixesResidents.map((singleMix, index) => {
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
                  columnLayout={stickyBioLayout}
                />
              );
            })} */}
          </div>
          <HMBKDivider />
          <pre>{JSON.stringify(residentData, null, 2)}</pre>
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
            _meta {
              uid
              type
            }
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
            featured_mixes {
              resident_mix {
                ... on PRISMIC_Mix {
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
