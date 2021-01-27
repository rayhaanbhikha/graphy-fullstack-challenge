import { useState } from 'react'; 

import { AnnotationType, PartialAnnotationType } from '../../types';
import { annotationService } from '../../Annotations.service';

export const useAnnotations = (initialState: AnnotationType[]) => {
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)

  const init = async () => {
    const res = await annotationService.getAll();
    setAnnotations(res);
  }

  const update = async (newAnnotation: AnnotationType) => {
    const updatedAnnotation = await annotationService.update(newAnnotation)
    const updatedAnnotations = annotations.map(annotation => annotation.id === updatedAnnotation.id ? updatedAnnotation : annotation);
    setAnnotations(updatedAnnotations);
  }

  // TODO: omit id field. use from api endpoint.
  const create = async (annotation: PartialAnnotationType) => {
    const createdAnnotation = await annotationService.create(annotation);
    setAnnotations([...annotations, createdAnnotation]);
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    await annotationService.remove(annotationToDelete)
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
    setAnnotations(updatedAnnotations);
  }

  return { value: annotations, init, create, update, remove };
}