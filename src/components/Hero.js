import React from 'react'
import Slider from '@farbenmeer/react-spring-slider'
import SlideGenerator from '../utils/SlideGenerator'
import { HeroArrows } from '../utils'

/**
 * A complete single slide layout element. Genertated by {@link SlideGenerator}
 * @category Site Elements
 * @function HeroCarousel
 * @param {Object[]} slides - An array containing data objects from the HomePage query to process and display as slides
 * @returns {jsx}
 */
function HeroCarousel({ slides }) {
  /**
   * If slides array is null OR has no entries, do not render slider.
   */
  if (!slides || slides.length === 0) return null

  /**
   * Amount of time in ms to stay on each slide before <Slider> auto moves to next slide; preset to 8000
   */
  const timePerSlide = 8000

  /**
   * Custom bullet component for bullets to pass as props for <Slider>
   * @see {@link https://github.com/farbenmeer/react-spring-slider#fully-customized react-spring-slider Fully Customized}
   */
  const HeroBullets = ({ onClick, isActive }) => (
    <li
      style={{
        backgroundColor: isActive ? 'white' : 'black',
        borderRadius: '25%',
        marginInlineStart: '.5rem',
        border: isActive ? '2px solid black' : '2px solid white',
        width: '32px',
        height: '32px',
        opacity: isActive ? '1' : '.5',
      }}
      onClick={onClick}
    />
  )

  /**
   * Style object for arrows to pass as props for <Slider>
   */
  const HeroArrow = ({ onClick, direction }) => (
    <HeroArrows onClick={onClick} direction={direction} />

    // <div
    //   style={{
    //     width: "1.5rem",
    //     height: "1.5rem",
    //     borderTop: ".75rem solid #f600ff",
    //     borderRight: ".75rem solid #f600ff",
    //     marginLeft: "2rem",
    //     marginRight: "3rem",
    //     padding: "1em",
    //     transform: direction === "left" ? "rotate(-135deg)" : "rotate(45deg)",
    //   }}
    //   onClick={onClick}
    // />
  )

  // const heroArrows = {
  //   width: 0,
  //   height: 0,
  //   borderTop: "2rem solid transparent",
  //   borderLeft: "4rem solid blue",
  //   borderBottom: "2rem solid transparent",
  // };
  // const heroArrows = {
  //   outline: "1px solid red",
  //   border: "solid white",
  //   margin: "auto 3rem auto 2rem",
  //   borderWidth: "0 2rem 2rem 0",
  //   color: "black",
  // };

  return (
    <section className="slider-sizing">
      <Slider
        auto={timePerSlide}
        hasArrows
        hasBullets
        ArrowComponent={HeroArrow}
        BulletComponent={HeroBullets}
      >
        {slides?.map((slide, index) => {
          const { slide_link, slide_bg, slide_headline, slide_cta } = slide

          return (
            <SlideGenerator
              key={`hero-slide-#${index}`}
              background={slide_bg}
              headline={slide_headline}
              link={slide_link}
              cta={slide_cta}
            />
          )
        })}
      </Slider>
    </section>
  )
}

export default HeroCarousel
