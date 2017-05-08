import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map as map, List as list } from 'immutable'
import createParser from '@platzi/markdown'

import getSelection from '../utils/get-selection'
import getSelected from '../utils/get-selected'
import updateContent from '../utils/update-content'
import setSelectionRange from '../utils/set-selection-range'
import createChangeEvent from '../utils/create-change-event'
import getKeyName from '../utils/get-key-name'

class PulseEditor extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    parser: PropTypes.object,
    editorRef: PropTypes.func
  };

  static defaultProps = {
    className: 'PulseEditor',
    defaultValue: '',
    name: 'pulse-editor',
    parser: {},
    editorRef: () => {}
  };

  static childContextTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    writeValue: PropTypes.func.isRequired,
    updateValue: PropTypes.func.isRequired,
    syncScroll: PropTypes.func.isRequired,
    setShortcut: PropTypes.func.isRequired,
    removeShortcut: PropTypes.func.isRequired,
    detectShortcut: PropTypes.func.isRequired,
    pickEmoji: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    emoji: PropTypes.shape({
      writing: PropTypes.bool.isRequired,
      code: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    value: this.props.defaultValue,
    expanded: false,
    uploading: false,
    view: 'field',
    emoji: {
      writing: false,
      code: ''
    }
  };

  parser = createParser(this.props.parser);

  /**
   * Map of editor shortcuts
   * @type {Immutable.Map}
   */
  shortcuts = map();

  constructor (props, context) {
    super(props, context)
    if (props.editorRef) {
      // pass editor instance ref to parent component
      props.editorRef(this)
    }
  }

  getChildContext () {
    return {
      name: this.props.name,
      value: this.state.value,
      writeValue: this.writeValue,
      updateValue: this.updateValue,
      syncScroll: this.syncScroll,
      setShortcut: this.setShortcut,
      removeShortcut: this.removeShortcut,
      detectShortcut: this.detectShortcut,
      pickEmoji: this.pickEmoji,
      expanded: this.state.expanded,
      disabled: false,
      emoji: this.state.emoji
    }
  }

  componentDidMount () {
    this.domField = document.getElementById(`pulse-editor-${this.props.name}`)
  }

  /**
   * Change the current value with a new one
   * @param  {string} value The new editor content
   */
  writeValue = event => {
    const value = event.target.value
    this.setState(state => {
      const newState = { value, emoji: state.emoji }

      if (value.lastIndexOf(':') === value.length - 1) {
        if (
          value.length - 2 < 0 ||
          value[value.length - 2] === ' '
        ) {
          newState.emoji.writing = true
        }
      }

      if (value.lastIndexOf(' ') === value.length - 1 || value.length === 0) {
        newState.emoji = {
          writing: false,
          code: ''
        }
      }

      if (state.emoji.writing) {
        const valueSplitted = value.split(':')
        newState.emoji.code = valueSplitted[valueSplitted.length - 1]
      }

      return newState
    }, () => {
      // call the handle change method
      this.handleChange(event)
    })
  };

  /**
   * Update current value applyng the updater function
   * @param  {Function} updater The update to apply to the editor content
   * @param  {Function} handler The function to call after the content was updated
   * @param  {Object}   event   The triggered event (click, keypress)
   */
  updateValue = ({ updater, handler, ...event }) => {
    // get the field selection
    const selection = getSelection(this.domField)

    // get the selected value
    const selected = getSelected(this.state.value, selection)

    // apply the feature updater to the selection
    const updated = updater(selected, this.state.value, selection)

    // get the updated full value
    const value = updateContent(this.state.value, selection, updated)

    // update the state
    this.setState({ value }, () => {
      // get the scroll top
      const scrollTop = this.domField.scrollTop

      // focus in the field
      this.domField.focus()

      // set the scroll position
      this.domField.scrollTop = scrollTop

      // get the new selection positions
      if (handler) {
        const newSelection = handler({
          ...event,
          value,
          field: this.domField,
          updated,
          selection,
          selected
        })

        // set the new selection in the field
        setSelectionRange(newSelection, this.domField)
      }

      // call the handle change method
      this.handleChange(event)
    })
  };

  /**
   * Syncronize scroll between the textarea and the preview
   */
  syncScroll = event => {
    if (this.state.expanded || this.state.mode === 'wide') {
      const { scrollTop } = event.target
      this.previewNode.scrollTop = scrollTop
    }
  };

  /**
   * Set a new shortcut to the shortcup map
   * @param {Object} shortcut Shortcut description and configuration
   */
  setShortcut = shortcut => {
    this.shortcuts = this.shortcuts.set(shortcut.keyName, shortcut)
  };

  /**
   * Remove a shortcut from the shortcup map
   * @param {Object} shortcut Shortcut description and configuration
   */
  removeShortcut = shortcut => {
    this.shortcuts = this.shortcuts.remove(shortcut.keyName)
  };

  /**
   * Check shortcuts when the user trigger a keydown event
   * @param {Object} event The keyDown event
   */
  detectShortcut = event => {
    const keyCode = event.keyCode || event.which
    const keyName = getKeyName(keyCode)

    if (keyName === 'tab') {
      event.preventDefault()
      const { start, end } = getSelection(this.domField)
      const currentValue = this.state.value
      const newValue = `${currentValue.substring(0, start)}\t${currentValue.substring(end)}`
      return this.setState({ value: newValue },
        () => {
          this.domField.selectionEnd = start + 1
          this.handleChange(event)
        }
      )
    }

    if (this.shortcuts.has(keyName)) {
      const {
        metaKey = false,
        ctrlKey = false,
        altKey = false,
        updater,
        handler
      } = this.shortcuts.get(keyName)

      // if the shortcut use meta key and is not pressed
      if (metaKey && !event.metaKey) return event
      // if the shortcut use ctrl and is not pressed or is pressed altgr
      if (ctrlKey && (!event.ctrlKey || (event.ctrlKey && event.altKey))) return event
      // if the shortcut use alt key and is not pressed
      if (altKey && !event.altKey) return event

      event.preventDefault()

      this.updateValue({ updater, handler, ...event })
    }
  };

  /**
   * Pick an emoji from the emojibar and apply it to the editor value
   * @param  {string} code The emoji code
   */
  pickEmoji = code => {
    this.setState(
      state => {
        // create new value with the picked emoji
        const value = list(state.value.split(':')).pop().push(code).toArray().join(':')
        // update state
        return {
          value: `${value}: `,
          emoji: {
            code: '',
            writing: false
          }
        }
      },
      () => {
        // get the scroll top
        const scrollTop = this.domField.scrollTop
        // focus in the field
        this.domField.focus()
        // set the scroll position
        this.domField.scrollTop = scrollTop
        // update value
        this.handleChange({ type: 'PICK_EMOJI', target: this.domField, emojiCode: code })
      }
    )
  };

  /**
   * Handle the change event in the form
   */
  handleChange (event) {
    if (!this.props.onChange) return null

    const selection = getSelection(this.domField)
    const selected = getSelected(this.state.value, selection)

    return this.props.onChange(
      createChangeEvent(
        selected,
        selection,
        this.state.value,
        event,
        this.parser(this.state.value, this.props.markdown)
      )
    )
  }

  render () {
    const { parser, name, defaultValue, children, className, editorRef, ...props } = this.props
    return (
      <div className={this.props.className} {...props}>
        {this.props.children}
      </div>
    )
  }
}

export default PulseEditor
