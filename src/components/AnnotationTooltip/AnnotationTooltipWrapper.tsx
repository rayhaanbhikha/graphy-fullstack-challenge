import styled from "styled-components";

export interface IAnnotationTooltipWrapper {
  isOpen: boolean;
}

export const AnnotationTooltipWrapper = styled.div<IAnnotationTooltipWrapper>`
  background: rgb(216, 216, 216);
  margin-left: 5px;
  min-width: 300px;
  min-height: 100px;
  border-radius: 5px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px rgb(173,173,173);
`