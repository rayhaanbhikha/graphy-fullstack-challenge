import React, { FunctionComponent } from 'react'

import { StyledIconWrapper } from './StyledIconWrapper';
import { ReactComponent as PencilIcon } from '../../assets/pencil.svg';

export interface IPencil {
  onClickHandler: (event: React.MouseEvent) => void;
}

export const Pencil: FunctionComponent<IPencil> = ({ onClickHandler }) =>
  <StyledIconWrapper onClick={onClickHandler}>
    <PencilIcon />
  </StyledIconWrapper>
