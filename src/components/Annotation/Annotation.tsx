import React, { FunctionComponent, useState } from 'react'
import { Marker } from '../Marker/Marker';

import { Coord } from '../../App';

import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationWrapper } from './AnnotationWrapper';
import { ActionTypes, DispatchFuncType } from '../Annotations/useAnnotations';

// FIXME: shared typed.
export interface IAnnotationType {
  id: string;
  coord: Coord;
  text: string;
}

export interface IAnnotation {
  data: IAnnotationType,
  dispatch: DispatchFuncType
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, dispatch }) => {
  const { id, coord, text } = data;
  const [isOpen, setisOpen] = useState(true);
  const [isEdit, setisEdit] = useState(false);

  const onMouseEnter = () => !isEdit && setisOpen(true);
  const onMouseLeave = () => !isEdit && setisOpen(false);

  const onEditHandler = () => setisEdit(true)

  const onSaveHandler = (newAnnotatedText: string) => {
    setisEdit(false);
    dispatch({
      type: ActionTypes.UPDATE,
      value: {
        id,
        coord,
        text: newAnnotatedText
      }
    });
  }

  const onDeleteHandler = () => dispatch({
    type: ActionTypes.DELETE,
    value: data,
  })

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
