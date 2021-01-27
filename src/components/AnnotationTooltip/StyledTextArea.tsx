import styled from 'styled-components';

export interface IStyledTextArea {
  readOnly: boolean;
  value: string;
}

export const StyledTextArea = styled.textarea.attrs<IStyledTextArea>(props => ({
  readonly: props.readOnly,
  value: props.value
}))`
  flex-grow: 3;
  min-width: inherit;
  border: none;
  background: ${props => props.readOnly ? 'inherit' : 'white'};
  margin: 5px;
  padding: 2px;
`