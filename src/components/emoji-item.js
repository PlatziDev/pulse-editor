import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import EmojiCode from './emoji-code'

function renderCode(code, children) {
  return children ? cloneElement(children, { code }) : <EmojiCode code={code} />
}

function EmojiItem({ code, emoji, onPick, className, children, ...props }) {
  return (
    <button
      {...props}
      type="button"
      data-code={code}
      className={this.props.className}
      onClick={onPick}
    >
      {emoji} {this.renderCode(code, children)}
    </button>
  )
}

EmojiItem.propTypes = {
  code: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  onPick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

EmojiItem.defaultProps = {
  className: 'PulseEditor-emojiItem',
  children: null,
}

export default EmojiItem
