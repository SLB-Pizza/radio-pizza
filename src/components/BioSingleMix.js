import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

function BioSingleMix(props) {
  return (
    <div className="column is-6-tablet is-3-desktop">
      <div className="resident-mix">
        <div className="bio-mix-image">
          <div className="play-btn-diffuser">
            <span>
              <FontAwesomeIcon icon={faPlayCircle} size="10x" />
            </span>
          </div>
        </div>
        <div className="item-content">
          <div>
            <p className="content-date is-size-7">03.30.20</p>
          </div>
          <p className="title is-size-5-mobile is-size-4-tablet is-size-3-fullhd">
            Lorem Ipsum Dolor
          </p>
          <p className="subtitle is-size-7-mobile is-size-6-tablet is-size-5-fullhd">
            Resident Artist
          </p>
          <div className="tags are-small">
            <span className="tag is-dark">Genre</span>
            <span className="tag is-dark">Genrerock</span>
            <span className="tag is-dark">Alt-Genre</span>
            <span className="tag is-dark">Genrecore</span>
            <span className="tag is-dark">Post-Genre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BioSingleMix;

//==================================
// <BioSingleMix />
//==================================
// .resident-mix {
//   border: 0.125rem solid white;
//   padding: 0.25rem;
//   background-color: black;

//   margin: 0.5rem;
//   transition: ease-in-out 0.25s;

//   .bio-mix-image {
//     background-image: url(https://source.unsplash.com/1080x1080/weekly?nature);
//     background-position: center center;
//     background-repeat: no-repeat;
//     background-attachment: scroll;
//     background-size: cover;

//     .play-btn-diffuser {
//       padding: 25%;
//       display: flex;
//       justify-content: center;
//       transition: ease-in-out 0.25s;

//       span {
//         color: transparent;
//         transition: ease-in-out 0.25s;
//       }
//     }
//   }

//   &:hover {
//     margin: 0;
//     box-shadow: 10px 8px 5px black;

//     .play-btn-diffuser {
//       padding: 25%;
//       display: flex;
//       justify-content: center;
//       background-color: rgba($color: black, $alpha: 0.75);

//       span {
//         color: white;
//         &:active {
//           color: $primary;
//         }
//       }
//     }
//   }

//   .item-content {
//     padding: 0.5rem;

//     .content-date {
//       margin-bottom: 0;
//       padding-bottom: 0;
//     }
//     .title {
//       margin-top: 0;
//       padding-top: 0;
//     }
//   }
// }
