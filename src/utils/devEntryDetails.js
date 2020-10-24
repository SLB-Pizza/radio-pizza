import { linkStripper } from './index'

function devEntryDetails(node) {
  const { _meta, ...rest } = node

  switch (_meta.type) {
    case 'mix':
      return {
        type: 'danger',
        reason: 'Dummy CMS Entry',
        result:
          'This entry was created as a development aide. Remember to delete immediately before launch.',
        entry:
          rest.mix_title !== null
            ? rest.mix_title
            : linkStripper(rest.mix_link),
        showCode: true,
      }
    default:
      return 0
  }
}

export default devEntryDetails
