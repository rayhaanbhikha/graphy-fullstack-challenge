import React, { useEffect, FunctionComponent, useState } from 'react'
import { v4 as uuid } from 'uuid'

import { Coord, AnnotationType } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { AnnotationStateContextProvider, AnnotationStates } from '../hooks/AnnotationStateContext';
import { markerDimensions } from '../Marker/StyledMarker';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from './useAnnotations';

// TODO: move me.
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
  // TODO: error handling.
  const annotations = useAnnotations([]);
  const [annotationStateContext, setAnnotationStateContext] = useState(AnnotationStates.DEFAULT_MODE);

  useEffect(() => {
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => annotationStateContext === AnnotationStates.DEFAULT_MODE && annotations.create(createAnnotation(coord));

  return (
    <AnnotationStateContextProvider value={{
      state: annotationStateContext,
      toggleState: setAnnotationStateContext
    }}>
      {/* TODO: Box should appear with warning or errors. */}
      <StyledAnnotationsWrapper onClick={onClick}>
        {annotations.value.map((annotationData, index) =>
          <Annotation
            key={index}
            data={annotationData}
            updateAnnotation={annotations.update}
            removeAnnotation={annotations.remove}
          />)}
      </StyledAnnotationsWrapper>
    </AnnotationStateContextProvider >
  )
}
