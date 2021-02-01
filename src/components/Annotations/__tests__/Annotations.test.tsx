import React from 'react';
import { fireEvent, render } from '@testing-library/react'
import 'jest-styled-components';

import { AnnotationStates } from "../../../enums";
import { AnnotationType } from '../../../types';

describe('Annotations', () => {

  const mockInitAnnotations = jest.fn();
  const mockCreateAnnotation = jest.fn();
  const mockAnnotations: AnnotationType[] = [
    { _id: 'some-id-2', text: 'hello world 2', coord: { x: 2, y: 5 }, state: AnnotationStates.OPEN }
  ]

  jest.mock('../../../hooks/useAnnotations', () => ({
    useAnnotations: jest.fn().mockReturnValue({
      value: mockAnnotations,
      init: mockInitAnnotations,
      create: mockCreateAnnotation,
      errorMessage: 'some-error',
      save: jest.fn(),
      remove: jest.fn(),
    })
  }))

  beforeEach(jest.clearAllMocks)

  const currentMouseCoord = { x: 4, y: 7 }

  it("should compute new coords", async () => {
    const { computeNewCoords } = await import('../Annotations');
    const annotationCoord = { x: 200, y: 200 }
    const oldMouseCoord = { x: 250, y: 250 }
    const newMouseCoord = { x: 100, y: 100 }
    expect(computeNewCoords(annotationCoord, oldMouseCoord, newMouseCoord)).toEqual({ x: 50, y: 50 });
  })

  it("should render annotations", async () => {
    const { Annotations } = await import('../Annotations');
    const { getByTestId } = render(<Annotations coord={currentMouseCoord} />)

    const openMarker = getByTestId(`marker-${mockAnnotations[0]._id}`)

    expect(openMarker).toHaveStyleRule('top', `${mockAnnotations[0].coord.y}px`)
    expect(openMarker).toHaveStyleRule('left', `${mockAnnotations[0].coord.x}px`)

    expect(openMarker.firstChild).toHaveStyleRule('opacity', '100')
  })

  it("should display error message", async () => {
    const { Annotations } = await import('../Annotations');
    const { getByText } = render(<Annotations coord={currentMouseCoord} />)
    expect(getByText('some-error')).toBeTruthy();
  })

  it("should not be able to create annotations when application state is in edit mode", async () => {
    const { Annotations } = await import('../Annotations');
    const { getByText, getByTestId } = render(<Annotations coord={currentMouseCoord} />)
    fireEvent.click(getByText('pencil.svg'));
    fireEvent.click(getByTestId('annotations-wrapper'))
    expect(mockCreateAnnotation).not.toHaveBeenCalled();
  })

  it("should invoke create annotations when not in edit mode", async () => {
    const { Annotations } = await import('../Annotations');
    const { getByTestId } = render(<Annotations coord={currentMouseCoord} />)
    fireEvent.click(getByTestId('annotations-wrapper'))
    expect(mockCreateAnnotation).toHaveBeenCalledWith(currentMouseCoord);
  })

  it("should invoke annotations.init when component is loaded", async () => {
    const { Annotations } = await import('../Annotations');
    render(<Annotations coord={currentMouseCoord} />)
    expect(mockInitAnnotations).toHaveBeenCalled();
  })

  it.todo('should save annotation on drop event')
})
