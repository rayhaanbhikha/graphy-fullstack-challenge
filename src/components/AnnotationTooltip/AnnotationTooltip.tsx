import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import { StyledAnnotationTooltip } from './StyledAnnotationTooltip';
import { StyledBtnWrapper } from './StyledBtnWrapper';
import { Pencil } from '../Icons/Pencil';
import { Bin } from '../Icons/Bin';
import { Save } from '../Icons/Save';

import { StyledTextArea } from './StyledTextArea';
import { PositionAnnotationTooltip } from './PositionAnnotationTooltip';
import { AnnotationStates } from '../Annotation/Annotation';
import { AnnotationWithStateType } from '../../types';

interface IAnnotationTooltip {
  data: AnnotationWithStateType,
  onSaveHandler: any;
  onEditHandler: any;
  onDeleteHandler: any;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ data, onSaveHandler
  , onEditHandler
  , onDeleteHandler }) => {

  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  const [annotatedText, setIsAnnotatedText] = useState(data.text);

  useEffect(() => {
    if (data.state === AnnotationStates.EDITING) {
      textAreaRef?.current?.focus();
    }
  }, [data])

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIsAnnotatedText(e.target.value);

  return (
    <PositionAnnotationTooltip annotationState={data.state}>
      <StyledAnnotationTooltip annotationState={data.state}>
        <StyledTextArea
          ref={textAreaRef}
          value={annotatedText}
          inEditMode={data.state === AnnotationStates.EDITING}
          onChange={onChangeHandler}
        />
        <StyledBtnWrapper>
          {
            data.state === AnnotationStates.EDITING ?
              <Save onClickHandler={() => onSaveHandler({ ...data, text: annotatedText })} /> : <Pencil onClickHandler={onEditHandler} />
          }
          <Bin onClickHandler={onDeleteHandler} />
        </StyledBtnWrapper>
      </StyledAnnotationTooltip>
    </PositionAnnotationTooltip>
  )
}
