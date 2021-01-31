import styled from "styled-components";

import { AnnotationStates } from "../../enums";
import { markerDimensions } from "../Marker/StyledMarker";

export const PositionAnnotationTooltip = styled.div<{ annotationState: AnnotationStates; }>`
  position: absolute;
  left: ${markerDimensions.width}px;
  top: 0;
  padding-left: 5px;
  visibility: ${({ annotationState }) => annotationState === AnnotationStates.OPEN || annotationState === AnnotationStates.EDITING ? 'initial' : 'hidden'};
  opacity: ${({ annotationState }) => annotationState === AnnotationStates.OPEN || annotationState === AnnotationStates.EDITING ? 100 : 0};
  transition: visibility 0.5s, opacity 0.5s ease;
`