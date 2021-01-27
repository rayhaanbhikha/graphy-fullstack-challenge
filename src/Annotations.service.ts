import { AnnotationType, Coord, PartialAnnotationType } from "./types";

export class AnnotationService {
  private baseURL = 'http://localhost:8080/annotations';

  async getAll() {
    const res = await fetch(`${this.baseURL}/`)
    const data = await res.json();
    // TODO: validation
    // TODO: Error handling
    return data as AnnotationType[];
  }

  async update(annotation: AnnotationType) {
    const res = await fetch(`${this.baseURL}/${annotation.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(annotation)
    });
    const data = await res.json();
    // TODO: Error handling
    return data as AnnotationType;
  }
  
  async create(annotation: PartialAnnotationType) {
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
    const res = await fetch(`${this.baseURL}/${annotation.id}`, { method: 'DELETE' });
    const data = res.json();
  }
}

export const annotationService = new AnnotationService();