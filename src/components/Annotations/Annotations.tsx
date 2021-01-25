import React, { useState, useEffect, FunctionComponent } from 'react'
import styled from 'styled-components';
import { Coord } from '../../App';
import { IAnnotation, Annotation } from '../Annotation/Annotation';

interface IAnnotations {
  coord: Coord;
}

const Wrapper = styled.div`
  position: inherit;
  height: inherit;
  width: inherit;
`

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  // TODO: custom hook.
  const [annotations, setAnnotations] = useState<IAnnotation[]>([])

  useEffect(() => {
    console.log("I was rendered");
  }, []);

  const onClick = () => {
    console.log(coord);
    // TODO: check if any annotations around?
    // radius of 9.

    // center coordinate as x,y would represent top corner of box.
    // create an annotation component.
    const annotation = {
      id: 'random-id',
      coord: {
        x: coord.x - 9,
        y: coord.y - 9
      },
      text: 'some-blah-blah',
      open: true,
    }
    setAnnotations([...annotations, annotation])
  }

  return (
    <Wrapper onClick={onClick}>
      {annotations.map((annotationData, index) => <Annotation key={index} {...annotationData} />)}
    </Wrapper>
  )
}
