import React, { FunctionComponent, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';
import { DEFAULT_ID } from '../../Annotations.service';

export interface IAnnotation {
  data: AnnotationType,
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data }) => {
  const isCreatedByUser = data.id === DEFAULT_ID

  const [inEditMode, setinEditMode] = useState(false);
  const [isHovering, setIsHovering] = useState(isCreatedByUser);

  const onMouseEnter = () => setIsHovering(true)
  const onMouseLeave = () => setIsHovering(false)

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      isOpen={isHovering}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledMarker
        inEditMode={inEditMode}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      />

      <AnnotationTooltip
        data={data}
        isHovering={isHovering}
        inEditMode={inEditMode}
        setinEditMode={setinEditMode}
      />
    </StyledAnnotationWrapper >
  )
}
