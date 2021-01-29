import React, { useEffect, FunctionComponent } from 'react'

import { Coord } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { AnnotationStateContextProvider } from '../hooks/AnnotationStateContext';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from '../hooks/useAnnotations';
import { annotationService } from '../../Annotations.service';
import { StyledErrorBar } from './StyledErrorBar';

interface IAnnotations {
  coord: Coord;
}

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const annotations = useAnnotations(annotationService, []);

  useEffect(() => {
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => annotations.generate(coord);

  return (
    <AnnotationStateContextProvider value={annotations}>
      { annotations.errorMessage && <StyledErrorBar>{annotations.errorMessage}</StyledErrorBar>}
      <StyledAnnotationsWrapper onClick={onClick}>
        {
          annotations.value.map((annotationData, index) => {
            const { x, y } = annotationData.coord;
            return <Annotation
              key={`${index}:${x}:${y}`}
              data={annotationData}
            />
          })
        }
      </StyledAnnotationsWrapper>
    </AnnotationStateContextProvider >
  )
}
