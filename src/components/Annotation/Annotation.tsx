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

  const [inEditMode, setinEditMode] = useState(isCreatedByUser);
  const [isHovering, setIsHovering] = useState(isCreatedByUser);

  const onMouseEnter = () => setIsHovering(true)
  const onMouseLeave = () => setIsHovering(false)

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      isOpen={isHovering}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      <StyledMarker
        inEditMode={inEditMode}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      <AnnotationTooltip
        data={data}
        isHovering={isHovering}
        inEditMode={inEditMode}
        setinEditMode={setinEditMode}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </StyledAnnotationWrapper >
  )
}
