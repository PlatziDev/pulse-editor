/**
 * Set the content selection range in the given field input
 * @param {Boolean} [selection=false] The selections positions
 * @param {Element} field             The DOMNode field
 */
function setSelectionRange (selection = false, field) {
  if (!selection) return null

  if (typeof selection !== 'object') {
    throw new TypeError('The selection must be an object.')
  }

  if (typeof selection.start !== 'number') {
    throw new TypeError('The selection start value must be a number.')
  }

  if (typeof selection.end !== 'number') {
    throw new TypeError('The selection end value must be a number.')
  }

  if (typeof field !== 'object') {
    throw new TypeError('The field must be an object.')
  }

  if (field.setSelectionRange) {
    field.setSelectionRange(
      selection.start,
      selection.end
    )
    return null
  }

  if (!field.createTextRange) return null

  const range = field.createTextRange()

  range.collapse(true)
  range.moveStart('character', selection.end)
  range.moveEnd('character', selection.end)
  range.select()

  return null
}

export default setSelectionRange
