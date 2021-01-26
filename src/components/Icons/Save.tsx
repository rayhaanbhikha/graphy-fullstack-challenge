import React, { FunctionComponent } from 'react'

import { StyledIconWrapper } from './StyledIconWrapper';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';

export interface ISave {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Save: FunctionComponent<ISave> = ({ onClickHandler }) =>
  <StyledIconWrapper onClick={onClickHandler}>
    <SaveIcon />
  </StyledIconWrapper>
