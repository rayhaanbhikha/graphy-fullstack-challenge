import React, { FunctionComponent, useState } from 'react'
import { Marker } from '../Marker/Marker';

import { Coord } from '../../App';
import styled from 'styled-components';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';

// FIXME: shared typed.
export interface IAnnotation {
  id: string;
  coord: Coord;
  text: string;
  open: boolean;
}

interface IAnnotationWrapper {
  coord: Coord;
}

const AnnotationWrapper = styled.div<IAnnotationWrapper>`
  position: absolute;
  top: ${props => props.coord.y}px;
  left: ${props => props.coord.x}px;
  display: flex;
`

export const Annotation: FunctionComponent<IAnnotation> = ({ coord, text, open }) => {
  const [isOpen, setisOpen] = useState(open);

  const onMouseEnter = () => {
    console.log("entering");
    setisOpen(true);
  }

  const onMouseLeave = () => {
    console.log("leaving");
    setisOpen(false);
  }

  return (
    <AnnotationWrapper coord={coord} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={(e: React.MouseEvent) => { e.stopPropagation() }}>
      <Marker />
      { isOpen &&
        <AnnotationTooltip
          text={text}
        />}
    </AnnotationWrapper>
  )
}
