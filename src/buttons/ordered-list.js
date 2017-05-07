import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

function updater (selected, full, selection) {
  if (selection.start === 0) {
    return `1. ${selected}`
  }
  return `\n1. ${selected}`
}

function handler (event) {
  if (event.selection.start === 0) {
    return {
      start: event.selection.start + 3 + event.selected.length,
      end: event.selection.end + 3
    }
  }
  return {
    start: event.selection.start + 4 + event.selected.length,
    end: event.selection.end + 4
  }
}

class ButtonOrderedList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    className: 'PulseEditor-button'
  };

  static contextTypes = {
    updateValue: PropTypes.func.isRequired
  };

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
        name='ordered-list'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonOrderedList
