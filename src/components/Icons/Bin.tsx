import React, { FunctionComponent } from 'react'

import { StyledIconWrapper } from './StyledIconWrapper';
import { ReactComponent as BinIcon } from '../../assets/bin.svg';

export interface IBin {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Bin: FunctionComponent<IBin> = ({ onClickHandler }) =>
  <StyledIconWrapper onClick={onClickHandler}>
    <BinIcon />
  </StyledIconWrapper>
