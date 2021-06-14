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
      className="hero-bullets"
      style={{
        backgroundColor: isActive ? 'white' : 'black',
        border: isActive ? '2px solid black' : '2px solid white',
        opacity: isActive ? '1' : '.75',
      }}
      onClick={onClick}
    />
  )

  /**
   * Style object for arrows to pass as props for <Slider>
   */
  const HeroArrow = ({ onClick, direction }) => (
    <HeroArrows onClick={onClick} direction={direction} />
  )

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
