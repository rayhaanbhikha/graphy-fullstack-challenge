import React, { FunctionComponent, useEffect, useRef } from 'react'

import { StyledTextArea } from './StyledTextArea';

interface IAnnotatedText {
  inEditMode: boolean;
  text: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const AnnotatedText: FunctionComponent<IAnnotatedText> = ({ inEditMode, onChangeHandler, text }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  useEffect(() => {
    if (inEditMode) textAreaRef?.current?.focus();
  }, [inEditMode])

  return <StyledTextArea ref={textAreaRef} onChange={onChangeHandler} value={text} readOnly={!inEditMode} disabled={!inEditMode} />
}