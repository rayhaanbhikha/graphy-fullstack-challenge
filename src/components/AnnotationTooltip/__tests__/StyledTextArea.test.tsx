import React from 'react';
import { render } from '@testing-library/react';
import { StyledTextArea } from '../StyledTextArea';
import 'jest-styled-components';

describe('StyledTextArea', () => {
  test('Correct styles and attributes are added in edit mode', () => {
    const { container } = render(<StyledTextArea inEditMode={true} />)
    const textArea = container.querySelector('textarea')
    expect(textArea).toHaveStyleRule('background', 'white');
    expect(textArea).toHaveStyleRule('cursor', 'text');
    expect(textArea).not.toHaveAttribute('readonly');
    expect(textArea).not.toHaveAttribute('disabled');
  })

  test('Correct styles and attributes are added in default mode', () => {
    const { container } = render(<StyledTextArea inEditMode={false} />)
    const textArea = container.querySelector('textarea')
    expect(textArea).toHaveStyleRule('background', 'inherit');
    expect(textArea).toHaveStyleRule('cursor', 'inherit');
    expect(textArea).not.toHaveAttribute('readonly', 'true');
    expect(textArea).toHaveAttribute('disabled');
  })
})