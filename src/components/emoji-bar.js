import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'

import EmojiItem from './emoji-item'

// import the list of emojis supported on markdown-it-emoji plugin
import emojis from 'markdown-it-emoji/lib/data/full.json'

const emojiKeys = Objet.keys(emojis)

class EmojiBar extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: 'PulseEditor-emojiBar',
    children: null,
  }

  static contextTypes = {
    pickEmoji: PropTypes.func.isRequired,
    emoji: PropTypes.shape({
      writing: PropTypes.bool.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired,
  }

  handlePick = ({ currentTarget: { dataset: { code } } }) => {
    this.context.pickEmoji(code)
  }

  /**
   * Find emojis that match the code the user wrote
   * @param  {string}  code  The emoji code
   * @return {Boolean}       If it match or not
   */
  searchEmojis = code => code.indexOf(this.context.emoji.code.toLowerCase()) === 0

  getEmoji = code => ({ code, emoji: emojis[code] })

  renderItem = ({ emoji, code }) =>
    this.props.children
      ? cloneElement(this.props.children, { emoji, code, key: code, onPick: this.handlePick })
      : <EmojiItem key={code} emoji={emoji} code={code} onPick={this.handlePick} />

  render() {
    // if the user wrote only `:` or 1 char after `:` render null
    if (!this.context.emoji.writing || this.context.emoji.code.length < 2) return null

    return (
      <section className={this.props.className}>
        {emojiKeys.filter(this.searchEmojis).map(this.getEmoji).map(this.renderItem)}
      </section>
    )
  }
}

export default EmojiBar
