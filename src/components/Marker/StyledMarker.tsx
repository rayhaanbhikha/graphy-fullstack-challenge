import styled from 'styled-components';
import { Coord } from '../../types';

import { AnnotationStates } from "../../enums";

export const markerDimensions = {
  width: 19,
  height: 19
}

export interface IStyledMarker {
  annotationState: AnnotationStates;
  coord: Coord;
}

export const StyledMarker = styled.div<IStyledMarker>`
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  background: rgb(216, 216, 216);
  width: ${markerDimensions.width}px;
  height: ${markerDimensions.height}px;
  border-radius: 3px;
  border: solid 1px rgb(173, 173, 173);
  cursor: pointer;
  z-index: ${props => {
    if (props.annotationState === AnnotationStates.EDITING) return 900;
    if (props.annotationState === AnnotationStates.OPEN) return 800;
    return 700
  }}
`