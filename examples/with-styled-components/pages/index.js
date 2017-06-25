import { Editor, ButtonBar, ButtonGroup, Field } from 'pulse-editor'
import { Bold, Italic, Underline } from 'pulse-editor/buttons'
import styled from 'styled-components'

const StyledEditor = styled(Editor)`
  display: flex;
  flex-wrap: wrap;
`

const StyledButtonBar = styled(ButtonBar)`
  background-color: #058ecd;
  border-radius: 3px 3px 0 0;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  padding: 0 0.3em 0.5em;
  width: 100%;
`

const StyledButtonGroup = styled(ButtonGroup)`
  border: 1px solid #7dc2e1;
  border-radius: 5px;
  display: flex;
  margin: 0.5em 0.5em 0;
  &:first-of-type { border-radius: 5px 0 0 5px; }
  &:last-of-type { border-radius: 0 5px 5px 0; }
  &:only-of-type { border-radius: 5px; }
`

const StyledField = styled(Field)`
  border: 1px solid #058ecd;
  box-sizing: border-box;
  font-family: Arial;
  font-size: 14px;
  line-height: 1.5;
  padding: 1em;
  width: 100%;
  box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.2);
  min-height: calc(100vh - 61px);
  resize: none;
  &:focus { outline: none; }
`

const buttonStyles = `
  background: none;
  border: none;
  border-right: 1px solid #7dc2e1;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  min-width: 25px;
  min-height: 25px;
  text-align: center;
  transition: all 0.2s;
  padding: 0;
`

const StyledBold = styled(Bold)`
  ${buttonStyles}
`

const StyledItalic = styled(Italic)`
  ${buttonStyles}
`

const StyledUnderline = styled(Underline)`
  ${buttonStyles}
`

export default () =>
  <StyledEditor>
    <StyledButtonBar>
      <StyledButtonGroup>
        <StyledBold><strong>B</strong></StyledBold>
        <StyledItalic><em>I</em></StyledItalic>
        <StyledUnderline><ins>U</ins></StyledUnderline>
      </StyledButtonGroup>
    </StyledButtonBar>
    <StyledField />
  </StyledEditor>
