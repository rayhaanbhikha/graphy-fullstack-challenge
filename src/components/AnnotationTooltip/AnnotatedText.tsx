import React, { FunctionComponent, useEffect, useRef } from 'react'

interface IAnnotatedText {
  isEditState: boolean;
  text: string;
  onChangeHandler: (event: React.ChangeEvent) => void
}

export const AnnotatedText: FunctionComponent<IAnnotatedText> = ({ isEditState, onChangeHandler, text }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (isEditState) textAreaRef?.current?.focus();
  }, [isEditState])

  return (
    <textarea ref={textAreaRef as any} onChange={onChangeHandler} value={text} readOnly={!isEditState}
      style={{
        flexGrow: 3,
        minWidth: 'inherit',
        border: 'none',
        background: isEditState ? 'white' : 'inherit',
        margin: '5px',
        padding: '2px',
      }
      }
    />
  )
}