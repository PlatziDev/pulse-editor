/**
 * Create a ChangeEvent object
 * @param  {string}          selected  The selected text
 * @param  {SelectionType}   selection The selection position
 * @param  {string}          markdown  The current value
 * @param  {Object}          native    The native triggered DOM event
 * @param  {string}          html      The parsed value as HTML
 * @return {ChangeEventType}           The ChangeEvent object
 */
function createChangeEvent (selected, selection, markdown, native, html) {
  if (typeof selected !== 'string') {
    throw new TypeError('The selected content value must be a string.')
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

  if (typeof markdown !== 'string') {
    throw new TypeError('The markdown content value must be a string.')
  }

  if (typeof native !== 'object') {
    throw new TypeError('The native event must be an object.')
  }

  if (typeof html !== 'string') {
    throw new TypeError('The html content value must be a string.')
  }

  return {
    selected,
    selection,
    markdown,
    native,
    html
  }
}

export default createChangeEvent
