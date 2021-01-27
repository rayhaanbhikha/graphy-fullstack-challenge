import { markerDimensions } from "./components/Marker/StyledMarker";
import { AnnotationType, Coord, PartialAnnotationType } from "./types";

export class AnnotationService {
  private baseURL = 'http://localhost:8080/annotations';

  generate(coord: Coord): AnnotationType {
    const { x, y} = coord;
    return {
      id: '',
      coord: {
        x: x - ((markerDimensions.width - 1) / 2), // centralise coords.
        y: y - ((markerDimensions.width - 1) / 2)
      },
      text: '',
    }
  }

  async getAll() {
    const res = await fetch(`${this.baseURL}/`)
    const data = await res.json();
    // TODO: validation
    // TODO: Error handling
    return data as AnnotationType[];
  }
  
  async save(annotation: PartialAnnotationType) {
    const res = await fetch(`${this.baseURL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annotation)
    });
    const data = await res.json();
    // TODO: Error handling
    return data as AnnotationType;
  }

  async remove(annotation: AnnotationType) {
    // TODO: Error handling
    console.log("DELETING", annotation);
    await fetch(`${this.baseURL}/${annotation.id}`, { method: 'DELETE' });
  }
}

export const annotationService = new AnnotationService();