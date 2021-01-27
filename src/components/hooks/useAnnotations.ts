import { useState } from 'react'; 
import { AnnotationService } from '../../Annotations.service';

import { AnnotationType, Coord } from '../../types';

export const useAnnotations = (annotationService: AnnotationService, initialState: AnnotationType[]) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)

  const init = async () => {
    try {
      const res = await annotationService.getAll();
      setAnnotations(res);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error retrieving your annotation")
    }
  }

  const save = async (newAnnotation: AnnotationType) => {
    try {
      const savedAnnotation = await annotationService.save(newAnnotation)
      const updatedAnnotations = annotations.map(annotation => annotation.id === savedAnnotation.id ? savedAnnotation : annotation);
      setAnnotations(updatedAnnotations);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error saving your annotation")
    }
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    try {
      await annotationService.remove(annotationToDelete)
      const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
      setAnnotations(updatedAnnotations);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error deleting your annotation")
    }
  }

  const generate = (coord: Coord) => {
    const annotation = annotationService.generate(coord)
    setAnnotations([...annotations, annotation]);
  };

  return { value: annotations, errorMessage, generate, init, save, remove };
}