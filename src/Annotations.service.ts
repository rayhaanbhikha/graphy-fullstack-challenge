import { markerDimensions } from "./components/Marker/StyledMarker";
import { apiBaseURL } from "./config";
import { AnnotationType, Coord } from "./types";

export const DEFAULT_ID = '';
export class AnnotationService {

  constructor(private url: string) {}

  generate(coord: Coord): AnnotationType {
    const { x, y} = coord;
    return {
      id: DEFAULT_ID,
      coord: {
        x: x - Math.round((markerDimensions.width - 1) / 2), // centralise coords.
        y: y - Math.round((markerDimensions.width - 1) / 2)
      },
      text: '',
    }
  }

  async getAll() {
    const res = await fetch(this.url)
    const data = await res.json();
    return data as AnnotationType[];
  }
  
  async save(annotation: AnnotationType) {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annotation)
    });
    const data = await res.json();
    return data as AnnotationType;
  }

  async update(annotation: AnnotationType) {
    const res = await fetch(this.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annotation)
    });
    const data = await res.json();
    return data as AnnotationType;
  }

  async remove(annotation: AnnotationType) {
    await fetch(`${this.url}/${annotation.id}`, { method: 'DELETE' });
  }
}

export const annotationService = new AnnotationService(apiBaseURL);