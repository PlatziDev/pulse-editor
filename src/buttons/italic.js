import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

import isMac from '../utils/is-mac'

function updater (selected) {
  return `_${selected}_`
}

function handler (event) {
  return {
    start: 1 + event.selection.start,
    end: event.selection.end + 1
  }
}

class ButtonItalic extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    className: 'PulseEditor-button'
  };

  static contextTypes = {
    updateValue: PropTypes.func.isRequired,
    setShortcut: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.context.setShortcut({
      ctrlKey: !isMac(),
      metaKey: isMac(),
      altKey: false,
      shiftKey: false,
      keyName: 'i',
      updater,
      handler
    })
  }

  componenWillUnmount () {
    this.context.removeShortcut({ keyName: 'i' })
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
        name='italic'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonItalic
