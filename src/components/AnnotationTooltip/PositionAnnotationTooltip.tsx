import styled from "styled-components";
import { markerDimensions } from "../Marker/StyledMarker";

export const PositionAnnotationTooltip = styled.div`
  position: absolute;
  left: ${markerDimensions.width}px;
  top: 0;
  padding-left: 5px;
`