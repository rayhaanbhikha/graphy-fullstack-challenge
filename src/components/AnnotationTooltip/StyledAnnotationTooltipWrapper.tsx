import styled from "styled-components";

interface IStyledAnnotationTooltipWrapper {
  inEditMode: boolean;
  isHovering: boolean;
}

export const StyledAnnotationTooltipWrapper = styled.div<IStyledAnnotationTooltipWrapper>`
  z-index: ${props => props.inEditMode ? 999 : 800};
  display: ${props => props.isHovering || props.inEditMode ? 'inherit' : 'none'};
`