import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const DjPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  featured,
  artistImage,
  featuredImage,
}) => {
  const DjContent = contentComponent || Content;

  return (
    <StaticQuery
        query={graphql`
          query {
            markdownRemark {
              id
              html
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                description
                tags
              }
            }
          }
        `}
        render = {
          <section className="section">
            {helmet || ''}
            <div className="container content">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                    DJ NAME
                  </h1>
                  <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                    {title}
                  </h3>
                  {artistImage && artistImage.length ? (
                    <img src={artistImage} alt="artist image" />
                  ) : (
                    <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                      Add Artist Image
                    </h3>
                  )}
                  {featuredImage && featuredImage.length ? (
                    <img src={featuredImage} alt="featured image" />
                  ) : (
                    <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                      Add Featured Image
                    </h3>
                  )}
                  <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
                    DJ DESCRIPTION
                  </h2>
                  <p>{description}</p>
                  <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
                    DJ STREAMS
                  </h3>
                  <DjContent content={content} />
                  <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
                    FEATUED DJ:
                  </h2>
                  {featured ? <div>FEATURED</div> : <div>NOT FEATURED</div>}

                  {tags && tags.length ? (
                    <div style={{ marginTop: `4rem` }}>
                      <h4>Tags</h4>
                      <ul className="taglist">
                        {tags.map(tag => (
                          <li key={tag + `tag`}>
                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div style={{ marginTop: `4rem` }}>
                      <h4>NO TAGS YET</h4>{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        }
      />
  );
};

DjPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const DjPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <DjPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | RESIDENT ARTIST">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

DjPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default DjPage;

// export const pageQuery = graphql`
//   query DjPageByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         description
//         tags
//       }
//     }
//   }
// `;
