import { AnnotationState } from "./Annotation";

export enum AnnotationActions {
  SAVE,
  EDIT,
  DELETE,
  OPEN,
  CLOSE,
  DRAG,
}

export const annotationStateReducer = (state: AnnotationState, action: AnnotationActions) => {
  switch (action) {
    case AnnotationActions.SAVE:
      return AnnotationState.OPEN;
    case AnnotationActions.EDIT:
      return AnnotationState.EDITING;
    case AnnotationActions.OPEN:
      if (state === AnnotationState.EDITING) return state;
      return AnnotationState.OPEN;
    case AnnotationActions.CLOSE:
      if (state === AnnotationState.EDITING) return state;
      return AnnotationState.CLOSED;
    case AnnotationActions.DRAG:
      if (state === AnnotationState.EDITING) return state;
      return AnnotationState.DRAGGING;
    case AnnotationActions.DELETE:
    default:
      return state;
  }
}