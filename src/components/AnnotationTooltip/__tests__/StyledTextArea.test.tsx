import React from 'react';
import { render } from '@testing-library/react'
import { StyledTextArea } from '../StyledTextArea';
import 'jest-styled-components';

describe('StyledTextArea', () => {

  it('should have correct default styles', () => {
    const { asFragment } = render(<StyledTextArea inEditMode={false} />);
    expect(asFragment()).toMatchSnapshot();
  })

  it('should have correct styles when in edit state', () => {
    const { asFragment } = render(<StyledTextArea inEditMode={true} />);
    expect(asFragment()).toMatchSnapshot();
  })
});