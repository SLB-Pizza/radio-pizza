function linkStripper(url) {
  return url
    .replace(/[:/|\s<>{}]/g, '')
    .toLowerCase()
    .slice(0, 45)
}

export default linkStripper
