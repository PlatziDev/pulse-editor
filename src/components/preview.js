import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from '@platzi/react-markdown'

class Preview extends Component {
  static propTypes = {
    className: PropTypes.string,
    parser: PropTypes.object
  };

  static defaultProps = {
    className: 'PulseEditor-preview',
    parser: {}
  };

  static contextTypes = {
    value: PropTypes.string.isRequired
  };

  render () {
    return (
      <Markdown
        className={this.props.className}
        content={this.context.value}
        parser={this.props.parser}
      />
    )
  }
}

export default Preview
