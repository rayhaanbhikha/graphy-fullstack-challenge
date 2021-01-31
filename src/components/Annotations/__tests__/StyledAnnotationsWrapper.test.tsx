import React from 'react';
import { render } from '@testing-library/react'
import { StyledAnnotationsWrapper } from '../StyledAnnotationsWrapper';
import 'jest-styled-components';

describe('StyledAnnotationsWrapper', () => {

  it('should have the default styles', () => {
    const { asFragment } = render(<StyledAnnotationsWrapper />);
    expect(asFragment()).toMatchSnapshot();
  })
});