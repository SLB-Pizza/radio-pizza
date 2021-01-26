/**
 * Used to cover in places where an image is needed but not present. Props received include things like className, onClick etc.
 * @function FallbackImage
 * @param {Object} props
 * @return {jsx}
 */
export default function FallbackImage(props) {
  return (
    <img src={`${__dirname}/halfmoon_white.png`} alt="Halfmoon BK" {...props} />
  )
}
