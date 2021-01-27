import styled from 'styled-components';

import { Coord } from '../../types';

interface IStyledAnnotationWrapper {
  coord: Coord;
  isOpen: boolean;
}

export const StyledAnnotationWrapper = styled.div<IStyledAnnotationWrapper>`
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  display: flex;
`