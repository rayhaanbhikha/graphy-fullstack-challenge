export interface Coord {
  x: number;
  y: number;
}

export interface IAnnotationType {
  id: string;
  coord: Coord;
  text: string;
}