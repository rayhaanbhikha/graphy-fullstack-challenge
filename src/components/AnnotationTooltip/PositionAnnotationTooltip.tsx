import styled from "styled-components";
import { markerDimensions } from "../Marker/StyledMarker";

export const PositionAnnotationTooltip = styled.div<{ isOpen: boolean; }>`
  position: absolute;
  left: ${markerDimensions.width}px;
  top: 0;
  padding-left: 5px;
  visibility: ${props => props.isOpen ? 'initial' : 'hidden'};
  opacity: ${props => props.isOpen ? 100 : 0};
  transition: visibility 0.5s, opacity 0.5s ease;
`