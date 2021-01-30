import { AnnotationStates } from "./Annotation";

export enum AnnotationActions {
  SAVE,
  EDIT,
  DELETE,
  OPEN,
  CLOSE,
  DRAG,
}

export const annotationStateReducer = (state: AnnotationStates, action: AnnotationActions) => {
  console.log(action);
  switch (action) {
    case AnnotationActions.SAVE:
      return AnnotationStates.OPEN;
    case AnnotationActions.EDIT:
      return AnnotationStates.EDITING;
    case AnnotationActions.OPEN:
      if (state === AnnotationStates.EDITING) return state;
      return AnnotationStates.OPEN;
    case AnnotationActions.CLOSE:
      if (state === AnnotationStates.EDITING) return state;
      return AnnotationStates.CLOSED;
    case AnnotationActions.DRAG:
      if (state === AnnotationStates.EDITING) return state;
      return AnnotationStates.DRAGGING;
    case AnnotationActions.DELETE:
      return AnnotationStates.DELETING;
    default:
      return state;
  }
}