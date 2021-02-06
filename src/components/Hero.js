import React from 'react'
import Slider from '@farbenmeer/react-spring-slider'
import SlideGenerator from '../utils/SlideGenerator'

/**
 * A complete single slide layout element. Genertated by {@link SlideGenerator}
 * @category Site Elements
 * @function HeroCarousel
 * @param {Object[]} slides - An array containing data objects from the HomePage query to process and display as slides
 * @returns {jsx}
 */
function HeroCarousel({ slides }) {
  /**
   * Amount of time in ms to stay on each slide before <Slider> auto moves to next slide; preset to 8000
   */
  const timePerSlide = 8000

  /**
   * Style object for bullets to pass as props for <Slider>
   */
  const heroBullets = {
    backgroundColor: '#000',
    border: '2px solid white',
    width: '2rem',
    height: '2rem',
  }

  /**
   * Style object for arrows to pass as props for <Slider>
   */
  const heroArrows = {
    border: 'solid white',
    margin: 'auto 3rem auto 2rem',
    borderWidth: '0 10px 10px 0',
    color: 'black',
  }

  return (
    <main className="slider-sizing">
      <Slider
        auto={timePerSlide}
        hasArrows
        arrowStyle={heroArrows}
        hasBullets
        bulletStyle={heroBullets}
      >
        {slides.map((slide, index) => {
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
    </main>
  )
}

export default HeroCarousel
