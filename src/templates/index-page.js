import React, { useContext } from "react";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import {
  GlobalDispatchContext,
  GlobalStateContext
} from "../context/GlobalContextProvider";

import { Hero, HomeContent } from "../components/index";

import "../components/styles/index.scss";
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
        className="button is-fullwidth"
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

  const soundcloudBtn = renderLoadButton(
    "https://soundcloud.com/soundcloud-scenes/sets/doom-folk-and-indie",
    "Doom Folk and indie",
    "SoundCloud"
  );
  const mixcloudBtn = renderLoadButton(
    "https://www.mixcloud.com/HalfMoonbk/guerrer-3122020/",
    "Guerrer 03/12/2020",
    "MixCloud"
  );
  const radioCoBtn = renderLoadButton(
    "https://streamer.radio.co/sa3c47c55b/listen",
    "Half Moon Radio",
    "Radio.co Halfmoon Stream"
  );
  const youtubeBtn = renderLoadButton(
    "https://youtu.be/yhCuCqJbOVE?t=1887",
    "CYBER DREAM SYNTHWAVE MIX",
    "Youtube"
  );
  const vimeoBtn = renderLoadButton(
    "https://vimeo.com/350662849",
    "Future to the Back Mix, Best of",
    "Vimeo"
  );

  return (
    <div className="has-navbar-fixed-bottom">
      <Hero
        heading={heading}
        soundcloudBtn={soundcloudBtn}
        mixcloudBtn={mixcloudBtn}
        radioCoBtn={radioCoBtn}
        youtubeBtn={youtubeBtn}
        vimeoBtn={vimeoBtn}
      />
      <HomeContent />
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
