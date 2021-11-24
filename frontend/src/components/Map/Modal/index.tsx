import COLOR from "@styles/Color";
import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";

const MapLayerPostModal = (e: any) => {
  return (
    <MapLayerModalContainer x={e.rightPosition.x} y={e.rightPosition.y}>
      <MapLayerModal onClick={() => e.modalOpen(e.latLng.x, e.latLng.y)}>
        <Content>
          <div>포스트 추가</div>
        </Content>
        <HoverContent>
          좌표 값: ${e.rightPosition.x}${e.rightPosition.y}
        </HoverContent>
      </MapLayerModal>
    </MapLayerModalContainer>
  );
};

const MapLayerModalContainer = styled.div<{ x: number; y: number }>`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

const MapLayerModal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${COLOR.WHITE};
  padding: 0.5rem;
  border-radius: 1rem;
  border: solid 0.4rem ${COLOR.THEME1.SECONDARY};
  text-align: center;
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
  ${flexRowCenterAlign};
  &:hover {
    cursor: pointer;
    background-color: ${COLOR.THEME1.PRIMARY};
    font-weight: bold;
    color: ${COLOR.WHITE};
  }
`;

const Content = styled.div`
  font-size: 1.6rem;
`;

const HoverContent = styled.div`
  display: none;
`;

export default MapLayerPostModal;
