import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { StyledAnnotationTooltip } from './StyledAnnotationTooltip';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { Save } from '../Icons/Save';

import { StyledTextArea } from './StyledTextArea';
import { PositionAnnotationTooltip } from './PositionAnnotationTooltip';
import { AnnotationStates } from '../Annotation/Annotation';

interface IAnnotationTooltip {
  text: string,
  annotationstate: AnnotationStates,
  onSaveHandler: (annotatedText: string) => void;
  onEditHandler: () => void;
  onDeleteHandler: () => void;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ text, annotationstate, onSaveHandler, onEditHandler, onDeleteHandler }) => {

  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  const [annotatedText, setIsAnnotatedText] = useState(text);

  useEffect(() => {
    if (annotationstate === AnnotationStates.EDITING) {
      textAreaRef?.current?.focus();
    }
  }, [annotationstate])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  return (
    <PositionAnnotationTooltip annotationState={annotationstate}>
      <StyledAnnotationTooltip annotationState={annotationstate}>
        <StyledTextArea
          ref={textAreaRef}
          value={annotatedText}
          inEditMode={annotationstate === AnnotationStates.EDITING}
          onChange={onChangeHandler}
        />
        <StyledBtnWrapper>
          {
            annotationstate === AnnotationStates.EDITING ?
              <Save onClickHandler={() => onSaveHandler(annotatedText)} /> : <Pencil onClickHandler={onEditHandler} />
          }
          <Bin onClickHandler={onDeleteHandler} />
        </StyledBtnWrapper>
      </StyledAnnotationTooltip>
    </PositionAnnotationTooltip>
  )
}
