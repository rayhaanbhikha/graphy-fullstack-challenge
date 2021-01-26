import React, { FunctionComponent } from 'react'

interface IAnnotatedText {
  isEditState: boolean;
  text: string;
  onChangeHandler: (event: React.ChangeEvent) => void
}

export const AnnotatedText: FunctionComponent<IAnnotatedText> = ({ isEditState, onChangeHandler, text }) =>
  <textarea onChange={onChangeHandler} value={text} readOnly={!isEditState}
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