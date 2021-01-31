import React from 'react';
import { render } from '@testing-library/react'
import { StyledBtnWrapper } from '../StyledBtnWrapper';
import 'jest-styled-components';

describe('StyledBtnWrapper', () => {

  it('should have the default styles', () => {
    const { asFragment } = render(<StyledBtnWrapper />);
    expect(asFragment()).toMatchSnapshot();
  })
});