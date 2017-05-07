import React from 'react'
import PropTypes from 'prop-types'

function ButtonBar ({ children, className }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

ButtonBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

ButtonBar.defaultProps = {
  className: 'PulseEditor-buttonBar'
}

export default ButtonBar
