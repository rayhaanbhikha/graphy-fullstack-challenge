import React, { FunctionComponent, useEffect, useReducer } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { DEFAULT_ID } from '../../Annotations.service';
import { ApplicationState } from '../Annotations/Annotations';
import { AnnotationActions, annotationStateReducer } from './annotationReducer';

export interface IAnnotation {
  data: AnnotationType;
  setapplicationState: (state: ApplicationState) => void;
  save: (annotation: AnnotationType) => void;
  remove: (annotation: AnnotationType) => void;
}

export enum AnnotationState {
  OPEN,
  CLOSED,
  EDITING,
  DRAGGING
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, setapplicationState, save, remove }) => {
  const isCreatedByUser = data.id === DEFAULT_ID

  const initState = isCreatedByUser ? AnnotationState.EDITING : AnnotationState.CLOSED
  const [state, dispatch] = useReducer(annotationStateReducer, initState);

  useEffect(() => {
    if (state === AnnotationState.EDITING) {
      setapplicationState(ApplicationState.EDIT_MODE);
    } else {
      setapplicationState(ApplicationState.DEFAULT_MODE);
    }
  }, [state, setapplicationState])

  const onMouseEnter = () => dispatch(AnnotationActions.OPEN)
  const onMouseLeave = () => dispatch(AnnotationActions.CLOSE)

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
    dispatch(AnnotationActions.DRAG)
  }

  const isDraggable = () => state !== AnnotationState.EDITING && Boolean(data.text);

  const onDispatchHandler = (action: AnnotationActions, annotation: AnnotationType) => {
    dispatch(action);
    switch (action) {
      case AnnotationActions.DELETE:
        remove(annotation);
        break;
      case AnnotationActions.SAVE:
        save(annotation);
        break;
    }
  }

  return (
    <StyledMarker
      coord={data.coord}
      annotationState={state}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable={isDraggable()}
      onDragStart={onDragStartHandler}
      onDragEnd={() => dispatch(AnnotationActions.CLOSE)}
    >
      <AnnotationTooltip
        data={data}
        annotationState={state}
        dispatchHandler={onDispatchHandler}
      />
    </StyledMarker>
  )
}
