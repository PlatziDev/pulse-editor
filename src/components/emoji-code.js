import React from 'react'
import PropTypes from 'prop-types'

function EmojiCode({ code, className, ...props }) {
  return <code className={className} {...props}>:{code}:</code>
}

EmojiCode.propTypes = {
  code: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EmojiItem.defaultProps = {
  className: 'PulseEditor-emojiCode',
}

export default EmojiCode
