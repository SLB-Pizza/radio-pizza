import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faSoundcloud,
  faMixcloud,
  faBandcamp,
} from "@fortawesome/free-brands-svg-icons";

function BioImageBlurb(props) {
  /**
   * @function residentSocialIcons - function that takes in props from BioMixList and creates active YT audio sources
   * @returns {link} An <a> tag with an icon that redirects out to the appropriate platform
   * @param {string} url - link to the resident's page on a platform  (bandcamp, soundcloud, mixcloud, etc.)
   * @param {icon} title - name of the corresponding FontAwesomeIcon
   */
  const residentSocialIcons = (url, icon) => {
    return (
      <a key={icon} href={url}>
        <span className="icon">
          <FontAwesomeIcon icon={icon} size="3x" />
        </span>
      </a>
    );
  };

  const sampleSocial = [
    {
      url: "https://twitter.com/home",
      icon: "faTwitter",
    },
    {
      url: "https://instagram.com",
      icon: "faInstagram",
    },
    {
      url: "https://soundcloud.com",
      icon: "faSoundCloud",
    },
    {
      url: "https://bandcamp.com",
      icon: "faBandcamp",
    },
  ];

  return (
    <div className="columns is-vcentered">
      <div className="column is-one-quarter-tablet is-3-desktop">
        <figure className="image is-1by1">
          <img src="https://robohash.org/4H1.png?set=set1" alt="Rowdy Robo" />
        </figure>
      </div>
      <div className="column is-three-quarters-tablet is-9-desktop">
        <p className="title is-size-1-desktop is-size-3-touch ">RowdyRobo</p>
        <p className="subtitle is-size-3-desktop is-size-5-touch">
          Homebuilt MixMaster Droid rev.9001
        </p>
        <p className="is-size-5-desktop is-size-7-touch">
          The only home we’ve ever known preserve and cherish that pale blue
          dot. Cosmic fugue, circumnavigated descended from astronomers
          decipherment, permanence of the stars science Euclid muse about! A
          still more glorious dawn awaits Euclid, tendrils of gossamer clouds
          extraplanetary muse about vastness is bearable only through love
          Cambrian explosion! Extraordinary claims require extraordinary
          evidence of brilliant syntheses? Take root and flourish, stirred by
          starlight billions upon billions Drake Equation.
        </p>
        <div className="resident-social-links">
          <a href="https://twitter.com">
            <span className="icon is-large">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </span>
          </a>
          <a href="https://instagram.com">
            <span className="icon is-large">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </span>
          </a>
          <a href="https://soundcloud.com">
            <span className="icon is-large">
              <FontAwesomeIcon icon={faSoundcloud} size="2x" />
            </span>
          </a>
          <a href="https://bandcamp.com">
            <span className="icon is-large">
              <FontAwesomeIcon icon={faBandcamp} size="2x" />
            </span>
          </a>
          <a href="https://mixcloud.com">
            <span className="icon is-large">
              <FontAwesomeIcon icon={faMixcloud} size="2x" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default BioImageBlurb;
