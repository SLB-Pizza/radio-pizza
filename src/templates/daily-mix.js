import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const DailyMixPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  dailyMixImage,
  featuredDailyMixImage,
  artistList,
  urls,
}) => {
  const ShowContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              MIX NAME
            </h1>
            <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
              {title}
            </h3>
            {dailyMixImage && dailyMixImage.length ? (
              <img src={dailyMixImage} alt="show image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Daily Mix Image
              </h3>
            )}
            {featuredDailyMixImage && featuredDailyMixImage.length ? (
              <img src={featuredDailyMixImage} alt="featured show image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Featured Daily Mix Image
              </h3>
            )}
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              MIX DESCRIPTION
            </h2>
            <p>{description}</p>
            <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
              MIX urls: {urls}
            </h3>
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              FEATUED ARTISTS IN MIX: {artistList}
            </h2>
            
            {/* {recurring ? (
              <div>
                Schedule:{' '}
                <div>
                  {' '}
                  {replays._tail.array.map(day => {
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

DailyMixPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const DailyMixPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <DailyMixPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | DAILY MIX">
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

DailyMixPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default DailyMixPage;

export const pageQuery = graphql`
  query DailyMixPageByID($id: String!) {
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
