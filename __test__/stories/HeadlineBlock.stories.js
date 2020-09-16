import React from "react";
import { ArticleHeadline } from "../../src/components/slices";
import "../../src/styles/index.scss";

export default {
  title: "Prismic CMS Slices/Headline Block",
  component: ArticleHeadline,
};

const metadata = {
  uid: "dev-feature-mjaAsu-uiE-OqM",
  firstPublicationDate: "2020-07-02T10:19:47Z",
  lastPublicationDate: "2020-02-21T04:18:19Z",
  type: "feature",
  tags: ["amet nunc"],
};

const sliceData = {
  type: "headline_block",
  primary: {
    article_author_pic: {
      dimensions: {
        width: 128,
        height: 128,
      },
      alt: "Proin interdum mauris non ligula pellentesque ultrices.",
      copyright:
        "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
      url: "http://dummyimage.com/128x128.jpg/dddddd/000000",
    },
    article_author: {
      hmbk_staff_name: "in tempus",
      hmbk_staff_position: "nulla",
    },
    article_category: "Feature",
    article_headline: [
      {
        type: "heading1",
        text:
          "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
      },
    ],
    article_headline_img: {
      dimensions: {
        width: 1920,
        height: 1080,
      },
      alt: "In quis justo.",
      copyright: "Phasellus id sapien in sapien iaculis congue.",
      url: "http://dummyimage.com/1920x1080.jpg/dddddd/000000",
    },
    article_subcategory: "Profile",
    article_subtitle: [
      {
        type: "heading4",
        text: "Nulla tempus.",
        spans: [],
      },
    ],
  },
};

export const baseLayout = () => (
  <>
    <main style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <ArticleHeadline slice={sliceData} metadata={metadata} />
    </main>
  </>
);
