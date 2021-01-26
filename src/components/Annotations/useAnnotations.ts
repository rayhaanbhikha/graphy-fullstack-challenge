import { useState } from 'react'; 
import { IAnnotationType } from '../Annotation/Annotation';

export enum ActionTypes {
  CREATE,
  UPDATE,
  DELETE,
  INIT
}

type DispatchAction = { type: ActionTypes, value: IAnnotationType }

export type DispatchFuncType = (action: DispatchAction) => Promise<void>

export type ReducerFuncType = (action: DispatchAction, currentAnnotations: IAnnotationType[]) => Promise<IAnnotationType[]>

export type UseAnnotationsReturnType = [IAnnotationType[], DispatchFuncType];

export const annotationsReducer = async (action: DispatchAction, currentAnnotations: IAnnotationType[]) => {
  const { type, value: newAnnotation } = action;
  switch (type) {
    case ActionTypes.INIT:
      // TODO: make api call.
      return [];
    case ActionTypes.CREATE:
      // TODO: make api call.
      return [...currentAnnotations, newAnnotation]
    case ActionTypes.UPDATE:
      // TODO: make api call.
      const updatedAnnotations = currentAnnotations.map(annotation => annotation.id === newAnnotation.id ? newAnnotation : annotation);
      return updatedAnnotations
    case ActionTypes.DELETE:
      // TODO: make api call.
      const filteredAnnotations = currentAnnotations.filter(annotation => annotation.id !== newAnnotation.id);
      return filteredAnnotations;
    default:
      return currentAnnotations;
  }
}

export const useAnnotations = (reducerFunc: ReducerFuncType, initialState: IAnnotationType[]): UseAnnotationsReturnType => {
  const [state, setState] = useState(initialState);

  const dispatch = async (action: DispatchAction) => {
    try {
      const updatedState = await reducerFunc(action, state);
      setState(updatedState);
    } catch (error) {
      // FIXME: handle properly.
      console.log(error);
    }
  }

  return [state, dispatch];
}