import React from "react";
import { Helmet } from "react-helmet";
import "./all.sass";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

// Christian's imports
import { TopNav, BottomNav } from "../components/two-bar";

// imports by Rich
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
// import ReactPlayer from 'react-player';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/sound-icon.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/sound-icon-small.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix("/")}img/HalfMoon-3.jpg`}
        />
      </Helmet>
      <TopNav />
      {/*
      RICH ORIGINAL
      <Navbar />
      <ReactPlayer url="https://www.mixcloud.com/HalfMoonbk/donis-dez-andres-11222019/" /> */}
      <div>{children}</div>
      {/*
      RICH ORIGINAL
      <Footer /> */}
      <BottomNav />
    </div>
  );
};

export default TemplateWrapper;
