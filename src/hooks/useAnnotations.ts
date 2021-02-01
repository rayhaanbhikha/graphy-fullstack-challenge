import { useState } from 'react'; 
import { AnnotationService, DEFAULT_ID } from '../Annotations.service';

import { AnnotationType, Coord } from '../types';

// TODO: all method in hook should work locally without API. Using local storage as a write through cache.
export const useAnnotations = (annotationService: AnnotationService, initialState: AnnotationType[]) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [annotations, setAnnotations] = useState<AnnotationType[]>(initialState)

  const setDefaultErrorMessage = () => errorMessage !== '' && setErrorMessage('');

  const init = async () => {
    try {
      const res = await annotationService.getAll();
      setAnnotations(res);
      setDefaultErrorMessage();
    } catch (error) {
      console.error(error);
      setAnnotations([]);
      setErrorMessage("Error retrieving annotations")
    }
  }

  const save = async (annotation: AnnotationType) => {
    try {
      let updatedAnnotation: AnnotationType;
      if (annotation._id === DEFAULT_ID) {
        updatedAnnotation = await annotationService.save(annotation)
      } else {
        updatedAnnotation = await annotationService.update(annotation);
      }

      const updatedAnnotations = annotations.map(annotation => (annotation._id === updatedAnnotation._id) || (annotation._id === DEFAULT_ID) ? updatedAnnotation : annotation);

      setAnnotations(updatedAnnotations);
      setDefaultErrorMessage();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error saving annotation")
    }
  }

  const remove = async (annotationToDelete: AnnotationType) => {
    try {
      if (annotationToDelete._id !== DEFAULT_ID)
        await annotationService.remove(annotationToDelete)
      
      const updatedAnnotations = annotations.filter(annotation => annotation._id !== annotationToDelete._id);
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