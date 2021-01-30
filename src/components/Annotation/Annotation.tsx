import React, { FunctionComponent, useEffect, useReducer, useState } from 'react'

import { StyledMarker } from '../Marker/StyledMarker';
import { AnnotationWithStateType } from '../../types';
import { AnnotationTooltip } from '../AnnotationTooltip/AnnotationTooltip';
import { ApplicationState } from '../Annotations/Annotations';
import { AnnotationActions, annotationStateReducer } from './annotationReducer';
import { useAnnotations } from '../hooks/useAnnotations';

export interface IAnnotation {
  data: AnnotationWithStateType;
  setapplicationState: (state: ApplicationState) => void;
  save: (annotation: AnnotationWithStateType) => void;
  remove: (annotation: AnnotationWithStateType) => void;
}

export enum AnnotationStates {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  EDITING = "EDITING",
  DELETING = "DELETING",
  DRAGGING = "DRAGGING"
}

const useAnnotation = (initialState: AnnotationWithStateType): [AnnotationWithStateType, (action: AnnotationActions, data: AnnotationWithStateType) => void] => {
  const [state, setstate] = useState(initialState);

  const update = (action: AnnotationActions, data: AnnotationWithStateType) => {
    const state = data.state;
    let nextState: AnnotationStates = state;
    switch (action) {
      case AnnotationActions.SAVE:
        nextState = AnnotationStates.OPEN;
        break;
      case AnnotationActions.EDIT:
        nextState = AnnotationStates.EDITING;
        break;
      case AnnotationActions.OPEN:
        if (state !== AnnotationStates.EDITING) {
          nextState = AnnotationStates.OPEN;
        }
        break;
      case AnnotationActions.CLOSE:
        if (state !== AnnotationStates.EDITING) {
          nextState = AnnotationStates.CLOSED;
        }
        break;
      case AnnotationActions.DRAG:
        if (state !== AnnotationStates.EDITING) {
          nextState = AnnotationStates.DRAGGING;
        }
        break;
      case AnnotationActions.DELETE:
        nextState = AnnotationStates.DELETING;
        break;
    }
    setstate({ ...data, state: nextState });
  }
  return [state, update];
}

export const Annotation: FunctionComponent<IAnnotation> = ({ data, setapplicationState, save, remove }) => {
  const [annotation, setannotation] = useAnnotation(data);

  useEffect(() => {
    if (annotation.state === AnnotationStates.EDITING) {
      setapplicationState(ApplicationState.EDIT_MODE);
    }
  }, [annotation, setapplicationState])

  const onMouseEnter = () => setannotation(AnnotationActions.OPEN, annotation)
  const onMouseLeave = () => setannotation(AnnotationActions.CLOSE, annotation)

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
    setannotation(AnnotationActions.DRAG, annotation);
  }

  const isDraggable = () => annotation.state !== AnnotationStates.EDITING;

  const onSaveHandler = async (annotation: AnnotationWithStateType) => {
    save(annotation);
    setannotation(AnnotationActions.SAVE, annotation);
    setapplicationState(ApplicationState.DEFAULT_MODE);
  }

  const onEditHandler = () => {
    setannotation(AnnotationActions.EDIT, annotation);
    setapplicationState(ApplicationState.EDIT_MODE);
  }
  const onDeleteHandler = () => {
    remove(annotation);
    setannotation(AnnotationActions.DELETE, annotation);
    setapplicationState(ApplicationState.DEFAULT_MODE);
  }

  return (
    <StyledMarker
      coord={annotation.coord}
      annotationState={annotation.state}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      draggable={isDraggable()}
      onDragStart={onDragStartHandler}
    >
      <AnnotationTooltip
        data={annotation}
        onSaveHandler={onSaveHandler}
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </StyledMarker>
  )
}
