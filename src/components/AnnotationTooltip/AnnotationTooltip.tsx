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
  ishoveringOverMarker: boolean;
  removeAnnotation: (annotation: AnnotationType) => Promise<void>;
  updateAnnotation: (annotation: AnnotationType) => Promise<void>;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, ishoveringOverMarker, updateAnnotation, removeAnnotation }) => {

  const { id, text, coord } = data;

  const [isHoveingOverToolTip, setisHoveingOverToolTip] = useState(true)
  const [inEditMode, setinEditMode] = useState(true);
  const [annotatedText, setIsAnnotatedText] = useState(text);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  const onSaveHandler = () => {
    setinEditMode(false);
    updateAnnotation({
      id,
      coord,
      text: annotatedText
    })
  }

  const onMouseEnter = () => setisHoveingOverToolTip(true)
  const onMouseLeave = () => setisHoveingOverToolTip(false)

  // TODO: css transition.
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <StyledAnnotationTooltipWrapper
        isOpen={ishoveringOverMarker || inEditMode || isHoveingOverToolTip} >
        <AnnotatedText onChangeHandler={onChangeHandler} text={annotatedText} inEditMode={inEditMode} />
        <StyledBtnWrapper>
          {
            inEditMode ?
              <Save onClickHandler={onSaveHandler} /> :
              <Pencil onClickHandler={() => setinEditMode(true)} />
          }
          <Bin onClickHandler={() => removeAnnotation(data)} />
        </StyledBtnWrapper>
      </StyledAnnotationTooltipWrapper >
    </div>
  )
}
