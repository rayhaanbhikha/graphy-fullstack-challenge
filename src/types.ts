import { AnnotationStates } from './enums';
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
