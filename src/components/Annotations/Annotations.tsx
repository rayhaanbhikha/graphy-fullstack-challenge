import React, { useEffect, FunctionComponent } from 'react'
import { v4 as uuid } from 'uuid'

import { Coord, AnnotationType } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { markerDimensions } from '../Marker/Marker';
import { AnnotationsWrapper } from './AnnotationsWrapper';
import { useAnnotations } from './useAnnotations';

export const createAnnotation = (coord: Coord): AnnotationType => {
  // centralise coords.
  let { x, y } = coord;
  return {
    id: `${uuid()}:${x}:${y}`, // needed to ensure is annotation is unique alternatively could've used coords of each annotation.
    coord: {
      x: coord.x - ((markerDimensions.width - 1) / 2),
      y: coord.y - ((markerDimensions.width - 1) / 2)
    },
    text: '',
  }
}

interface IAnnotations {
  coord: Coord;
}

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const annotations = useAnnotations([]);

  useEffect(() => {
    console.log("I was rendered");
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => annotations.create(createAnnotation(coord));

  return (
    <AnnotationsWrapper onClick={onClick}>
      {annotations.value.map((annotationData, index) =>
        <Annotation
          key={index}
          data={annotationData}
          updateHandler={annotations.update}
          removeHandler={annotations.remove}
        />)}
    </AnnotationsWrapper>
  )
}
