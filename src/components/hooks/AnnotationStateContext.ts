import { createContext } from "react";

export enum AnnotationStates {
  EDIT_MODE,
  DEFAULT_MODE
}

export const AnnotationStateContext = createContext({
  value: AnnotationStates.DEFAULT_MODE,
  setAnnotationStateContext: (newAnnotationState: AnnotationStates) => { }
})

export const AnnotationStateContextProvider = AnnotationStateContext.Provider;