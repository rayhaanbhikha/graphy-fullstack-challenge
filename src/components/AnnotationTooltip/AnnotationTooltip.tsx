import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

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
}


export const AnnotationTooltip: FunctionComponent<IAnnotationTooltip> = ({ text }) => {
  return (
    <AnnotationTooltipWrapper>
      <p style={{ flexGrow: 3 }}>{text}</p>
      <div>
        <button>edit</button>
        <button>delete</button>
      </div>
    </AnnotationTooltipWrapper>
  )
}
