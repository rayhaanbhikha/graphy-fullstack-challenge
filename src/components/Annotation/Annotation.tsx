import React, { FunctionComponent, useState } from 'react'

import { Marker } from '../Marker/Marker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
  updateAnnotation: (annotation: AnnotationType) => Promise<void>
  removeAnnotation: (annotation: AnnotationType) => Promise<void>
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, updateAnnotation, removeAnnotation }) => {
  const [ishoveringOverMarker, setishoveringOverMarker] = useState(false);

  const onMouseEnter = () => setishoveringOverMarker(true);
  const onMouseLeave = () => setishoveringOverMarker(false);

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      // TODO: could remove this.
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      isOpen={ishoveringOverMarker}
    >
      <Marker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <AnnotationTooltip
        data={data}
        updateAnnotation={updateAnnotation}
        removeAnnotation={removeAnnotation}
        ishoveringOverMarker={ishoveringOverMarker}
      />
    </StyledAnnotationWrapper >
  )
}
