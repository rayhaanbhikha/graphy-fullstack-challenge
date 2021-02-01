import React from 'react';
import { render } from '@testing-library/react'
import { StyledIconWrapper } from '../StyledIconWrapper';
import 'jest-styled-components';

describe('StyledIconWrapper', () => {

  it('should have correct default styles', () => {
    const { asFragment } = render(<StyledIconWrapper />);
    expect(asFragment()).toMatchSnapshot();
  })
});