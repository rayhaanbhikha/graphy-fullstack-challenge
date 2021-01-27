import React, { FunctionComponent, useEffect, useRef } from 'react'

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

  return (
    <textarea ref={textAreaRef} onChange={onChangeHandler} value={text} readOnly={!inEditMode}
      // FIXME: remove this
      style={{
        flexGrow: 3,
        minWidth: 'inherit',
        border: 'none',
        background: inEditMode ? 'white' : 'inherit',
        margin: '5px',
        padding: '2px',
      }
      }
    />
  )
}