/**
 * Get the element selection start and end values
 * @param  {Element}       field The DOM node element
 * @return {SelectionType}       The selection start and end
 */
function getSelection (field) {
  if (typeof field !== 'object') {
    throw new TypeError('The field must be an object.')
  }

  return {
    start: field.selectionStart,
    end: field.selectionEnd
  }
}

export default getSelection
