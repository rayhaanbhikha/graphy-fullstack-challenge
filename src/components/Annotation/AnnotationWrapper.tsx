import styled from 'styled-components';

import { Coord } from '../../App';

interface IAnnotationWrapper {
  coord: Coord;
}

export const AnnotationWrapper = styled.div<IAnnotationWrapper>`
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  display: flex;
`