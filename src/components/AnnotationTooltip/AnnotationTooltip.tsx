import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { StyledAnnotationTooltipWrapper } from './StyledAnnotationTooltipWrapper';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { AnnotatedText } from './AnnotatedText';
import { Save } from '../Icons/Save';
import { AnnotationType } from '../../types';
import { AnnotationStateContext, AnnotationStates } from '../hooks/AnnotationStateContext';

interface IAnnotationTooltip {
  data: AnnotationType,
  ishoveringOverTooltip: boolean;
  inEditMode: boolean;
  setinEditMode: any;
  removeAnnotation: (annotation: AnnotationType) => Promise<void>;
  saveAnnotation: (annotation: AnnotationType) => Promise<void>;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, ishoveringOverTooltip, inEditMode, setinEditMode, saveAnnotation, removeAnnotation }) => {

  const { id, text, coord } = data;

  const [annotatedText, setIsAnnotatedText] = useState(text);
  const { setAnnotationStateContext } = useContext(AnnotationStateContext);

  useEffect(() => {
    // make sure user is hovering over marker when this component loads the first time.
    if (ishoveringOverTooltip) {
      setinEditMode(true)
      setAnnotationStateContext(AnnotationStates.EDIT_MODE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  // TODO: should validate if string is empty or not.
  const onSaveHandler = () => {
    setinEditMode(false);
    setAnnotationStateContext(AnnotationStates.DEFAULT_MODE);
    saveAnnotation({
      id,
      coord,
      text: annotatedText
    })
  }

  const onEditHandler = () => {
    setinEditMode(true);
    setAnnotationStateContext(AnnotationStates.EDIT_MODE)
  }

  const onDeleteHandler = () => {
    setAnnotationStateContext(AnnotationStates.DEFAULT_MODE);
    removeAnnotation(data)
  }

  // TODO: css transition.
  return (
    <StyledAnnotationTooltipWrapper
      isOpen={ishoveringOverTooltip || inEditMode}
      inEditMode={inEditMode}
    >
      <AnnotatedText onChangeHandler={onChangeHandler} text={annotatedText} inEditMode={inEditMode} />
      <StyledBtnWrapper>
        {
          inEditMode ?
            <Save onClickHandler={onSaveHandler} /> :
            <Pencil onClickHandler={onEditHandler} />
        }
        <Bin onClickHandler={onDeleteHandler} />
      </StyledBtnWrapper>
    </StyledAnnotationTooltipWrapper >
  )
}
