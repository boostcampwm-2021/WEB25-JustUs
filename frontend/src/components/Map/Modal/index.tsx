import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { SET_RIGHT_CLICK_MODAL } from "@src/reducer/MapReducer";

const MapLayerPostModal = (e: any) => {
  const dispatch = useDispatch();

  const modalOpen = (x: number, y: number) => {
    dispatch({ type: SET_RIGHT_CLICK_MODAL, payload: false });
    dispatch({ type: "SET_ADDRESS", payload: "" });
    dispatch({ type: "SET_POSITION", payload: { x, y } });
    dispatch({ type: "OPEN_MODAL", payload: "UploadAddressModal" });
  };

  return (
    <MapLayerModalContainer x={e.rightPosition.x} y={e.rightPosition.y}>
      <MapLayerModal onClick={() => modalOpen(e.latLng.x, e.latLng.y)}>
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
  position: absolute;
  z-index: 10;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y + 10}px`};
`;

const MapLayerModal = styled.div`
  background-color: ${COLOR.WHITE};
  padding: 0.5rem;
  border-radius: 1rem;
  border: solid 0.4rem ${COLOR.THEME1.SECONDARY};
  text-align: center;
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
  width: 5vw;
  height: 3vh;
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
