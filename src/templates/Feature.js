import React from "react";
import { graphql } from "gatsby";

const FeatureTemplate = ({ path }) => (
  <main className="container is-fluid site-page">
    <section className="columns">
      <div className="column is-full">
        <h1>DATA PATA: {path}</h1>
        {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      </div>
    </section>
  </main>
);

// export const query = graphql`
//   {
//     prismic {
//       allFeatures {
//         edges {
//           node {
//             body {
//               ... on PRISMIC_FeatureBodyText {
//                 primary {
//                   text
//                 }
//               }
//               ... on PRISMIC_FeatureBodyQuote {
//                 primary {
//                   quote
//                   name_of_the_author
//                   portrait_author
//                 }
//               }
//               ... on PRISMIC_FeatureBodyBanner_with_caption {
//                 label
//                 primary {
//                   image_banner
//                   title_of_banner
//                   description
//                   button_label
//                   button_link {
//                     _linkType
//                     ... on PRISMIC__ExternalLink {
//                       target
//                       _linkType
//                       url
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export default FeatureTemplate;
