import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as Pencil } from './pencil.svg';
import { ReactComponent as Delete } from './delete.svg';

const AnnotationTooltipWrapper = styled.div`
  background: rgb(216, 216, 216);
  margin-left: 5px;
  width: 300px;
  height: 100px;
  text-align: center;
  border-radius: 5px;
  z-index: 999;
  display: flex;
  flex-direction: column;
`

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

  return (
    <AnnotationTooltipWrapper>
      { isEditState ?
        <>
          <input type="textarea" style={{ flexGrow: 3 }} value={annotatedText} onChange={onChangeHandler}></input>
          <div>
            <button onClick={() => onSaveHandler(annotatedText)}>save</button>
          </div>
        </>
        :
        <>
          <p style={{ flexGrow: 3 }}>{annotatedText}</p>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '5px'
          }}>
            <Pencil style={{ cursor: 'pointer ' }} onClick={onEditHandler} />
            <Delete style={{ cursor: 'pointer ' }} onClick={onDeleteHandler} />
          </div>
        </>
      }

    </AnnotationTooltipWrapper >
  )
}
