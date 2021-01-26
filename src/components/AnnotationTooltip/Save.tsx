import React, { FunctionComponent } from 'react'
import { IconWrapper } from './IconWrapper';

import { ReactComponent as SaveIcon } from './save.svg';

export interface ISave {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Save: FunctionComponent<ISave> = ({ onClickHandler }) => {
  return (
    <IconWrapper onClick={onClickHandler}>
      <SaveIcon />
    </IconWrapper>
  )
}
