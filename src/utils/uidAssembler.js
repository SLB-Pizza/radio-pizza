function uidAssembler(baseStr, dateStr) {
  // maximum allowed UID length is 45
  // dateString is always 12 characters long e.g. '--2020-12-25'
  // truncate baseString to 33 characters
  if (baseStr.length + '--' + dateStr.length > 45) {
    let truncatedBase = baseStr.slice(0, 33)
    return truncatedBase + '--' + dateStr
  }
  return baseStr + '--' + dateStr
}

export default uidAssembler
