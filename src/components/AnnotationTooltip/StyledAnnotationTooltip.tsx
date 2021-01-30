import styled from "styled-components";
import { AnnotationState } from "../Annotation/Annotation";

export interface IStyledAnnotationTooltip {
  annotationState: AnnotationState;
}

export const StyledAnnotationTooltip = styled.div<IStyledAnnotationTooltip>`
  background: rgb(216, 216, 216);
  min-width: 200px;
  min-height: 100px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: solid 1px rgb(173,173,173);
  padding: 3px;
  cursor: ${props => {
    if (props.annotationState === AnnotationState.EDITING) return 'initial';
    if (props.annotationState === AnnotationState.DRAGGING) return 'grabbing';
    return 'grab';
  }};
`