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




export const Annotation: FunctionComponent<IAnnotation> = ({ coord, text, open }) => {
  const [isOpen, setisOpen] = useState(open);

  const annotationToolTipCoords: Coord = {
    x: coord.x + 19 + 10,
    y: coord.y
  };
  return (
    <div>
      <Marker coord={coord} />
      {/* { isOpen &&
        <AnnotationTooltip
          coord={annotationToolTipCoords}
          text={text}
        />} */}

    </div>
  )
}
