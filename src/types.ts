import { AnnotationStates } from "./components/Annotation/Annotation";

export interface Coord {
  x: number;
  y: number;
}

export interface AnnotationType {
  id: string;
  coord: Coord;
  text: string;
}

export type AnnotationWithStateType = AnnotationType & { state: AnnotationStates }