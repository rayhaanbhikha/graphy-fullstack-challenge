import { markerDimensions } from "./components/Marker/StyledMarker";
import { apiBaseURL } from "./config";
import { AnnotationStates } from "./enums";
import { AnnotationType, Coord } from "./types";

export const DEFAULT_ID = '';
export class AnnotationService {

  constructor(private url: string) {}

  create(coord: Coord): AnnotationType {
    const { x, y } = coord;
    return {
      _id: DEFAULT_ID,
      coord: {
        x: x - Math.round((markerDimensions.width - 1) / 2), // centralise coords.
        y: y - Math.round((markerDimensions.width - 1) / 2)
      },
      text: '',
      state: AnnotationStates.EDITING
    }
  }

  serialise(annotation: AnnotationType): Omit<AnnotationType, 'state'> {
    const { _id, text, coord } = annotation;
    return {
      _id,
      text,
      coord
    }
  }

  deserialise(annotation: object, annotationState: AnnotationStates): AnnotationType {
    // TODO: validation needed.
    const { _id, coord, text } = annotation as AnnotationType;
    return {
      _id,
      coord,
      text,
      state: annotationState
    }
  }

  async getAll() {
    const res = await fetch(this.url)
    const data = await res.json();
    const annotations = data as AnnotationType[]
    return annotations.map(annotation => this.deserialise(annotation, AnnotationStates.CLOSED))
  }
  
  async save(annotation: AnnotationType) {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.serialise(annotation))
    });
    const data = await res.json();
    return this.deserialise(data, annotation.state);
  }

  async update(annotation: AnnotationType) {
    const res = await fetch(this.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.serialise(annotation))
    });
    const data = await res.json();
    return this.deserialise(data, annotation.state);
  }

  async remove(annotation: AnnotationType) {
    const resourceURL = `${this.url}/${annotation._id}`
    await fetch(resourceURL, { method: 'DELETE' });
  }
}

export const annotationService = new AnnotationService(apiBaseURL);