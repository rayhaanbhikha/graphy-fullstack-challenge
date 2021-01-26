import React, { FunctionComponent, useState } from 'react'

import { AnnotationTooltipWrapper } from './AnnotationTooltipWrapper';
import { BtnWrapper } from './BtnWrapper';
import { Pencil } from './Pencil';
import { Bin } from './Bin';

interface IAnnotationTooltip {
  text: string;
  onEditHandler: (event: React.MouseEvent) => void;
  onDeleteHandler: (event: React.MouseEvent) => void;
  onSaveHandler: (text: string) => void;
  isEditState: boolean;
}

export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ text, onEditHandler, isEditState, onSaveHandler, onDeleteHandler }) => {

  const [annotatedText, setIsAnnotatedText] = useState(text);

  const onChangeHandler = (e: any) => setIsAnnotatedText(e.target.value)

  const renderAnnotatedText = () => isEditState ?
    <input type="textarea" style={{ flexGrow: 3 }} value={annotatedText} onChange={onChangeHandler}></input> :
    <p style={{ flexGrow: 3 }}>{annotatedText}</p>

  const renderBtns = () =>
    isEditState ?
      <button onClick={() => onSaveHandler(annotatedText)}>save</button> :
      <>
        <Pencil onClickHandler={onEditHandler} />
        <Bin onClickHandler={onDeleteHandler} />
      </>

  // TODO: cleanup component and add transition.
  return (
    <AnnotationTooltipWrapper>
      {renderAnnotatedText()}
      <BtnWrapper>
        {renderBtns()}
      </BtnWrapper>
    </AnnotationTooltipWrapper >
  )
}
