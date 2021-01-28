import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import { StyledAnnotationTooltipWrapper } from './StyledAnnotationTooltipWrapper';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { AnnotatedText } from './AnnotatedText';
import { Save } from '../Icons/Save';
import { AnnotationType } from '../../types';
import { AnnotationStateContext } from '../hooks/AnnotationStateContext';
import { AnnotationStates } from '../hooks/useAnnotations';

interface IAnnotationTooltip {
  data: AnnotationType,
  ishoveringOverTooltip: boolean;
  inEditMode: boolean;
  setinEditMode: any;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = (props) => {

  const { data, ishoveringOverTooltip, inEditMode, setinEditMode } = props;
  const { id, text, coord } = data;

  const [annotatedText, setIsAnnotatedText] = useState(text);
  const { save, remove, setErrorMessage, setAnnotationState } = useContext(AnnotationStateContext);

  useEffect(() => {
    // make sure user is hovering over marker when this component loads the first time.
    if (ishoveringOverTooltip) {
      setinEditMode(true)
      setAnnotationState(AnnotationStates.EDIT_MODE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  // TODO: should validate if string is empty or not.
  const onSaveHandler = () => {
    if (annotatedText === '') {
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
    <StyledAnnotationTooltipWrapper isOpen={ishoveringOverTooltip || inEditMode}>
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
