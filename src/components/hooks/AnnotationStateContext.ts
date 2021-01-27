import { createContext } from "react";

export enum AnnotationStates {
  EDIT_MODE,
  DEFAULT_MODE
}

export const AnnotationStateContext = createContext({
  state: AnnotationStates.DEFAULT_MODE,
  toggleState: (newAnnotationState: AnnotationStates) => { }
})

export const AnnotationStateContextProvider = AnnotationStateContext.Provider;