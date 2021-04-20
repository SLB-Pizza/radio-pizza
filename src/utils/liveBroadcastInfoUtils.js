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

export const submitMarquee = async (event, liveTitle, liveGuests) => {
  event.preventDefault()

  await updateRemoteMarquee('marquee', {
    liveShowTitle: liveTitle,
    liveShowGuests: liveGuests,
  })
}

export const setDefaultMarquee = async event => {
  event.preventDefault()

  await updateRemoteMarquee('marquee', {
    liveShowTitle: 'HalfmoonBK Live Show',
    liveShowGuests: 'HMBK Family',
  })
}
