import React from 'react';
import { render } from '@testing-library/react'
import { PositionedAnnotationTooltip } from '../PositionedAnnotationTooltip';
import 'jest-styled-components';
import { AnnotationStates } from '../../../enums';

describe('PositionedAnnotationTooltip', () => {

  it('should have correct default styles', () => {
    const { asFragment } = render(<PositionedAnnotationTooltip annotationState={AnnotationStates.CLOSED} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in edit state', () => {
    const { asFragment } = render(<PositionedAnnotationTooltip annotationState={AnnotationStates.EDITING} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in open state', () => {
    const { asFragment } = render(<PositionedAnnotationTooltip annotationState={AnnotationStates.OPEN} />);
    expect(asFragment()).toMatchSnapshot();
  })
});