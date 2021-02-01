import React from 'react';
import { render } from '@testing-library/react'
import { StyledAnnotationTooltip } from '../StyledAnnotationTooltip';
import 'jest-styled-components';
import { AnnotationStates } from '../../../enums';

describe('StyledAnnotationTooltip', () => {

  it('should have correct default styles', () => {
    const { asFragment } = render(<StyledAnnotationTooltip annotationState={AnnotationStates.CLOSED} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in edit state', () => {
    const { asFragment } = render(<StyledAnnotationTooltip annotationState={AnnotationStates.EDITING} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in dragging state', () => {
    const { asFragment } = render(<StyledAnnotationTooltip annotationState={AnnotationStates.DRAGGING} />);
    expect(asFragment()).toMatchSnapshot();
  })
});