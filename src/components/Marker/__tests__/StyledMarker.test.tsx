import React from 'react';
import { render } from '@testing-library/react'
import { AnnotationStates } from '../../Annotation/Annotation';
import { StyledMarker } from '../StyledMarker';
import { Coord } from '../../../types';
import 'jest-styled-components';

describe('StyledMarker', () => {

  const coord: Coord = { x: 5, y: 10 }

  const renderComponent = (state: AnnotationStates) => render(<StyledMarker coord={coord} annotationState={state} />)

  it('should have the default styles', async () => {
    const { asFragment } = await renderComponent(AnnotationStates.EDITING);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should render with correct z-index in edit mode', async () => {
    const { container } = await renderComponent(AnnotationStates.EDITING);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '900');
  })

  it('should render with correct z-index in open mode', async () => {
    const { container } = await renderComponent(AnnotationStates.OPEN);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '800');
  })

  it('should render with correct z-index in other mode', async () => {
    const { container } = await renderComponent(AnnotationStates.CLOSED);
    const element = container.querySelector('div')
    expect(element).toHaveStyleRule('z-index', '700');
  })
})
