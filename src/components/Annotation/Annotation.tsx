import React, { FunctionComponent, useEffect, useState } from 'react'

import { Marker } from '../Marker/Marker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
  updateHandler: (annotation: AnnotationType) => Promise<void>
  removeHandler: (annotation: AnnotationType) => Promise<void>
  disable: (b: boolean) => void;
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, updateHandler, removeHandler, disable }) => {
  const { id, coord, text } = data;
  const [isOpen, setisOpen] = useState(true);
  const [inEditMode, setisEditMode] = useState(true);

  useEffect(() => {
    disable(true);
  }, [])

  const onMouseEnter = () => !inEditMode && setisOpen(true);
  const onMouseLeave = () => !inEditMode && setisOpen(false);

  const onEditHandler = () => {
    setisEditMode(true)
    disable(true);
  }

  const onSaveHandler = (newAnnotatedText: string) => {
    setisEditMode(false);
    updateHandler({
      id,
      coord,
      text: newAnnotatedText
    })
    disable(false);
  }

  const onDeleteHandler = () => {
    removeHandler(data);
    disable(false);
  }

  return (
    <StyledAnnotationWrapper
      coord={coord}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      isOpen={isOpen}
    >
      <Marker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <AnnotationTooltip
          text={text}
          onSaveHandler={onSaveHandler}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
          inEditMode={inEditMode}
          isOpen={isOpen}
        />
      </div>
    </StyledAnnotationWrapper >
  )
}
