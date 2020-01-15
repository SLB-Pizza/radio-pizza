import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const ShowPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  recurring,
  airTime,
  replays,
  showImage,
  featuredShowImage,
  featuredArtist,
  url,
}) => {
  const ShowContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              SHOW NAME
            </h1>
            <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
              {title}
            </h3>
            {showImage && showImage.length ? (
              <img src={showImage} alt="show image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Show Image
              </h3>
            )}
            {featuredShowImage && featuredShowImage.length ? (
              <img src={featuredShowImage} alt="featured show image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Featured Show Image
              </h3>
            )}
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              SHOW DESCRIPTION
            </h2>
            <p>{description}</p>
            <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
              SHOW URL: {url}
            </h3>
            {/* <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              FEATUED ARTIST: {featuredArtist.name}
            </h2> */}
            {featuredArtist && console.log('related artist', featuredArtist)}
            {recurring && console.log('recurring?', recurring)}
            {replays && console.log('replays', replays)}
            {/* {recurring ? (
              <div>
                Schedule:{' '}
                <div>
                  {' '}
                  {replays.map(day => {
                    <li key={'On ' + day}>
                      <h5>
                        {day}'s @ {airTime}
                      </h5>
                    </li>;
                  })}
                </div>{' '}
              </div>
            ) : (
              <div>Schedule: {airTime}</div>
            )} */}

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
  );
};

ShowPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const ShowPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ShowPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | RADIO SHOW">
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

ShowPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ShowPage;

export const pageQuery = graphql`
  query ShowPageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`;
