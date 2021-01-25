import { useState } from "react";
import { IAnnotationType } from "../Annotation/Annotation";

export type asyncFuncType = (annotation: IAnnotationType) => Promise<void>

export const useAnnotations = (initialState: IAnnotationType[]): [IAnnotationType[], asyncFuncType, asyncFuncType, asyncFuncType] => {
  const [annotations, setAnnotations] = useState<IAnnotationType[]>(initialState)

  const updateAnnotation = async (newAnnotation: IAnnotationType) => {
    console.log("updating annotation: ", newAnnotation);
    // TODO: make api call.
    const updatedAnnotations = annotations.map(annotation => annotation.id === newAnnotation.id ? newAnnotation : annotation);
    setAnnotations(updatedAnnotations);
  }

  const createAnnotation = async (annotation: IAnnotationType) => {
    // TODO: make api call.
    setAnnotations([...annotations, annotation]);
  }

  const deleteAnnotation = async (annotationToDelete: IAnnotationType) => {
    // TODO: make api call.
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== annotationToDelete.id);
    setAnnotations(updatedAnnotations);
  }

  return [annotations, createAnnotation, updateAnnotation, deleteAnnotation]
}