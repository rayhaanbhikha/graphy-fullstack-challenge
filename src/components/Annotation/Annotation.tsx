import React, { FunctionComponent, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
  saveAnnotation: (annotation: AnnotationType) => Promise<void>
  removeAnnotation: (annotation: AnnotationType) => Promise<void>
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, saveAnnotation, removeAnnotation }) => {
  const isFetchedFromApi = data.id !== ''
  const [ishoveringOverMarker, setishoveringOverMarker] = useState(!isFetchedFromApi);

  const onMouseEnter = () => setishoveringOverMarker(true);
  const onMouseLeave = () => setishoveringOverMarker(false);

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      isOpen={ishoveringOverMarker}
    >
      <StyledMarker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <AnnotationTooltip
        data={data}
        saveAnnotation={saveAnnotation}
        removeAnnotation={removeAnnotation}
        ishoveringOverMarker={ishoveringOverMarker}
      />
    </StyledAnnotationWrapper >
  )
}
