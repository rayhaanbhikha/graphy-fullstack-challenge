import { useState } from 'react'; 
import { IAnnotationType } from '../Annotation/Annotation';

export const useAnnotations = (initialState: IAnnotationType[]) => {
  const [annotations, setAnnotations] = useState<IAnnotationType[]>(initialState)

  const init = async () => {
    // TODO: make api call.
    return [] as IAnnotationType[];
  }

  const update = async (newAnnotation: IAnnotationType) => {
    console.log("updating annotation: ", newAnnotation);
    // TODO: make api call.
    const updatedAnnotations = annotations.map(annotation => annotation.id === newAnnotation.id ? newAnnotation : annotation);
    setAnnotations(updatedAnnotations);
  }

  // TODO: omit id field. use from api endpoint.
  const create = async (annotation: IAnnotationType) => {
    // TODO: make api call.
    setAnnotations([...annotations, annotation]);
  }

  const remove = async (annotationToDelete: IAnnotationType) => {
    // TODO: make api call.
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
    setAnnotations(updatedAnnotations);
  }

  return { value: annotations, init, create, update, remove };
}