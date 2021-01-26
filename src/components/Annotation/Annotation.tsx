import React, { FunctionComponent, useState } from 'react'

import { Marker } from '../Marker/Marker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationWrapper } from './AnnotationWrapper';

export interface IAnnotation {
  data: AnnotationType,
  updateHandler: (annotation: AnnotationType) => Promise<void>
  removeHandler: (annotation: AnnotationType) => Promise<void>
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, updateHandler, removeHandler }) => {
  const { id, coord, text } = data;
  const [isOpen, setisOpen] = useState(true);
  const [isEdit, setisEdit] = useState(true);

  const onMouseEnter = () => !isEdit && setisOpen(true);
  const onMouseLeave = () => !isEdit && setisOpen(false);

  const onEditHandler = () => setisEdit(true)

  const onSaveHandler = (newAnnotatedText: string) => {
    setisEdit(false);
    updateHandler({
      id,
      coord,
      text: newAnnotatedText
    })
  }

  const onDeleteHandler = () => removeHandler(data);

  return (
    <AnnotationWrapper
      coord={coord}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <Marker onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ display: isOpen ? 'block' : 'none', zIndex: 999 }}>
        <AnnotationTooltip
          text={text}
          onSaveHandler={onSaveHandler}
          onEditHandler={onEditHandler}
          onDeleteHandler={onDeleteHandler}
          isEditState={isEdit}
        />
      </div>
    </AnnotationWrapper>
  )
}
