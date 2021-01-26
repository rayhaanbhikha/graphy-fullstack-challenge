export interface Coord {
  x: number;
  y: number;
}

export interface AnnotationType {
  id: string;
  coord: Coord;
  text: string;
}