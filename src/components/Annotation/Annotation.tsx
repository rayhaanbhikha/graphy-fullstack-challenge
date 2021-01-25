import React, { FunctionComponent, useState } from 'react'
import { Marker } from '../Marker/Marker';

import { Coord } from '../../App';

import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationWrapper } from './AnnotationWrapper';
import { asyncFuncType } from '../Annotations/useAnnotations';

// FIXME: shared typed.
export interface IAnnotationType {
  id: string;
  coord: Coord;
  text: string;
}

export interface IAnnotation {
  id: string;
  coord: Coord;
  text: string;
  updateAnnotation: asyncFuncType
  deleteAnnotation: asyncFuncType
}

export const Annotation: FunctionComponent<IAnnotation> = ({ id, coord, text, updateAnnotation, deleteAnnotation }) => {
  const [isOpen, setisOpen] = useState(true);
  const [isEdit, setisEdit] = useState(false);

  const onMouseEnter = () => !isEdit && setisOpen(true);
  const onMouseLeave = () => !isEdit && setisOpen(false);

  const onEditHandler = () => setisEdit(true)

  const onSaveHandler = (newAnnotatedText: string) => {
    setisEdit(false);
    updateAnnotation({
      id,
      coord,
      text: newAnnotatedText
    })
  }

  const onDeleteHandler = () => {
    deleteAnnotation({
      id,
      coord,
      text
    })
  }

  return (
    <AnnotationWrapper
      coord={coord}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <Marker />
      { isOpen &&
        <AnnotationTooltip
          text={text}
          onSaveHandler={onSaveHandler}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
          isEditState={isEdit}
        />
      }
    </AnnotationWrapper>
  )
}
