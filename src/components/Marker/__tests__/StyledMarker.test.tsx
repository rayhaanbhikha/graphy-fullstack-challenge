import React from 'react';
import { render } from '@testing-library/react'
import 'jest-styled-components';

import { StyledMarker } from '../StyledMarker';
import { Coord } from '../../../types';
import { AnnotationStates } from '../../../enums';

describe('StyledMarker', () => {

  const coord: Coord = { x: 5, y: 10 }

  it('should have correct default styles', () => {
    const { asFragment } = render(<StyledMarker annotationState={AnnotationStates.CLOSED} coord={coord} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in edit state', () => {
    const { asFragment } = render(<StyledMarker annotationState={AnnotationStates.EDITING} coord={coord} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in open state', () => {
    const { asFragment } = render(<StyledMarker annotationState={AnnotationStates.OPEN} coord={coord} />);
    expect(asFragment()).toMatchSnapshot();
  })
})
