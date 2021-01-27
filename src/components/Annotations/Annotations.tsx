import React, { useEffect, FunctionComponent, useState } from 'react'

import { Coord } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { AnnotationStateContextProvider, AnnotationStates } from '../hooks/AnnotationStateContext';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from '../hooks/useAnnotations';
import { annotationService } from '../../Annotations.service';
import { StyledErrorBar } from './StyledErrorBar';

interface IAnnotations {
  coord: Coord;
}

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  // TODO: error handling.
  const annotations = useAnnotations(annotationService, []);
  const [annotationStateContext, setAnnotationStateContext] = useState(AnnotationStates.DEFAULT_MODE);

  useEffect(() => {
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => annotationStateContext === AnnotationStates.DEFAULT_MODE && annotations.generate(coord);

  return (
    <AnnotationStateContextProvider value={{
      value: annotationStateContext,
      setAnnotationStateContext
    }}>
      { annotations.errorMessage !== '' && <StyledErrorBar>{annotations.errorMessage}</StyledErrorBar>}
      <StyledAnnotationsWrapper onClick={onClick}>
        {
          annotations.value.map((annotationData) => {
            const { id, coord: { x, y } } = annotationData;
            const key = `${id}:${x}:${y}`
            return <Annotation
              key={key}
              data={annotationData}
              saveAnnotation={annotations.save}
              removeAnnotation={annotations.remove}
            />
          })
        }
      </StyledAnnotationsWrapper>
    </AnnotationStateContextProvider >
  )
}
