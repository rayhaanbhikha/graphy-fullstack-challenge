import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react'

import { StyledAnnotationTooltip } from './StyledAnnotationTooltip';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { Save } from '../Icons/Save';
import { AnnotationType } from '../../types';
import { AnnotationStateContext } from '../hooks/AnnotationStateContext';
import { AnnotationStates } from '../hooks/useAnnotations';
import { StyledAnnotationTooltipWrapper } from './StyledAnnotationTooltipWrapper';
import { StyledTextArea } from './StyledTextArea';

interface IAnnotationTooltip {
  data: AnnotationType,
  isHovering: boolean;
  inEditMode: boolean;
  setinEditMode: any;
  onMouseEnter: (event: React.MouseEvent) => void;
  onMouseLeave: (event: React.MouseEvent) => void;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, isHovering, inEditMode, setinEditMode, onMouseEnter, onMouseLeave }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);
  const { id, text, coord } = data;

  const [annotatedText, setIsAnnotatedText] = useState(text);
  const { save, remove, setErrorMessage, setAnnotationState } = useContext(AnnotationStateContext);

  useEffect(() => {
    if (inEditMode) {
      setAnnotationState(AnnotationStates.EDIT_MODE);
      textAreaRef?.current?.focus();
    }
  }, [inEditMode, setAnnotationState])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  const onSaveHandler = () => {
    if (!annotatedText) {
      setErrorMessage("Annotation text cannot be empty.")
      return;
    }
    setinEditMode(false);
    setAnnotationState(AnnotationStates.DEFAULT_MODE);
    save({
      id,
      coord,
      text: annotatedText
    })
  }

  const onEditHandler = () => {
    setinEditMode(true);
    setAnnotationState(AnnotationStates.EDIT_MODE)
  }

  const onDeleteHandler = () => {
    setAnnotationState(AnnotationStates.DEFAULT_MODE);
    remove(data)
  }

  // TODO: css transition.
  return (
    <StyledAnnotationTooltipWrapper
      inEditMode={inEditMode}
      isHovering={isHovering}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <StyledAnnotationTooltip>
        <StyledTextArea
          ref={textAreaRef}
          value={annotatedText}
          inEditMode={inEditMode}
          onChange={onChangeHandler}
        />
        <StyledBtnWrapper>
          {
            inEditMode ?
              <Save onClickHandler={onSaveHandler} /> :
              <Pencil onClickHandler={onEditHandler} />
          }
          <Bin onClickHandler={onDeleteHandler} />
        </StyledBtnWrapper>
      </StyledAnnotationTooltip >
    </StyledAnnotationTooltipWrapper>
  )
}
