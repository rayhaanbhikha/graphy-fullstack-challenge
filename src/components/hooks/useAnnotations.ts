import { useState } from 'react'; 
import { AnnotationService, DEFAULT_ID } from '../../Annotations.service';

import { AnnotationType, Coord } from '../../types';

export enum AnnotationStates {
  EDIT_MODE,
  DEFAULT_MODE
}

export const useAnnotations = (annotationService: AnnotationService, initialState: AnnotationType[]) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)
  const [annotationState, setAnnotationState] = useState(AnnotationStates.DEFAULT_MODE);

  const init = async () => {
    try {
      const res = await annotationService.getAll();
      setAnnotations(res);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error retrieving annotations")
    }
  }

  const save = async (annotation: AnnotationType) => {
    try {
      let updatedAnnotations: AnnotationType[] = [];

      if (annotation.id === DEFAULT_ID) {
        const savedAnnotation = await annotationService.save(annotation)
        updatedAnnotations = annotations.map(annotation => annotation.id === DEFAULT_ID ? savedAnnotation : annotation);
      } else {
        const updatedAnnotation = await annotationService.update(annotation);
        updatedAnnotations = annotations.map(annotation => annotation.id === updatedAnnotation.id ? updatedAnnotation : annotation);
      }

      setAnnotations(updatedAnnotations);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error saving annotation")
    }
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    try {
      if (annotationToDelete.id !== DEFAULT_ID)
        await annotationService.remove(annotationToDelete)
      
      const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
      setAnnotations(updatedAnnotations);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage("Error deleting annotation")
    }
  }

  const generate = (coord: Coord) => {
    if (annotationState === AnnotationStates.EDIT_MODE) return;
    const annotation = annotationService.generate(coord)
    setAnnotations([...annotations, annotation]);
  };

  return {
    value: annotations,
    errorMessage,
    setErrorMessage,
    setAnnotationState,
    generate,
    init,
    save,
    remove
  };
}