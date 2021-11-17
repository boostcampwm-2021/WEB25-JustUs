import Modal from "@components/Modal";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useDispatch } from "react-redux";

const PostListModal = () => {
  const dispatch = useDispatch();
  const { clusteredMarker }: any = useSelector((state: RootState) => state.modal);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>클러스터 마커 리스트 </Title>
          <Content>
            <ul>
              {clusteredMarker.map((marker: any) => (
                <li key={marker.postId}>
                  Title: {marker.postTitle}-id:{marker.postId}
                </li>
              ))}
            </ul>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 35vh;
  min-width: 30vw;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
  }
`;
const Title = styled.div`
  font-size: 40px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const DeleteAlbumGuideWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  font-size: 1.5rem;
  text-align: center;
`;

const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;
const CancelBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 8rem;
  height: 39px;
  border-radius: 10px;
  border: 1px solid ${COLOR.BLUE};
  color: ${COLOR.BLACK};
  background-color: ${COLOR.WHITE};
  margin-top: 50px;
  font-size: 30px;
  grid-column-start: 1;
  grid-column-end: 2;
  cursor: pointer;
`;
const DeleteBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 8rem;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.RED};
  margin-top: 50px;
  font-size: 30px;
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;
export default PostListModal;
