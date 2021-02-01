import React from 'react';
import { render } from '@testing-library/react'
import App from '../App';
import 'jest-styled-components';

describe('App', () => {

  it('should have the default styles', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  })

});
