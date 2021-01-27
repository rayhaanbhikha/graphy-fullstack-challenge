import styled from "styled-components";

export interface IStyledAnnotationTooltipWrapper {
  isOpen: boolean;
  inEditMode: boolean;
}

export const StyledAnnotationTooltipWrapper = styled.div<IStyledAnnotationTooltipWrapper>`
  background: rgb(216, 216, 216);
  margin-left: 5px;
  min-width: 300px;
  min-height: 100px;
  border-radius: 5px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px rgb(173,173,173);
  position: absolute;
  z-index: ${props => props.inEditMode ? 999 : 800}
`