import { AnnotationStates } from "./components/Annotation/Annotation";
import { markerDimensions } from "./components/Marker/StyledMarker";
import { apiBaseURL } from "./config";
import { AnnotationType, AnnotationWithStateType, Coord } from "./types";

export const DEFAULT_ID = '';
export class AnnotationService {

  constructor(private url: string) {}

  create(coord: Coord): AnnotationWithStateType {
    const { x, y } = coord;
    return {
      id: DEFAULT_ID,
      coord: {
        x: x - Math.round((markerDimensions.width - 1) / 2), // centralise coords.
        y: y - Math.round((markerDimensions.width - 1) / 2)
      },
      text: '',
      state: AnnotationStates.EDITING
    }
  }

  serialise(annotation: AnnotationWithStateType): AnnotationType {
    const { id, text, coord } = annotation;
    return {
      id,
      text,
      coord
    }
  }

  deserialise(annotation: AnnotationType, annotationState: AnnotationStates): AnnotationWithStateType {
    return {
      ...annotation,
      state: annotationState
    }
  }

  async getAll() {
    const res = await fetch(this.url)
    const data = await res.json();
    const annotations = data as AnnotationType[]
    return annotations.map(annotation => this.deserialise(annotation, AnnotationStates.CLOSED))
  }
  
  async save(annotation: AnnotationWithStateType) {
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

  async update(annotation: AnnotationWithStateType) {
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

  async remove(annotation: AnnotationWithStateType) {
    const resourceURL = `${this.url}/${annotation.id}`
    await fetch(resourceURL, { method: 'DELETE' });
  }
}

export const annotationService = new AnnotationService(apiBaseURL);