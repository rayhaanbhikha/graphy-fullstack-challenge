import { useState } from 'react'; 
import { AnnotationType } from '../../types';

export const useAnnotations = (initialState: AnnotationType[]) => {
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)

  const init = async () => {
    // TODO: make api call.
    return [] as AnnotationType[];
  }

  const update = async (newAnnotation: AnnotationType) => {
    console.log("updating annotation: ", newAnnotation);
    // TODO: make api call.
    const updatedAnnotations = annotations.map(annotation => annotation.id === newAnnotation.id ? newAnnotation : annotation);
    setAnnotations(updatedAnnotations);
  }

  // TODO: omit id field. use from api endpoint.
  const create = async (annotation: AnnotationType) => {
    // TODO: make api call.
    setAnnotations([...annotations, annotation]);
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    // TODO: make api call.
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
    setAnnotations(updatedAnnotations);
  }

  return { value: annotations, init, create, update, remove };
}