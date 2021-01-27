import React, { useEffect, FunctionComponent, useState } from 'react'

import { Coord, PartialAnnotationType } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { AnnotationStateContextProvider, AnnotationStates } from '../hooks/AnnotationStateContext';
import { markerDimensions } from '../Marker/StyledMarker';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from '../hooks/useAnnotations';

// TODO: move me.
export const createAnnotation = (coord: Coord): PartialAnnotationType => ({
  // FIXME: get from server. needed to ensure is annotation is unique alternatively could've used coords of each annotation.
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
      value: annotationStateContext,
      setAnnotationStateContext
    }}>
      {/* TODO: Box should appear with warning or errors. */}
      <button onClick={() => annotations.init()}>get annota</button>
      <div>{coord.x}:{coord.y}</div>
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
