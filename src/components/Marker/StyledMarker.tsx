import styled from 'styled-components';

export const markerDimensions = {
  width: 19,
  height: 19
}

export const StyledMarker = styled.div<{ inEditMode: boolean }>`
  background: rgb(216, 216, 216);
  width: ${markerDimensions.width}px;
  height: ${markerDimensions.height}px;
  border-radius: 3px;
  border: solid 1px rgb(173, 173, 173);
  cursor: pointer;
  z-index: ${props => props.inEditMode ? 999 : 700}
`