import React, { useEffect, FunctionComponent, useState } from 'react'

import { Coord } from '../../types';
import { Annotation } from '../Annotation/Annotation';
import { StyledAnnotationsWrapper } from './StyledAnnotationsWrapper';
import { useAnnotations } from '../../hooks/useAnnotations';
import { annotationService } from '../../services/Annotations.service';
import { StyledErrorBar } from './StyledErrorBar';
import { AnnotationStates, ApplicationState } from '../../enums';

interface IAnnotations {
  coord: Coord;
}

export const computeNewCoords = (annotationCoord: Coord, oldMouseCoord: Coord, newMouseCoord: Coord) => {
  const vector = {
    x: annotationCoord.x - oldMouseCoord.x,
    y: annotationCoord.y - oldMouseCoord.y
  }

  const newCoord = {
    x: newMouseCoord.x + vector.x,
    y: newMouseCoord.y + vector.y
  }

  return newCoord;
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
    console.log("dropping");
    const { annotationData, mouseCoord } = JSON.parse(e.dataTransfer.getData("annotation"));

    const { pageX: x, pageY: y } = e;

    annotationData.coord = computeNewCoords(annotationData.coord, mouseCoord, { x, y })
    annotationData.state = AnnotationStates.OPEN
    annotations.save(annotationData);
  }

  return (
    <>
      { annotations.errorMessage && <StyledErrorBar>{annotations.errorMessage}</StyledErrorBar>}
      <StyledAnnotationsWrapper onClick={onClick} onDrop={onDropHandler} onDragOver={(e) => e.preventDefault()} data-testid='annotations-wrapper'>
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
