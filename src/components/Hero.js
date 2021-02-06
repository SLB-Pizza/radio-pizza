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
   * Custom bullet component for bullets to pass as props for <Slider>
   * @see {@link https://github.com/farbenmeer/react-spring-slider#fully-customized|react-spring-slider Fully Customized}
   */
  const HeroBullets = ({ onClick, isActive }) => (
    <li
      style={{
        backgroundColor: isActive ? 'white' : 'black',
        borderRadius: '25%',
        marginInlineStart: '.5rem',
        border: isActive ? '2px solid #f600ff' : '2px solid white',
        width: '32px',
        height: '32px',
        opacity: isActive ? '1' : '.5',
      }}
      onClick={onClick}
    ></li>
  )

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
        BulletComponent={HeroBullets}
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
