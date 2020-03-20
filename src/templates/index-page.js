import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";

import Layout from "../components/Layout";
import Features from "../components/Features";
import BlogRoll from "../components/BlogRoll";

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro
}) => {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  const renderLoadButton = (url, title, label) => {
    return (
      <button
        className="button"
        onClick={() =>
          dispatch({
            type: "CHANGE_URL",
            payload: {
              url: url,
              title: title
            }
          })
        }
      >
        {label}
      </button>
    );
  };

  // console.log("global state in index-page", state);
  // console.log(dispatch);
  return (
    <div>
      <div
        className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`
        }}
      >
        <div
          style={{
            display: "flex",
            lineHeight: "1",
            justifyContent: "space-around",
            alignItems: "left",
            flexDirection: "column"
          }}
        >
          {renderLoadButton(
            "https://soundcloud.com/soundcloud-scenes/sets/doom-folk-and-indie",
            "Doom Folk and indie",
            "SoundCloud Source"
          )}
          {renderLoadButton(
            "https://www.mixcloud.com/HalfMoonbk/guerrer-3122020/",
            "Guerrer 03/12/2020",
            "MixCloud Source"
          )}
          {renderLoadButton(
            "https://streamer.radio.co/sa3c47c55b/listen",
            "Half Moon Radio",
            "Radio.co Half Moon Stream Source"
          )}
          {renderLoadButton(
            "https://youtu.be/yhCuCqJbOVE?t=1887",
            "CYBER DREAM SYNTHWAVE MIX",
            "Youtube Source"
          )}
          {renderLoadButton(
            "https://vimeo.com/350662849",
            "Future to the Back Mix, Best of",
            "Vimeo Source"
          )}
        </div>
      </div>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array
  })
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    // <Layout>
    <IndexPageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      heading={frontmatter.heading}
      subheading={frontmatter.subheading}
      mainpitch={frontmatter.mainpitch}
      description={frontmatter.description}
      intro={frontmatter.intro}
    />
    // </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;
