import React, { useEffect, FunctionComponent } from 'react'
import styled from 'styled-components';
import { v4 as uuid } from 'uuid'
import { Coord } from '../../App';
import { Annotation, IAnnotationType } from '../Annotation/Annotation';
import { useAnnotations, annotationsReducer, ActionTypes } from './useAnnotations';

interface IAnnotations {
  coord: Coord;
}

const Wrapper = styled.div`
  position: inherit;
  height: inherit;
  width: inherit;
`

export const Annotations: FunctionComponent<IAnnotations> = ({ coord }) => {
  const [annotations, dispatch] = useAnnotations(annotationsReducer, []);

  useEffect(() => {
    console.log("I was rendered");
    dispatch({ type: ActionTypes.INIT, value: (([] as unknown) as IAnnotationType) })
  }, []);

  const onClick = () => {
    console.log(coord);
    // TODO: check if any annotations around?
    // radius of 9.

    // center coordinate as x,y would represent top corner of box.
    // create an annotation component.
    let { x, y } = coord;

    x -= 9;
    y -= 9;

    const annotation = {
      id: `${uuid()}:${x}:${y}`, // needed to ensure is annotation is unique alternatively could've used coords of each annotation.
      coord: {
        x,
        y
      },
      text: 'some-blah-blah',
    }
    dispatch({ type: ActionTypes.CREATE, value: annotation })
  }

  return (
    <Wrapper onClick={onClick}>
      {annotations.map((annotationData, index) =>
        <Annotation
          key={index}
          data={annotationData}
          dispatch={dispatch}
        />)}
    </Wrapper>
  )
}
