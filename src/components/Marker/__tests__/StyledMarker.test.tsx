import React from 'react';
import { render } from '@testing-library/react'
import 'jest-styled-components';

import { StyledMarker } from '../StyledMarker';
import { Coord } from '../../../types';
import { AnnotationStates } from '../../../enums';

describe('StyledMarker', () => {

  const coord: Coord = { x: 5, y: 10 }

  const renderComponent = (state: AnnotationStates) => render(<StyledMarker coord={coord} annotationState={state} />)

  it('should have the default styles', () => {
    const { asFragment } = renderComponent(AnnotationStates.EDITING);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should render with correct z-index in edit mode', () => {
    const { container } = renderComponent(AnnotationStates.EDITING);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '900');
  })

  it('should render with correct z-index in open mode', () => {
    const { container } = renderComponent(AnnotationStates.OPEN);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '800');
  })

  it('should render with correct z-index in other mode', () => {
    const { container } = renderComponent(AnnotationStates.CLOSED);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '700');
  })
})
