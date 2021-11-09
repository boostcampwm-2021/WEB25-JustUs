import COLOR from "@styles/Color";
import styled from "styled-components";

const MapLayerPostModal = (e: any) => {
  return (
    <MapLayerModalContainer x={e.rightPosition.x} y={e.rightPosition.y}>
      ${e.rightPosition.x}${e.rightPosition.y}
    </MapLayerModalContainer>
  );
};

const MapLayerModalContainer = styled.div<{ x: number; y: number }>`
  background-color: ${COLOR.RED};
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 10;
  left: ${(props) => `${props.x - 100}px`};
  top: ${(props) => `${props.y - 100}px`};
`;

export default MapLayerPostModal;
