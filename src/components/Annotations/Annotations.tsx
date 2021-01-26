import React, { useEffect, FunctionComponent } from 'react'
import styled from 'styled-components';
import { v4 as uuid } from 'uuid'
import { Coord } from '../../App';
import { Annotation } from '../Annotation/Annotation';
import { useAnnotations } from './useAnnotations';

interface IAnnotations {
  coord: Coord;
}

const Wrapper = styled.div`
  position: inherit;
  height: inherit;
  width: inherit;
`

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const annotations = useAnnotations([]);

  useEffect(() => {
    console.log("I was rendered");
    annotations.init();
    // only want to render this on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    // TODO: check if any annotations around?
    // radius of 9.

    // center coordinate as x,y would represent top corner of box.
    // create an annotation component.
    let { x, y } = coord;

    x -= 9;
    y -= 9;

    // should call api endpoint.
    const annotation = {
      id: `${uuid()}:${x}:${y}`, // needed to ensure is annotation is unique alternatively could've used coords of each annotation.
      coord: {
        x,
        y
      },
      text: '',
    }
    annotations.create(annotation);
  }

  return (
    <Wrapper onClick={onClick}>
      {annotations.value.map((annotationData, index) =>
        <Annotation
          key={index}
          data={annotationData}
          updateHandler={annotations.update}
          removeHandler={annotations.remove}
        />)}
    </Wrapper>
  )
}
