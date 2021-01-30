import styled from "styled-components";
import { AnnotationState } from "../Annotation/Annotation";
import { markerDimensions } from "../Marker/StyledMarker";

export const PositionAnnotationTooltip = styled.div<{ annotationState: AnnotationState; }>`
  position: absolute;
  left: ${markerDimensions.width}px;
  top: 0;
  padding-left: 5px;
  visibility: ${({ annotationState }) => annotationState === AnnotationState.OPEN || annotationState === AnnotationState.EDITING ? 'initial' : 'hidden'};
  opacity: ${({ annotationState }) => annotationState === AnnotationState.OPEN || annotationState === AnnotationState.EDITING ? 100 : 0};
  transition: visibility 0.5s, opacity 0.5s ease;
`