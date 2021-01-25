import styled from 'styled-components';

import { Coord } from '../../App'

export interface MarkerProps {
  coord: Coord
}

export const Marker = styled.div<MarkerProps>`
  background: rgb(216, 216, 216);
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  width: 19px;
  height: 19px;
  border-radius: 3px;
  border: solid 1px rgb(173, 173, 173);
`