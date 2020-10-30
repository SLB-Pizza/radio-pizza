function getMixTitle(mixNode) {
  // If mix_title exists, return mix_title
  // else, return mix_link as the mix title
  return mixNode.mix_title !== null ? mixNode.mix_title : mixNode.mix_link
}

export default getMixTitle
