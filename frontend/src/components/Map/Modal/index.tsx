import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import styled from "styled-components";

const MapLayerPostModal = (e: any) => {
  const dispatch = useDispatch();

  const modalOpen = () => {
    e.setIsRightClick(false);
    dispatch({ type: "OPEN_MODAL", payload: "PostCreateModal" });
  };

  return (
    <MapLayerModalContainer x={e.rightPosition.x} y={e.rightPosition.y}>
      <button onClick={modalOpen}>
        좌표 값: ${e.rightPosition.x}${e.rightPosition.y}
      </button>
    </MapLayerModalContainer>
  );
};

const MapLayerModalContainer = styled.div<{ x: number; y: number }>`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 10;
  left: ${(props) => `${props.x - 100}px`};
  top: ${(props) => `${props.y - 100}px`};
`;

export default MapLayerPostModal;
