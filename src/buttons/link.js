import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

import isMac from '../utils/is-mac'

function updater (selected) {
  return `[${selected}](url)`
}

function handler (event) {
  return {
    start: event.selection.start + event.selected.length + 3,
    end: event.selection.end + 6
  }
}

class ButtonLink extends Component {
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
      keyName: 'k',
      updater,
      handler
    })
  }

  componenWillUnmount () {
    this.context.removeShortcut({ keyName: 'k' })
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
        name='link'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonLink
