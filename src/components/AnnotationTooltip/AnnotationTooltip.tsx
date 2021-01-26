import React, { FunctionComponent, useState } from 'react'

import { AnnotationTooltipWrapper } from './AnnotationTooltipWrapper';
import { BtnWrapper } from './BtnWrapper';
import { Pencil } from './Pencil';
import { Bin } from './Bin';
import { AnnotatedText } from './AnnotatedText';
import { Save } from './Save';

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
    <AnnotationTooltipWrapper isOpen={isOpen}>
      <AnnotatedText onChangeHandler={onChangeHandler} text={annotatedText} inEditMode={inEditMode} />
      <BtnWrapper>
        {
          inEditMode ?
            <Save onClickHandler={() => onSaveHandler(annotatedText)} /> :
            <Pencil onClickHandler={onEditHandler} />
        }
        <Bin onClickHandler={onDeleteHandler} />
      </BtnWrapper>
    </AnnotationTooltipWrapper >
  )
}
