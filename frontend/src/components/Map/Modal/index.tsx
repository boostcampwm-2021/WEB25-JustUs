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
      <MapLayerModal onClick={modalOpen}>
        <Content>포스트 추가</Content>
        <HoverContent>
          좌표 값: ${e.rightPosition.x}${e.rightPosition.y}
        </HoverContent>
      </MapLayerModal>
    </MapLayerModalContainer>
  );
};

const MapLayerModalContainer = styled.div<{ x: number; y: number }>`
  position: absolute;
  z-index: 10;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y - 60}px`};
`;

const MapLayerModal = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: solid 0.2rem ${COLOR.THEME1.SECONDARY};
  text-align: center;
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
  &:hover {
    cursor: pointer;
    background-color: ${COLOR.THEME1.PRIMARY};
    font-weight: bold;
    color: ${COLOR.WHITE};
  }
`;

const Content = styled.div``;

const HoverContent = styled.div`
  display: none;
`;

export default MapLayerPostModal;
