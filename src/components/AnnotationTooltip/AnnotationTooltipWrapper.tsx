import styled from "styled-components";

interface IAnnotationTooltipWrapper {
  inEditMode: boolean;
  isHovering: boolean;
}

export const AnnotationTooltipWrapper = styled.div<IAnnotationTooltipWrapper>`
  z-index: ${props => props.inEditMode ? 999 : 800};
  display: ${props => props.isHovering || props.inEditMode ? 'inherit' : 'none'};
`