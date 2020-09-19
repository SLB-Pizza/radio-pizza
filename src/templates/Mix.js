import React from "react";
import { Link, graphql } from "gatsby";
import { MixPlayOverlay } from "../components";
import { RichText } from "prismic-reactjs";
import { linkResolver, getResidentString } from "../utils";

/**
 * @category Templates
 * @subcategory Mix
 * @function MixTemplate
 * @param {object} data - Prismic CMS data object containing all data needed to build `/mixes/:uid`
 * @returns {jsx}
 */

function MixTemplate({ data }) {
  const prismicContent = data.prismic.allMixs.edges[0];
  if (!prismicContent) return null;
  const mixData = prismicContent.node;

  const {
    _meta,
    mix_date,
    mix_image,
    mix_link,
    mix_title,
    featured_residents,
  } = mixData;

  const mixResidentString = getResidentString(featured_residents);

  return (
    <main className="black-bg-page">
      <article className="container">
        <div className="columns is-mobile">
          {mix_title !== null ? (
            <div className="column content">
              <h1 className="title">{mix_title}</h1>
              <h3 className="subtitle">{mixResidentString}</h3>
              <p>{mix_date}</p>
            </div>
          ) : (
            <div className="column content">
              <h1 className="title">{mixResidentString}</h1>
              <p className="subtitle">{mix_date}</p>
            </div>
          )}
          <MixPlayOverlay
            wrapperClassName="column is-narrow"
            url={mix_link}
            title={mix_title}
            residents={mixResidentString}
            img={mix_image}
          />
        </div>
        <div className="columns is-mobile">
          <div className="column is-12 content">
            <h3 className="title">Mix Blurb here</h3>
          </div>
        </div>
        <div className="columns is-mobile">
          <div className="column is-12 content">
            <pre>{JSON.stringify(mixData, null, 2)}</pre>
          </div>
        </div>
      </article>
    </main>
  );
}

export const query = graphql`
  query MixTemplatePage($uid: String) {
    prismic {
      allMixs(uid: $uid, sortBy: meta_firstPublicationDate_DESC) {
        edges {
          node {
            _meta {
              uid
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
                  resident_image
                  resident_name
                  resident_status
                  event_appearances {
                    resident_event {
                      ... on PRISMIC_Event {
                        _meta {
                          uid
                          type
                        }
                      }
                    }
                  }
                  article_features {
                    resident_feature {
                      ... on PRISMIC_Feature {
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

export default MixTemplate;
