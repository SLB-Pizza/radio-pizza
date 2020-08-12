import React, { useState, useEffect } from "react";

/**
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @param {Object} metadata - data object from Prismic CMS that contains
 * @returns {jsx}
 */

export default function ParallaxHeadline() {
  const [bgOpacity, setBGOpacity] = useState(1);

  useEffect(() => {
    let bgIMG = document.getElementById("parallax-headline"); // works
    const bgHeight = bgIMG.clientHeight;

    const calculateOpacity = (scrollY, height) => {
      const twentyFivePercentHeight = 0.25 * height;

      if (scrollY > twentyFivePercentHeight) {
        return 0;
      }
      return (twentyFivePercentHeight - scrollY) / twentyFivePercentHeight;
    };

    const onScroll = () =>
      setBGOpacity(calculateOpacity(window.scrollY, bgHeight));

    window.addEventListener("scroll", onScroll);

    return function cleanup() {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <section
        className="hero is-fullheight-with-navbar homepage-hero"
        id="parallax-headline"
        style={{
          backgroundImage: `url(https://w.wallhaven.cc/full/48/wallhaven-48x89k.jpg)`,
          opacity: bgOpacity,
        }}
      >
        <div className="hero-body headline-block">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="content">
                  <p className="is-size-6-desktop is-size-7-touch has-text-centered category is-overlay">
                    CATEGORY
                    <span>{" ‣  subcategory"}</span>
                  </p>
                  <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-tablet is-size-4-mobile has-text-centered">
                    Article Title Goes Here: It's Got Great Big Eyecatching Text
                  </h1>
                  <h3 className="is-size-4-desktop is-size-6-touch has-text-centered">
                    Here I'd tell you a little teaser about what's to come
                    below.
                  </h3>
                  <hr />
                  <div className="columns is-centered is-vcentered">
                    <div className="column is-narrow">
                      <figure className="image is-48x48">
                        <img
                          className="is-rounded"
                          src="https://w.wallhaven.cc/full/48/wallhaven-48x89k.jpg"
                          alt="Actually a picture of a valley, not a person"
                        />
                      </figure>
                    </div>
                    <div className="column is-narrow">
                      <p className="has-text-centered">
                        Christian Mejia
                        {", "}
                        <em>Frontend Developer</em>
                      </p>
                    </div>
                    <div className="column is-narrow">
                      <p>Updated Just Now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container is-fluid"
        style={{
          marginTop: "-5.75rem",
        }}
      >
        <div className="columns is-multiline">
          <div
            className="column is-12"
            style={{
              backgroundColor: "black",
              borderTopLeftRadius: ".75rem",
              borderTopRightRadius: ".75rem",
            }}
          >
            <div className="content">
              <p>
                Andromeda aries auriga camelopardalis cancer canes venatici
                centaurus cepheus columba corona austrina eridanus hercules
                lacerta leo leo minor lupus lyra norma octans ophiuchus pisces
                pyxis scorpius sculptor scutum taurus tucana vela virgo.
                Andromeda cetus corona borealis cygnus delphinus indus lepus
                ophiuchus pyxis sculptor tucana ursa major vela. Caelum
                camelopardalis canes venatici canis major cassiopeia corona
                borealis crater crux cygnus dorado gemini grus hydra hydrus leo
                lepus lupus monoceros octans perseus puppis scorpius triangulum
                triangulum australe.
              </p>
              <p>
                Aquila carina coma berenices dorado equuleus fornax grus indus
                leo lyra mensa ophiuchus orion perseus pictor piscis austrinus
                reticulum sagitta triangulum triangulum australe vulpecula. Apus
                auriga cancer canes venatici canis major canis minor carina
                centaurus chamaeleon circinus corona borealis crater delphinus
                grus libra lupus mensa monoceros norma octans piscis austrinus
                puppis pyxis reticulum tucana ursa major ursa minor virgo.
                Cancer capricornus circinus crater leo mensa perseus reticulum
                scorpius telescopium volans.
              </p>
              <p>
                Andromeda aries auriga camelopardalis cancer canes venatici
                centaurus cepheus columba corona austrina eridanus hercules
                lacerta leo leo minor lupus lyra norma octans ophiuchus pisces
                pyxis scorpius sculptor scutum taurus tucana vela virgo.
                Andromeda cetus corona borealis cygnus delphinus indus lepus
                ophiuchus pyxis sculptor tucana ursa major vela. Caelum
                camelopardalis canes venatici canis major cassiopeia corona
                borealis crater crux cygnus dorado gemini grus hydra hydrus leo
                lepus lupus monoceros octans perseus puppis scorpius triangulum
                triangulum australe.
              </p>
              <p>
                Aquila carina coma berenices dorado equuleus fornax grus indus
                leo lyra mensa ophiuchus orion perseus pictor piscis austrinus
                reticulum sagitta triangulum triangulum australe vulpecula. Apus
                auriga cancer canes venatici canis major canis minor carina
                centaurus chamaeleon circinus corona borealis crater delphinus
                grus libra lupus mensa monoceros norma octans piscis austrinus
                puppis pyxis reticulum tucana ursa major ursa minor virgo.
                Cancer capricornus circinus crater leo mensa perseus reticulum
                scorpius telescopium volans.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// import React, { Component } from "react";
// import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";

// /**
//  * @category CMS
//  * @subcategory Slices
//  * @component
//  * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
//  * @param {Object} metadata - data object from Prismic CMS that contains
//  * @returns {jsx}
//  */
// class ParallaxHeadlineBlock extends Component {
//   render() {
//     return (
//       <Parallax pages={1.5} ref={(ref) => (this.parallax = ref)}>
//         <ParallaxLayer offset={0} speed={0.5}>
//           <section
//             className="hero is-fullheight-with-navbar homepage-hero"
//             style={{
//               backgroundImage: `url(https://w.wallhaven.cc/full/48/wallhaven-48x89k.jpg)`,
//               padding: "0",
//             }}
//           >
//             <div className="hero-body">
//               <div className="container">
//                 <div className="columns">
//                   <div className="column">
//                     {" "}
//                     <p className="is-size-6-desktop is-size-7-touch has-text-centered category">
//                       CATEGORY
//                       <span>{" ‣  subcategory"}</span>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </ParallaxLayer>
//         <ParallaxLayer offset={0.5} speed={1.1}>
//           <section class="container">
//             <div className="columns">
//               <div className="column is-full">
//                 <div className="content">
//                   <p>
//                     Andromeda aries auriga camelopardalis cancer canes venatici
//                     centaurus cepheus columba corona austrina eridanus hercules
//                     lacerta leo leo minor lupus lyra norma octans ophiuchus
//                     pisces pyxis scorpius sculptor scutum taurus tucana vela
//                     virgo. Andromeda cetus corona borealis cygnus delphinus
//                     indus lepus ophiuchus pyxis sculptor tucana ursa major vela.
//                     Caelum camelopardalis canes venatici canis major cassiopeia
//                     corona borealis crater crux cygnus dorado gemini grus hydra
//                     hydrus leo lepus lupus monoceros octans perseus puppis
//                     scorpius triangulum triangulum australe.
//                   </p>
//                   <p>
//                     Aquila carina coma berenices dorado equuleus fornax grus
//                     indus leo lyra mensa ophiuchus orion perseus pictor piscis
//                     austrinus reticulum sagitta triangulum triangulum australe
//                     vulpecula. Apus auriga cancer canes venatici canis major
//                     canis minor carina centaurus chamaeleon circinus corona
//                     borealis crater delphinus grus libra lupus mensa monoceros
//                     norma octans piscis austrinus puppis pyxis reticulum tucana
//                     ursa major ursa minor virgo. Cancer capricornus circinus
//                     crater leo mensa perseus reticulum scorpius telescopium
//                     volans.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </ParallaxLayer>
//       </Parallax>
//     );
//   }
// }

// export default ParallaxHeadlineBlock;
