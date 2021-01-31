import React, { FunctionComponent, useEffect, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { AnnotationStates, ApplicationState } from '../../enums';

export interface IAnnotation {
  data: AnnotationType;
  setapplicationState: (state: ApplicationState) => void;
  save: (annotation: AnnotationType) => Promise<void>;
  remove: (annotation: AnnotationType) => Promise<void>;
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
    console.log("dragging", e);
    const { pageX: x, pageY: y } = e;
    const payload = {
      annotationData: data,
      mouseCoord: { x, y }
    }
    e.dataTransfer.setData("annotation", JSON.stringify(payload));
    setAnnnotationState(AnnotationStates.DRAGGING);
  }

  const onSaveHandler = async (annotatedText: string) => {
    setAnnnotationState(AnnotationStates.OPEN);
    setapplicationState(ApplicationState.DEFAULT_MODE);
    await save({ ...data, text: annotatedText });
  }

  const onEditHandler = () => {
    setAnnnotationState(AnnotationStates.EDITING);
  }

  const onDeleteHandler = async () => {
    setAnnnotationState(AnnotationStates.DELETING);
    setapplicationState(ApplicationState.DEFAULT_MODE);
    await remove(data);
  }

  return (
    <StyledMarker
      data-testid={`marker-${data._id}`}
      coord={data.coord}
      annotationState={annotationState}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable={annotationState !== AnnotationStates.EDITING}
      onDragStart={onDragStartHandler}
    >
      <AnnotationTooltip
        text={data.text}
        annotationstate={annotationState}
        onSaveHandler={onSaveHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </StyledMarker>
  )
}
