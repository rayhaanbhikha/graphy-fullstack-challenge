import React, { FunctionComponent, useState } from 'react'

import { StyledAnnotationTooltipWrapper } from './StyledAnnotationTooltipWrapper';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { AnnotatedText } from './AnnotatedText';
import { Save } from '../Icons/Save';
import { AnnotationType } from '../../types';

interface IAnnotationTooltip {
  data: AnnotationType,
  removeAnnotation: (annotation: AnnotationType) => Promise<void>;
  updateAnnotation: (annotation: AnnotationType) => Promise<void>;
  ishoveringOverMarker: boolean;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, updateAnnotation, removeAnnotation, ishoveringOverMarker }) => {

  const { id, text, coord } = data;
  const [isHoveingOverToolTip, setisHoveingOverToolTip] = useState(true)
  const [annotatedText, setIsAnnotatedText] = useState(text);
  const [inEditMode, setinEditMode] = useState(true);

  // change this.
  const onChangeHandler = (e: any) => setIsAnnotatedText(e.target.value)
  const onEditHandler = () => setinEditMode(true);

  const onSaveHandler = () => {
    setinEditMode(false);
    updateAnnotation({
      id,
      coord,
      text: annotatedText
    })
  }
  const onDeleteHandler = () => removeAnnotation(data);

  const onMouseEnter = () => setisHoveingOverToolTip(true);
  const onMouseLeave = () => setisHoveingOverToolTip(false);

  // TODO: cleanup component and add transition.
  return (
    <StyledAnnotationTooltipWrapper
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      isOpen={ishoveringOverMarker || inEditMode || isHoveingOverToolTip} >
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
