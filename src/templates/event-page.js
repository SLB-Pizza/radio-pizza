import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const EventPageTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  start,
  end,
  active,
  location,
  helmet,
  eventImage,
  featuredEventImage,
}) => {
  const EventContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              Event NAME
            </h1>
            <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
              {title}
            </h3>
            {eventImage && eventImage.length ? (
              <img src={eventImage} alt="event image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Event Image
              </h3>
            )}
            {featuredEventImage && featuredEventImage.length ? (
              <img src={featuredEventImage} alt="featured event image" />
            ) : (
              <h3 className="title is-size-3 has-text-weight-normal is-bold-light">
                Add Featured Event Image
              </h3>
            )}
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              EVENT DESCRIPTION
            </h2>
            <p>{description}</p>
            <h3 className="title is-size-3 has-text-weight-bold is-bold-light">
              CONTENT:
            </h3>
            <EventContent content={content} />
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              ACTIVE EVENT ?
            </h2>
            {active ? (
              <div>
                <h3>ACTIVE</h3>
                <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
                  START TIME: {start}
                </h2>
                <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
                  END TIME: {end}
                </h2>
              </div>
            ) : (
              <div>NOT ACTIVE</div>
            )}
            <h2 className="title is-size-2 has-text-weight-bold is-bold-light">
              location: {location}
            </h2>
            <h4>Tags</h4>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
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

EventPageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  helmet: PropTypes.object,
};

const EventPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <EventPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | EVENT">
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

EventPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default EventPage;

export const pageQuery = graphql`
  query EventPageByID($id: String!) {
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
