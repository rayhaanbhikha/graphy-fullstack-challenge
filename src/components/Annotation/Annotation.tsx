import React, { FunctionComponent, useState } from 'react'
import { Marker } from '../Marker/Marker';

import { Coord } from '../../App';

import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationWrapper } from './AnnotationWrapper';

// FIXME: shared typed.
export interface IAnnotationType {
  id: string;
  coord: Coord;
  text: string;
}

export interface IAnnotation {
  data: IAnnotationType,
  updateHandler: (annotation: IAnnotationType) => Promise<void>
  removeHandler: (annotation: IAnnotationType) => Promise<void>
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, updateHandler, removeHandler }) => {
  const { id, coord, text } = data;
  const [isOpen, setisOpen] = useState(true);
  const [isEdit, setisEdit] = useState(false);

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
      { isOpen &&
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <AnnotationTooltip
            text={text}
            onSaveHandler={onSaveHandler}
            onEditHandler={onEditHandler}
            onDeleteHandler={onDeleteHandler}
            isEditState={isEdit}
          />
        </div>
      }
    </AnnotationWrapper>
  )
}
