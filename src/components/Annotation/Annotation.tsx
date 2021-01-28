import React, { FunctionComponent, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data }) => {
  const isFetchedFromApi = data.id !== ''

  const [inEditMode, setinEditMode] = useState(false);
  const [isHoveringOverTooltip, setishoveringOverMarker] = useState(!isFetchedFromApi);

  const onMouseEnter = () => setishoveringOverMarker(true);
  const onMouseLeave = () => setishoveringOverMarker(false);

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      isOpen={isHoveringOverTooltip}
    >
      <StyledMarker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} inEditMode={inEditMode} />

      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ zIndex: inEditMode ? 999 : 800 }}>
        <AnnotationTooltip
          data={data}
          ishoveringOverTooltip={isHoveringOverTooltip}
          inEditMode={inEditMode}
          setinEditMode={setinEditMode}
        />
      </div>
    </StyledAnnotationWrapper >
  )
}
