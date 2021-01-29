import styled from 'styled-components';

export interface IStyledTextArea {
  inEditMode: boolean;
}

export const StyledTextArea = styled.textarea.attrs<IStyledTextArea>(props => ({
  readonly: !props.inEditMode,
  disabled: !props.inEditMode,
})) <IStyledTextArea>`
  flex-grow: 3;
  min-width: inherit;
  border: none;
  background: ${props => props.inEditMode ? 'white' : 'inherit'};
  margin: 2px;
  color: black;
  cursor: ${props => props.inEditMode ? 'text' : 'inherit'}
`;