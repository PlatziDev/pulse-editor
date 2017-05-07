import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map as map } from 'immutable'

// import the list of emojis supported on markdown-it-emoji plugin
import emojis from 'markdown-it-emoji/lib/data/full.json'

const emojiMap = map(emojis)

class EmojiBar extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: 'PulseEditor-emojiBar'
  };

  static contextTypes = {
    pickEmoji: PropTypes.func.isRequired,
    emoji: PropTypes.shape({
      writing: PropTypes.bool.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  };

  handleClick = ({ currentTarget: { dataset: { code } } }) => {
    this.context.pickEmoji(code)
  };

  /**
   * Find emojis that match the code the user wrote
   * @param  {string}  emoji The emoji unicode character
   * @param  {string}  code  The emoji code
   * @return {Boolean}       If it match or not
   */
  searchEmojis = (emoji, code) => {
    return code.indexOf(this.context.emoji.code.toLowerCase()) === 0
  };

  render () {
    // if the user wrote only `:` or 1 char after `:` render null
    if (!this.context.emoji.writing || this.context.emoji.code.length < 2) return null

    return (
      <section className={this.props.className}>
        {emojiMap
          .filter(this.searchEmojis)
          .map((emoji, code) => (
            <button
              key={code}
              type='button'
              data-code={code}
              className={`${this.props.className}-emojiItem`}
              onClick={this.handleClick}
            >
              {emoji} <code className={`${this.props.className}-emojiCode`}>:{code}:</code>
            </button>
          ))
          .toArray()}
      </section>
    )
  }
}

export default EmojiBar
