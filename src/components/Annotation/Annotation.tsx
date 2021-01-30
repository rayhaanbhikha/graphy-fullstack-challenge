import React, { FunctionComponent, useEffect, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { ApplicationState } from '../Annotations/Annotations';

export interface IAnnotation {
  data: AnnotationType;
  setapplicationState: (state: ApplicationState) => void;
  save: (annotation: AnnotationType) => void;
  remove: (annotation: AnnotationType) => void;
}

export enum AnnotationStates {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  EDITING = "EDITING",
  DELETING = "DELETING",
  DRAGGING = "DRAGGING"
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, setapplicationState, save, remove }) => {

  const [annotationState, setAnnnotationState] = useState(data.state);

  useEffect(() => {
    if (annotationState === AnnotationStates.EDITING) {
      setapplicationState(ApplicationState.EDIT_MODE);
    }
  }, [annotationState, setapplicationState])

  const onMouseEnter = () => annotationState !== AnnotationStates.EDITING && setAnnnotationState(AnnotationStates.OPEN)
  const onMouseLeave = () => annotationState !== AnnotationStates.EDITING && setAnnnotationState(AnnotationStates.CLOSED)

  const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.persist();
    const { pageX: x, pageY: y } = e;
    const payload = {
      annotationData: data,
      mouseCoord: { x, y }
    }
    e.dataTransfer.setData("annotation", JSON.stringify(payload));
    setAnnnotationState(AnnotationStates.DRAGGING);
  }

  const onSaveHandler = async (annotation: AnnotationType) => {
    save(annotation);
    setAnnnotationState(AnnotationStates.OPEN);
    setapplicationState(ApplicationState.DEFAULT_MODE);
  }

  const onEditHandler = () => {
    setAnnnotationState(AnnotationStates.EDITING);
    setapplicationState(ApplicationState.EDIT_MODE);
  }
  const onDeleteHandler = () => {
    remove(data);
    setAnnnotationState(AnnotationStates.DELETING);
    setapplicationState(ApplicationState.DEFAULT_MODE);
  }

  return (
    <StyledMarker
      coord={data.coord}
      annotationState={annotationState}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable={annotationState !== AnnotationStates.EDITING}
      onDragStart={onDragStartHandler}
    >
      <AnnotationTooltip
        data={data}
        annotationstate={annotationState}
        onSaveHandler={onSaveHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </StyledMarker>
  )
}
