import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

import isMac from '../utils/is-mac'

function updater (selected, full, selection) {
  if (selection.start === 0) {
    return `- ${selected}`
  }
  return `\n- ${selected}`
}

function handler (event) {
  if (event.selection.start === 0) {
    return {
      start: event.selection.start + 2 + event.selected.length,
      end: event.selection.end + 2
    }
  }
  return {
    start: event.selection.start + 3 + event.selected.length,
    end: event.selection.end + 3
  }
}

class ButtonUnorderedList extends Component {
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
      keyName: 'l',
      updater,
      handler
    })
  }

  componenWillUnmount () {
    this.context.removeShortcut({ keyName: 'l' })
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
        name='unordered-list'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonUnorderedList
