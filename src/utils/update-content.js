/**
 * Update the selected content with the updated content in the given full content
 * @param  {string}        content   The full content string
 * @param  {SelectionType} selection The selections positions
 * @param  {string}        updated   The update slice of content
 * @return {string}                  The final updated content string
 */
function updateContent (content, selection, updated) {
  if (typeof content !== 'string') {
    throw new TypeError('The content value must be a string.')
  }

  if (typeof selection !== 'object') {
    throw new TypeError('The selection must be an object.')
  }

  if (typeof selection.start !== 'number') {
    throw new TypeError('The selection start value must be a number.')
  }

  if (typeof selection.end !== 'number') {
    throw new TypeError('The selection end value must be a number.')
  }

  if (typeof updated !== 'string') {
    throw new TypeError('The updated content value must be a string.')
  }

  return content.slice(0, selection.start) + updated + content.slice(selection.end)
}

export default updateContent
