import firebase from 'gatsby-plugin-firebase'

export default function updateRemoteMarquee(key, data) {
  return firebase
    .database()
    .ref('/liveStreamMarquee')
    .child(key)
    .update(data)
}
