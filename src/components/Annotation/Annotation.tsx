import React, { FunctionComponent, useEffect, useReducer } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationWithStateType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { ApplicationState } from '../Annotations/Annotations';
import { AnnotationActions, annotationStateReducer } from './annotationReducer';

export interface IAnnotation {
  data: AnnotationWithStateType;
  setapplicationState: (state: ApplicationState) => void;
  save: (annotation: AnnotationWithStateType) => void;
  remove: (annotation: AnnotationWithStateType) => void;
}

export enum AnnotationStates {
  OPEN,
  CLOSED,
  EDITING,
  DELETING,
  DRAGGING
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, setapplicationState, save, remove }) => {
  const [state, dispatch] = useReducer(annotationStateReducer, data.state);

  useEffect(() => {
    console.log(state);
    if (state === AnnotationStates.EDITING) {
      setapplicationState(ApplicationState.EDIT_MODE);
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

  const isDraggable = () => state !== AnnotationStates.EDITING;

  const onDispatchHandler = (action: AnnotationActions, annotation: AnnotationWithStateType) => {
    dispatch(action);
    switch (action) {
      case AnnotationActions.DELETE:
        remove(annotation);
        setapplicationState(ApplicationState.DEFAULT_MODE);
        break;
      case AnnotationActions.SAVE:
        save(annotation);
        setapplicationState(ApplicationState.DEFAULT_MODE);
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
    >
      <AnnotationTooltip
        data={data}
        annotationState={state}
        dispatchHandler={onDispatchHandler}
      />
    </StyledMarker>
  )
}
