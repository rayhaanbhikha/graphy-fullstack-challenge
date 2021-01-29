import React, { FunctionComponent, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
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
    <StyledMarker
      coord={data.coord}
      inEditMode={inEditMode}
      isHovering={isHovering}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {(isHovering || inEditMode) &&
        <AnnotationTooltip
          data={data}
          inEditMode={inEditMode}
          setinEditMode={setinEditMode}
        />
      }
    </StyledMarker>
  )
}
