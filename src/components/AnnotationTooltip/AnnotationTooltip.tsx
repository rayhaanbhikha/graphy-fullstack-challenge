import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { StyledAnnotationTooltip } from './StyledAnnotationTooltip';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { Save } from '../Icons/Save';

import { StyledTextArea } from './StyledTextArea';
import { PositionAnnotationTooltip } from './PositionAnnotationTooltip';
import { AnnotationStates } from '../Annotation/Annotation';
import { AnnotationActions } from '../Annotation/annotationReducer';
import { AnnotationWithStateType } from '../../types';

interface IAnnotationTooltip {
  data: AnnotationWithStateType,
  annotationState: AnnotationStates;
  dispatchHandler: (action: AnnotationActions, annotation: AnnotationWithStateType) => void;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, annotationState, dispatchHandler }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  const [annotatedText, setIsAnnotatedText] = useState(data.text);

  useEffect(() => {
    if (annotationState === AnnotationStates.EDITING) {
      textAreaRef?.current?.focus();
    }
  }, [annotationState])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  const onSaveHandler = () => dispatchHandler(AnnotationActions.SAVE, { ...data, text: annotatedText })
  const onEditHandler = () => dispatchHandler(AnnotationActions.EDIT, data);
  const onDeleteHandler = () => dispatchHandler(AnnotationActions.DELETE, data);

  return (
    <PositionAnnotationTooltip annotationState={annotationState}>
      <StyledAnnotationTooltip annotationState={annotationState}>
        <StyledTextArea
          ref={textAreaRef}
          value={annotatedText}
          inEditMode={annotationState === AnnotationStates.EDITING}
          onChange={onChangeHandler}
        />
        <StyledBtnWrapper>
          {
            annotationState === AnnotationStates.EDITING ?
              <Save onClickHandler={onSaveHandler} /> : <Pencil onClickHandler={onEditHandler} />
          }
          <Bin onClickHandler={onDeleteHandler} />
        </StyledBtnWrapper>
      </StyledAnnotationTooltip>
    </PositionAnnotationTooltip>
  )
}
