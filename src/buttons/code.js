import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseButton from './base'

function updater (selected) {
  if (selected.length === 0) {
    return `\n\n\`\`\`\n<code>\n\`\`\`\n`
  }
  return `\`${selected}\``
}

function handler (event) {
  if (event.selected.length === 0) {
    return {
      start: 5 + event.selection.start + 1,
      end: 5 + event.selection.end + 7
    }
  }
  return {
    start: event.selection.start + 1,
    end: event.selection.end + 1
  }
}

class ButtonCode extends Component {
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
        name='code'
      >
        {this.props.children}
      </BaseButton>
    )
  }
}

export default ButtonCode
