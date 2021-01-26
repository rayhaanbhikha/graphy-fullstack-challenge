import React, { FunctionComponent } from 'react'
import { IconWrapper } from './IconWrapper';

import { ReactComponent as BinIcon } from './bin.svg';

export interface IBin {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Bin: FunctionComponent<IBin> = ({ onClickHandler }) => {
  return (
    <IconWrapper onClick={onClickHandler}>
      <BinIcon />
    </IconWrapper>
  )
}
