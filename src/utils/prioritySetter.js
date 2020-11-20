/**
 * Sets/Upgrades the priority level based of most urgent error message level as dictated by `validator-error-messages.json` and processed by {@link cmsNodeValidator}.
 * The final priority level for any notices object is use by {@link CMSIssueMessageType}
 * @function prioritySetter
 * @param {String} currentLevel
 * @param {String} incomingLevel
 * @returns {String}
 */
export default function prioritySetter(currentLevel, incomingLevel) {
  // Base Case 1: If currentLevel has not been set yet
  if (!currentLevel) {
    return incomingLevel
  }
  // Base Case 2: Incoming incomingLevel and currentLevel are the same
  else if (currentLevel === incomingLevel) {
    return
  } // Upgrade 'info' priority only if incoming incomingLevel is 'warning' || 'danger'
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
}
