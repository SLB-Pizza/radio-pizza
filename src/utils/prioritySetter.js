/**
 * Sets/Upgrades the priority level based of most urgent error message level as dictated by `validator-error-messages.json` and processed by {@link cmsNodeValidator}.
 * The final priority level for any notices object is use by {@link CMSIssueMessageType}
 * @function prioritySetter
 * @param {String} currentLevel
 * @param {String} incomingLevel
 * @returns {String}
 */
export default function prioritySetter(currentLevel, incomingLevel) {
  // If currentLevel has not been set yet, use incomingLevel
  if (!currentLevel) {
    return incomingLevel
  }
  // Upgrade 'info' priority only if incoming incomingLevel is 'warning' || 'danger'
  else if (
    currentLevel === 'info' &&
    (incomingLevel === 'warning' || incomingLevel === 'danger')
  ) {
    return incomingLevel
  }
  // Upgrade 'warning' priority only if incoming incomingLevel is 'danger'
  else if (currentLevel === 'warning' && incomingLevel === 'danger') {
    return incomingLevel
  }
  // If currentLevel is 'danger', return 'danger' -> max priority
  else if (currentLevel === 'danger') {
    return currentLevel
  }
}
