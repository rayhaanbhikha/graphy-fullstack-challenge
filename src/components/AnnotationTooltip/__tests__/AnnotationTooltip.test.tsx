import React from 'react';
import { render } from '@testing-library/react'
import fireEvent from '@testing-library/user-event'
import { AnnotationStates } from '../../Annotation/Annotation';
import { AnnotationTooltip } from '../AnnotationTooltip';

describe('AnnotationTooltip', () => {

  const onSaveHandler = jest.fn();
  const onEditHandler = jest.fn();
  const onDeleteHandler = jest.fn();

  const defaultText = "some text";

  const renderComponent: ReturnType<typeof render> = (state: AnnotationStates) => render(<AnnotationTooltip
    text={defaultText}
    annotationstate={state}
    onSaveHandler={onSaveHandler}
    onEditHandler={onEditHandler}
    onDeleteHandler={onDeleteHandler}
  />)

  beforeEach(jest.resetAllMocks);

  describe('Edit state', () => {
    const state = AnnotationStates.EDITING;

    it("should focus on text area when component loads.", async () => {
      const { container } = await renderComponent(state);
      const element = container.querySelector('textarea');
      expect(element).toHaveFocus();
    })

    it("should render correctly in edit mode", async () => {
      const { container, getByText } = await renderComponent(state);
      const element = container.querySelector('textarea');
      expect(getByText('save.svg')).toBeTruthy();
      expect(getByText('bin.svg')).toBeTruthy();
      expect(element.textContent).toEqual(defaultText);
    })

    it("should invoke onSaveHandler when clicked", async () => {
      const { getByText } = await renderComponent(state);
      const saveBtn = getByText('save.svg');
      fireEvent.click(saveBtn)
      expect(onSaveHandler).toHaveBeenCalled();
    })

    it("should update value in text area when in edit mode", async () => {
      const { container } = await renderComponent(state);
      const textArea = container.querySelector('textarea');
      const typedText = "hello world"
      fireEvent.type(textArea, typedText);
      expect(textArea.textContent).toBe(typedText)
    })

    it("should invoke onDeleteHandler when clicked", async () => {
      const { getByText } = await renderComponent(state);
      const deleteBtn = getByText('bin.svg');
      fireEvent.click(deleteBtn)
      expect(onDeleteHandler).toHaveBeenCalled();
    })
  })



  describe('Open state', () => {
    const state = AnnotationStates.OPEN;

    it("should not focus on text area when component loads.", async () => {
      const { container } = await renderComponent(state);
      const element = container.querySelector('textarea');
      expect(element).not.toHaveFocus();
    });

    it("should render correctly in open mode", async () => {
      const { container, getByText } = await renderComponent(state);
      const element = container.querySelector('textarea');
      expect(getByText('pencil.svg')).toBeTruthy();
      expect(getByText('bin.svg')).toBeTruthy();
      expect(element.textContent).toEqual(defaultText);
    });

    it("should invoke onDeleteHandler when clicked", async () => {
      const { getByText } = await renderComponent(state);
      const deleteBtn = getByText('bin.svg');
      fireEvent.click(deleteBtn)
      expect(onDeleteHandler).toHaveBeenCalled();
    })

    it("should not be able to write in textarea when in open mode", async () => {
      const { container } = await renderComponent(state);
      const textArea = container.querySelector('textarea');
      fireEvent.type(textArea, "hello world");
      expect(textArea.textContent).toBe(defaultText)
    })

    it("should invoke onEditHandler when clicked", async () => {
      const { getByText } = await renderComponent(state);
      const editBtn = getByText('pencil.svg');
      fireEvent.click(editBtn)
      expect(onEditHandler).toHaveBeenCalled();
    })
  })
})
