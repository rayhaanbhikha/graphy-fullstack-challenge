import React, { useEffect, FunctionComponent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Coord, AnnotationType } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { markerDimensions } from '../Marker/Marker';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from './useAnnotations';

export const createAnnotation = (coord: Coord): AnnotationType => ({
  id: uuid(), // FIXME: get from server. needed to ensure is annotation is unique alternatively could've used coords of each annotation.
  coord: {
    x: coord.x - ((markerDimensions.width - 1) / 2), // centralise coords.
    y: coord.y - ((markerDimensions.width - 1) / 2)
  },
  text: '',
})

interface IAnnotations {
  coord: Coord;
}

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const annotations = useAnnotations([]);
  const [disableAnnotationCreation, setdisableAnnotationCreation] = useState(false);

  useEffect(() => {
    console.log("I was rendered");
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => !disableAnnotationCreation && annotations.create(createAnnotation(coord));

  return (
    <StyledAnnotationsWrapper onClick={onClick}>
      {annotations.value.map((annotationData, index) =>
        <Annotation
          key={index}
          data={annotationData}
          updateAnnotation={annotations.update}
          removeAnnotation={annotations.remove}
          setdisableAnnotationCreation={setdisableAnnotationCreation}
        />)}
    </StyledAnnotationsWrapper>
  )
}
