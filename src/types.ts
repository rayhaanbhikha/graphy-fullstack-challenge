import { AnnotationStates } from "./components/Annotation/Annotation";

export interface Coord {
  x: number;
  y: number;
}

export interface AnnotationType {
  _id: string;
  coord: Coord;
  text: string;
  state: AnnotationStates
}
