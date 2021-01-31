import React from 'react';
import { render } from '@testing-library/react'
import fireEvent from '@testing-library/user-event'
import { Annotation, AnnotationStates } from '../Annotation';
import { AnnotationType } from '../../../types';
import 'jest-styled-components';
import { ApplicationState } from '../../Annotations/Annotations';

describe('Annotation', () => {
  jest.useFakeTimers();
  const onSaveHandler = jest.fn();
  const onRemoveHandler = jest.fn();
  const setapplicationStateHandler = jest.fn();

  const data: AnnotationType = {
    _id: 'some-id',
    text: 'some-text',
    coord: {
      x: 3,
      y: 4
    },
    state: AnnotationStates.CLOSED
  }

  const renderComponent = (data: AnnotationType) => render(<Annotation
    data={data}
    save={onSaveHandler}
    remove={onRemoveHandler}
    setapplicationState={setapplicationStateHandler}
  />)

  it('onmouseenter should open tooltip', () => {
    const { getByTestId } = renderComponent(data);
    const tooltip = getByTestId('annotation-tooltip')
    expect(tooltip).toHaveStyleRule('visibility', 'hidden');
    expect(tooltip).toHaveStyleRule('opacity', '0');

    fireEvent.hover(getByTestId('marker'));

    expect(tooltip).toHaveStyleRule('visibility', 'initial');
    expect(tooltip).toHaveStyleRule('opacity', '100');
  })

  it('onmouseleave should close tooltip', () => {
    const { getByTestId } = renderComponent({ ...data, state: AnnotationStates.OPEN });
    const tooltip = getByTestId('annotation-tooltip')

    expect(tooltip).toHaveStyleRule('visibility', 'initial');
    expect(tooltip).toHaveStyleRule('opacity', '100');

    fireEvent.unhover(getByTestId('marker'));

    expect(tooltip).toHaveStyleRule('visibility', 'hidden');
    expect(tooltip).toHaveStyleRule('opacity', '0');
  })


  it('onmouseleave should not close tooltip in editing state', () => {
    const { getByTestId } = renderComponent({ ...data, state: AnnotationStates.EDITING });
    const tooltip = getByTestId('annotation-tooltip')

    expect(tooltip).toHaveStyleRule('visibility', 'initial');
    expect(tooltip).toHaveStyleRule('opacity', '100');

    fireEvent.unhover(getByTestId('marker'));

    expect(tooltip).toHaveStyleRule('visibility', 'initial');
    expect(tooltip).toHaveStyleRule('opacity', '100');
  })

  // TODO: dragging.
  it('should not have draggable attribute when in edit mode', () => {
    const { getByTestId } = renderComponent({ ...data, state: AnnotationStates.EDITING });
    expect(getByTestId('marker')).toHaveAttribute('draggable', 'false');
  })

  it('should have draggable attribute when not in edit mode', () => {
    const { getByTestId } = renderComponent(data);
    expect(getByTestId('marker')).toHaveAttribute('draggable', 'true');
  })

  it('should set application state to edit mode when annotation state changes to editing', () => {
    const { getByText } = renderComponent(data);
    const editBtn = getByText('pencil.svg');
    fireEvent.click(editBtn)
    expect(setapplicationStateHandler).toHaveBeenCalledWith(ApplicationState.EDIT_MODE);
  })

  it('should focus on text area when annotation state changes to editing', () => {
    const { getByText, container } = renderComponent(data);
    const editBtn = getByText('pencil.svg');
    const textArea = container.querySelector('textarea');
    expect(textArea).not.toHaveFocus();
    fireEvent.click(editBtn)
    expect(textArea).toHaveFocus();
  })

  it('should invoke applicationState and onSave handlers with correct values when saving', () => {
    const annotationData = { ...data, state: AnnotationStates.EDITING }
    const { getByText, container } = renderComponent(annotationData);
    const saveBtn = getByText('save.svg');
    const textArea = container.querySelector('textarea') as HTMLTextAreaElement;
    const typedString = " hello world"
    fireEvent.type(textArea, typedString)
    fireEvent.click(saveBtn)

    expect(setapplicationStateHandler).toHaveBeenCalledWith(ApplicationState.DEFAULT_MODE);
    expect(onSaveHandler).toHaveBeenCalledWith({ ...annotationData, text: `${data.text}${typedString}` });
    expect(textArea).not.toHaveFocus();
  })


  it('should invoke correct handlers when deleting', () => {
    const annotationData = { ...data, state: AnnotationStates.EDITING }
    const { getByText } = renderComponent(annotationData);
    const deleteBtn = getByText('bin.svg');

    fireEvent.click(deleteBtn)

    expect(setapplicationStateHandler).toHaveBeenCalledWith(ApplicationState.DEFAULT_MODE);
    expect(onRemoveHandler).toHaveBeenCalledWith(annotationData);
  })
})
