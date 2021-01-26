import React, { FunctionComponent, useEffect, useState } from 'react'

import { Marker } from '../Marker/Marker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { StyledAnnotationWrapper } from './StyledAnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
  updateHandler: (annotation: AnnotationType) => Promise<void>
  removeHandler: (annotation: AnnotationType) => Promise<void>
  setdisableAnnotationCreation: (b: boolean) => void;
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, updateHandler, removeHandler, setdisableAnnotationCreation }) => {
  const { id, coord, text } = data;

  const [isOpen, setisOpen] = useState(true);
  const [inEditMode, setisEditMode] = useState(true);

  useEffect(() => {
    setdisableAnnotationCreation(true);
  }, [setdisableAnnotationCreation])

  const onMouseEnter = () => !inEditMode && setisOpen(true);
  const onMouseLeave = () => !inEditMode && setisOpen(false);

  const onEditHandler = () => {
    setisEditMode(true)
    setdisableAnnotationCreation(true);
  }

  const onSaveHandler = (newAnnotatedText: string) => {
    setisEditMode(false);
    setdisableAnnotationCreation(false);
    updateHandler({
      id,
      coord,
      text: newAnnotatedText
    })
  }

  const onDeleteHandler = () => {
    removeHandler(data);
    setdisableAnnotationCreation(false);
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
