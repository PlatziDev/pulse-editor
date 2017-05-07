import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

import isMac from '../utils/is-mac'

function updater (selected, full, selection) {
  if (full.length === selection.start) {
    return `\n> `
  }
  return `> ${selected}\n`
}

function handler (event) {
  if (event.selected.length === event.selection.start) {
    return {
      start: event.selection.start + 2,
      end: event.selection.end + 2
    }
  }
  return {
    start: 2 + event.selection.start,
    end: event.selection.end + 2
  }
}

class ButtonQuote extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    className: 'PulseEditor-button'
  };

  static contextTypes = {
    updateValue: PropTypes.func.isRequired,
    setShortcut: PropTypes.func.isRequired,
    removeShortcut: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: false,
      shiftKey: false,
      keyName: 'q',
      updater,
      handler
    })
  }

  componenWillUnmount () {
    this.context.removeShortcut({ keyName: 'q' })
  }

  handleClick = event => {
    event.preventDefault()
    this.context.updateValue({ ...event, updater, handler })
  };

  render () {
    return (
      <BaseButton
        className={this.props.className}
        onClick={this.handleClick}
        disabled={this.props.disabled}
        name='quote'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonQuote
