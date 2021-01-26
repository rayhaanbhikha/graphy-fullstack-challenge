import React, { FunctionComponent, useState } from 'react'

import { StyledAnnotationTooltipWrapper } from './StyledAnnotationTooltipWrapper';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { AnnotatedText } from './AnnotatedText';
import { Save } from '../Icons/Save';

interface IAnnotationTooltip {
  text: string;
  onEditHandler: (event: React.MouseEvent) => void;
  onDeleteHandler: (event: React.MouseEvent) => void;
  onSaveHandler: (text: string) => void;
  inEditMode: boolean;
  isOpen: boolean;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ text, onEditHandler, inEditMode, onSaveHandler, onDeleteHandler, isOpen }) => {

  const [annotatedText, setIsAnnotatedText] = useState(text);

  const onChangeHandler = (e: any) => setIsAnnotatedText(e.target.value)

  // TODO: cleanup component and add transition.
  return (
    <StyledAnnotationTooltipWrapper isOpen={isOpen}>
      <AnnotatedText onChangeHandler={onChangeHandler} text={annotatedText} inEditMode={inEditMode} />
      <StyledBtnWrapper>
        {
          inEditMode ?
            <Save onClickHandler={() => onSaveHandler(annotatedText)} /> :
            <Pencil onClickHandler={onEditHandler} />
        }
        <Bin onClickHandler={onDeleteHandler} />
      </StyledBtnWrapper>
    </StyledAnnotationTooltipWrapper >
  )
}
