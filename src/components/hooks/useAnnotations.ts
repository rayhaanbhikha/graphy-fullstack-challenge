import { useState } from 'react'; 
import { AnnotationService } from '../../Annotations.service';

import { AnnotationType, Coord } from '../../types';

export const useAnnotations = (annotationService: AnnotationService, initialState: AnnotationType[]) => {
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)

  const init = async () => {
    const res = await annotationService.getAll();
    setAnnotations(res);
  }

  const save = async (newAnnotation: AnnotationType) => {
    const savedAnnotation = await annotationService.save(newAnnotation)
    const updatedAnnotations = annotations.map(annotation => annotation.id === savedAnnotation.id ? savedAnnotation : annotation);
    setAnnotations(updatedAnnotations);
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    await annotationService.remove(annotationToDelete)
    console.log("before: ", annotations)
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
    console.log("after: ", updatedAnnotations)
    setAnnotations(updatedAnnotations);
  }

  const generate = (coord: Coord) => {
    const annotation = annotationService.generate(coord)
    setAnnotations([...annotations, annotation]);
  };

  return { value: annotations, generate, init, save, remove };
}