import styled from 'styled-components';
import { Coord } from '../../types';

export const markerDimensions = {
  width: 19,
  height: 19
}

// TODO: make interface
export const StyledMarker = styled.div<{ inEditMode: boolean, isHovering: boolean, coord: Coord }>`
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
    if (props.inEditMode) return 900;
    if (props.isHovering) return 800;
    return 700
  }}
`