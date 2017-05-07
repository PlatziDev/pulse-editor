import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

function updater (selected) {
  return `![](${selected || 'url'})`
}

function handler (event) {
  if (event.selected.length === 0) {
    return {
      start: event.selection.start + 4,
      end: event.selection.end + 3 + 4
    }
  }
  return {
    start: event.selection.start + 4 + event.selected.length + 1,
    end: event.selection.end + 5
  }
}

class ButtonImage extends Component {
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
        name='image'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonImage
