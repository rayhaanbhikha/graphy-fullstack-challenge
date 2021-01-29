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

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.persist();
    const payload = {
      annotationData: data,
      mouseCoord: {
        x: e.pageX,
        y: e.pageY
      }
    }
    e.dataTransfer.setData("annotation", JSON.stringify(payload));
  }

  return (
    <>
      <StyledMarker
        coord={data.coord}
        inEditMode={inEditMode}
        isHovering={isHovering}
        onClick={(e: React.MouseEvent) => (isHovering || inEditMode) && e.stopPropagation()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        draggable={Boolean(data.text)}
        onDragStart={onDragStartHandler}
      >
        <AnnotationTooltip
          data={data}
          inEditMode={inEditMode}
          isHovering={isHovering}
          setinEditMode={setinEditMode}
        />
      </StyledMarker>
    </>
  )
}
