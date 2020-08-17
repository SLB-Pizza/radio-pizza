import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";

/**
 * @category CMS
 * @subcategory Slices
 * @component
 * @param {Object} slice - data object from Prismic CMS that contains all content data needed to create the HeadlineBlock slice
 * @returns {jsx}
 */

export default function ParallaxHeadline({ cta, hook, imgObj }) {
  // const {
  //   feature_headline_img,
  //   feature_category,
  //   feature_subcategory,
  //   feature_headline,
  //   feature_subtitle,
  //   feature_author,
  //   feature_author_pic,
  // } = slice.primary;

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
          backgroundImage: `url(${imgObj.url})`,
          opacity: bgOpacity,
        }}
      ></section>
      <section
        className="container headline-block"
        style={{
          marginTop: "-62.5vh",
        }}
      >
        <div className="columns">
          <div className="column">
            <div className="content">
              <h1 className="title is-size-1-widescreen is-size-2-desktop is-size-3-tablet is-size-4-mobile">
                {RichText.render(cta)}
              </h1>
              <h3 className="is-size-4-desktop is-size-6-touch has-text-centered">
                {RichText.render(hook)}
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container"
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
