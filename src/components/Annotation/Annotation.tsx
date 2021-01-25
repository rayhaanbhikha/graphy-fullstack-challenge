import React, { FunctionComponent, useState } from 'react'
import { Marker } from '../Marker/Marker';

import { Coord } from '../../App';

import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationWrapper } from './AnnotationWrapper';

// FIXME: shared typed.
export interface IAnnotation {
  id: string;
  coord: Coord;
  text: string;
  open: boolean;
}

export const Annotation: FunctionComponent<IAnnotation> = ({ coord, text, open }) => {
  const [isOpen, setisOpen] = useState(open);

  const onMouseEnter = () => setisOpen(true);

  const onMouseLeave = () => setisOpen(false);

  return (
    <AnnotationWrapper
      coord={coord}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <Marker />
      { isOpen &&
        <AnnotationTooltip
          text={text}
        />
      }
    </AnnotationWrapper>
  )
}
