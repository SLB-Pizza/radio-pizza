import firebase from 'gatsby-plugin-firebase'

export const updateRemoteMarquee = (key, data) => {
  return firebase
    .database()
    .ref('/liveStreamMarquee')
    .child(key)
    .update(data)
}

export const updateMarqueeTitle = (event, setTitleFunc) => {
  event.preventDefault()

  if ('string' !== typeof event.target.value) {
    alert('Please only input alphanumeric characters')
    return
  }

  return setTitleFunc(event.target.value)
}

export const updateMarqueeGuests = (event, setGuestsFunc) => {
  event.preventDefault()

  if ('string' !== typeof event.target.value) {
    alert('Please only input alphanumeric characters')
    return
  }

  return setGuestsFunc(event.target.value)
}

/**
 * Processes the submitted `liveTitle` and `liveGuests` on {@link AdminLiveStreamInfo} to pass to {@link updateRemoteMarquee}.
 * IF `liveTitle` and `liveGuests` are both empty strings
 *    pass `'Halfmoon Presents'` as `liveTitle`
 *    pass `'Live Radio'` as `liveGuests`
 *    to prevent a blank live radio display
 * @category Utilities
 * @function submitMarquee
 * @param {Event} event
 * @param {String} liveTitle
 * @param {String} liveGuests
 */
export const submitMarquee = async (event, liveTitle, liveGuests) => {
  event.preventDefault()

  console.debug(liveGuests, liveTitle)

  if (!liveTitle && !liveGuests) {
    await updateRemoteMarquee('marquee', {
      liveShowTitle: 'Halfmoon Presents',
      liveShowGuests: 'Live Radio',
    })
  } else {
    await updateRemoteMarquee('marquee', {
      liveShowTitle: liveTitle,
      liveShowGuests: liveGuests,
    })
  }
}

export const setDefaultMarquee = async event => {
  event.preventDefault()

  await updateRemoteMarquee('marquee', {
    liveShowTitle: 'HalfmoonBK Live Show',
    liveShowGuests: 'HMBK Family',
  })
}
