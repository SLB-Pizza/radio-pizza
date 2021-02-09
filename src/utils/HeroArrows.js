import React from 'react'

function SvgComponent({ onClick, direction }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="4rem"
      height="4rem"
      viewBox="0 0 400 400"
      fill="black"
      stroke="white"
      strokeWidth="1.5rem"
      transform={direction === 'left' ? 'rotate(180)' : ''}
      onClick={onClick}
    >
      <path d="M222.979 133.331L95.073 5.424C91.456 1.807 87.178 0 82.226 0s-9.233 1.807-12.85 5.424c-3.617 3.617-5.424 7.898-5.424 12.847v255.813c0 4.948 1.807 9.232 5.424 12.847 3.621 3.617 7.902 5.428 12.85 5.428 4.949 0 9.23-1.811 12.847-5.428l127.906-127.907c3.614-3.613 5.428-7.897 5.428-12.847 0-4.948-1.813-9.229-5.428-12.846z" />
    </svg>
  )
}

export default SvgComponent
