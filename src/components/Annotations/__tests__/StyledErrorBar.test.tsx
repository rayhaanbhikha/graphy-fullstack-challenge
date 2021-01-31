import React from 'react';
import { render } from '@testing-library/react'
import { StyledErrorBar } from '../StyledErrorBar';
import 'jest-styled-components';

describe('StyledErrorBar', () => {

  it('should have the default styles', () => {
    const { asFragment } = render(<StyledErrorBar />);
    expect(asFragment()).toMatchSnapshot();
  })
});