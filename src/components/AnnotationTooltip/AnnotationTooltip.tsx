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
  ishoveringOverMarker: boolean;
  removeAnnotation: (annotation: AnnotationType) => Promise<void>;
  updateAnnotation: (annotation: AnnotationType) => Promise<void>;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, ishoveringOverMarker, updateAnnotation, removeAnnotation }) => {

  const { id, text, coord } = data;

  const [isHoveringOverToolTip, setisHoveringOverToolTip] = useState(true)
  const [inEditMode, setinEditMode] = useState(true);
  const [annotatedText, setIsAnnotatedText] = useState(text);

  const { toggleState } = useContext(AnnotationStateContext);

  useEffect(() => {
    toggleState(AnnotationStates.EDIT_MODE);
  }, [])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  const onSaveHandler = () => {
    setinEditMode(false);
    toggleState(AnnotationStates.DEFAULT_MODE);
    updateAnnotation({
      id,
      coord,
      text: annotatedText
    })
  }

  const onEditHandler = () => {
    setinEditMode(true);
    toggleState(AnnotationStates.EDIT_MODE)
  }

  const onDeleteHandler = () => {
    toggleState(AnnotationStates.DEFAULT_MODE);
    removeAnnotation(data)
  }

  const onMouseEnter = () => setisHoveringOverToolTip(true)
  const onMouseLeave = () => setisHoveringOverToolTip(false)

  // TODO: css transition.
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <StyledAnnotationTooltipWrapper
        isOpen={ishoveringOverMarker || isHoveringOverToolTip || inEditMode} >
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
    </div>
  )
}
