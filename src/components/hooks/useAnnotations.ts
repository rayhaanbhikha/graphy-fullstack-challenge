import { useState } from 'react'; 
import { AnnotationService, DEFAULT_ID } from '../../Annotations.service';

import { AnnotationWithStateType, Coord } from '../../types';

export const useAnnotations = (annotationService: AnnotationService, initialState: AnnotationWithStateType[]) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [annotations, setAnnotations] = useState<AnnotationWithStateType[]>(initialState)

  const setDefaultErrorMessage = () => errorMessage !== '' && setErrorMessage('');

  const init = async () => {
    try {
      const res = await annotationService.getAll();
      setAnnotations(res);
      setDefaultErrorMessage();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error retrieving annotations")
    }
  }

  const save = async (annotation: AnnotationWithStateType) => {
    try {
      let updatedAnnotations: AnnotationWithStateType[] = [];

      if (annotation.id === DEFAULT_ID) {
        const savedAnnotation = await annotationService.save(annotation)
        updatedAnnotations = annotations.map(annotation => annotation.id === DEFAULT_ID ? savedAnnotation : annotation);
      } else {
        const updatedAnnotation = await annotationService.update(annotation);
        updatedAnnotations = annotations.map(annotation => annotation.id === updatedAnnotation.id ? updatedAnnotation : annotation);
      }

      setAnnotations(updatedAnnotations);
      setDefaultErrorMessage();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error saving annotation")
    }
  }

  const remove = async (annotationToDelete: AnnotationWithStateType) => {
    try {
      if (annotationToDelete.id !== DEFAULT_ID)
        await annotationService.remove(annotationToDelete)
      
      const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
      setAnnotations(updatedAnnotations);
      setDefaultErrorMessage();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error deleting annotation")
    }
  }

  const create = (coord: Coord) => {
    const annotation = annotationService.create(coord)
    setAnnotations([...annotations, annotation]);
  };

  return {
    value: annotations,
    errorMessage,
    setErrorMessage,
    create,
    init,
    save,
    remove
  };
}