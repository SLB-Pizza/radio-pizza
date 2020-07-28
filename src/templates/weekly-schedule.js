import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const WeeklyScheduleTemplate = ({
  content,
  // contentComponent,
  // description,
  // tags,
  // title,
  // helmet,
}) => {
  // const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {/* {helmet || ''} */}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              "TEST 1234"
            </h1>
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

// WeeklyScheduleTemplate.propTypes = {
// 	content: PropTypes.node.isRequired,
// 	contentComponent: PropTypes.func,
// 	description: PropTypes.string,
// 	title: PropTypes.string,
// 	helmet: PropTypes.object,
// };

const WeeklySchedule = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    // <Layout>
    <WeeklyScheduleTemplate
      content={"TEST CONTENT"}
      // contentComponent={HTMLContent}
      // description={post.frontmatter.description}
      // helmet={
      //   <Helmet titleTemplate="%s | Blog">
      //     <title>{`${post.frontmatter.title}`}</title>
      //     <meta
      //       name="description"
      //       content={`${post.frontmatter.description}`}
      //     />
      //   </Helmet>
      // }
      // tags={post.frontmatter.tags}
      // title={post.frontmatter.title}
    />
    // </Layout>
  );
};

// WeeklySchedule.propTypes = {
// 	data: PropTypes.shape({
// 		markdownRemark: PropTypes.object,
// 	}),
// };

export default WeeklySchedule;

export const pageQuery = graphql`
  query WeeklyScheduleDummyQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
