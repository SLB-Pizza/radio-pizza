import React from 'react'
import { HeroLeftArrow, HeroRightArrow } from '../components/helpers'

export default function HeroArrows({ onClick, direction }) {
  if (direction === 'left') {
    return <HeroLeftArrow onClick={onClick} />
  } else {
    return <HeroRightArrow onClick={onClick} />
  }
}
