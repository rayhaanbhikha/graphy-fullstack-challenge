import React, { FunctionComponent } from 'react'
import { IconWrapper } from './IconWrapper';

import { ReactComponent as PencilIcon } from './pencil.svg';

export interface IPencil {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Pencil: FunctionComponent<IPencil> = ({ onClickHandler }) => {
  return (
    <IconWrapper onClick={onClickHandler}>
      <PencilIcon />
    </IconWrapper>
  )
}
