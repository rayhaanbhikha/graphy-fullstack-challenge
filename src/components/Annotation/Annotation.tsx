import React, { FunctionComponent, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';
import { DEFAULT_ID } from '../../Annotations.service';
import styled from 'styled-components';

export interface IAnnotation {
  data: AnnotationType,
}

const AnnotationTooltipWrapper = styled.div<any>`
  z-index: ${props => props.inEditMode ? 999 : 800};
`

export const Annotation: FunctionComponent<IAnnotation> = ({ data }) => {
  const isCreatedByUser = data.id === DEFAULT_ID

  const [inEditMode, setinEditMode] = useState(false);
  const [isHovering, setIsHovering] = useState(isCreatedByUser);

  const onMouseEnter = () => setIsHovering(true);
  const onMouseLeave = () => setIsHovering(false);

  return (
    <StyledAnnotationWrapper
      coord={data.coord}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      isOpen={isHovering}
    >
      <StyledMarker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} inEditMode={inEditMode} />

      <AnnotationTooltipWrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        inEditMode={inEditMode}
      >
        <AnnotationTooltip
          data={data}
          isHovering={isHovering}
          inEditMode={inEditMode}
          setinEditMode={setinEditMode}
        />
      </AnnotationTooltipWrapper>
    </StyledAnnotationWrapper >
  )
}
