import styled from 'styled-components';

import { Coord } from '../../types';

interface IAnnotationWrapper {
  coord: Coord;
  isOpen: boolean;
}

export const AnnotationWrapper = styled.div<IAnnotationWrapper>`
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  display: flex;
  z-index: ${props => props.isOpen ? 999 : 900}
`