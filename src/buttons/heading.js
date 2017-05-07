import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

import isMac from '../utils/is-mac'

function updater (selected) {
  if (selected.charAt(0) !== '#') {
    return `## ${selected}`
  }
  if (selected.charAt(5) === '#') {
    return selected
  }
  return `#${selected}`
}

function handler (event) {
  if (event.selected.charAt(0) !== '#') {
    return {
      start: event.selection.start,
      end: event.selection.end + 3
    }
  }
  if (event.selected.charAt(5) === '#') {
    return event.selection
  }
  return {
    start: event.selection.start,
    end: event.selection.end + 1
  }
}

class ButtonHeading extends Component {
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
      keyName: 'h',
      updater,
      handler
    })
  }

  componenWillUnmount () {
    this.context.removeShortcut({ keyName: 'h' })
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
        name='heading'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonHeading
