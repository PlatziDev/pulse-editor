import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

function updater (selected) {
  if (selected.length > 0) {
    return `@[youtube](${selected})`
  }
  return '@[youtube](id|url)'
}

function handler (event) {
  if (event.selected.length > 0) {
    return {
      start: event.selection.start + 11,
      end: event.selection.end + 11
    }
  }

  return {
    start: event.selection.start + 11,
    end: event.selection.end + 17
  }
}

class ButtonYoutube extends Component {
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
        name='youtube'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonYoutube
