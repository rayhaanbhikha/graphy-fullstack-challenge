import { createContext } from "react";
import { AnnotationType, Coord } from "../../types";
import { AnnotationStates } from "./useAnnotations";

export const AnnotationStateContext = createContext({
  value: [] as AnnotationType[],
  errorMessage: '',
  setErrorMessage: (error: string) => {},
  setAnnotationState: (state: AnnotationStates) => {},
  generate: (coord: Coord) => {},
  init: () => {},
  save: (annotation: AnnotationType) => {},
  remove: (annotation: AnnotationType) => {}

})

export const AnnotationStateContextProvider = AnnotationStateContext.Provider;