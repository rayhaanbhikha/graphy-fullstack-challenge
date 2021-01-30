import React, { useEffect, FunctionComponent, useState } from 'react'

import { Coord } from '../../types';
import { Annotation, AnnotationState } from '../Annotation/Annotation';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from '../hooks/useAnnotations';
import { annotationService } from '../../Annotations.service';
import { StyledErrorBar } from './StyledErrorBar';

interface IAnnotations {
  coord: Coord;
}

export enum ApplicationState {
  EDIT_MODE,
  DEFAULT_MODE
}

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const [applicationState, setapplicationState] = useState(ApplicationState.DEFAULT_MODE)
  const annotations = useAnnotations(annotationService, []);

  useEffect(() => {
    annotations.init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => applicationState !== ApplicationState.EDIT_MODE && annotations.create(coord);

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.persist();

    const { annotationData, mouseCoord } = JSON.parse(e.dataTransfer.getData("annotation"));

    const oldCoords = annotationData.coord as Coord;
    const vector = {
      x: oldCoords.x - mouseCoord.x,
      y: oldCoords.y - mouseCoord.y
    }

    const newMouseCoord = {
      x: e.pageX,
      y: e.pageY
    }

    const newCoord = {
      x: newMouseCoord.x + vector.x,
      y: newMouseCoord.y + vector.y
    }

    annotationData.coord = newCoord;
    annotationData.state = AnnotationState.OPEN
    annotations.save(annotationData);
  }

  return (
    <>
      { annotations.errorMessage && <StyledErrorBar>{annotations.errorMessage}</StyledErrorBar>}
      <StyledAnnotationsWrapper onClick={onClick} onDrop={onDropHandler} onDragOver={(e) => e.preventDefault()}>
        {
          annotations.value.map((annotationData, index) => {
            const { x, y } = annotationData.coord;
            return <Annotation
              key={`${index}:${x}:${y}`}
              data={annotationData}
              setapplicationState={setapplicationState}
              save={annotations.save}
              remove={annotations.remove}
            />
          })
        }
      </StyledAnnotationsWrapper>
    </>
  )
}
