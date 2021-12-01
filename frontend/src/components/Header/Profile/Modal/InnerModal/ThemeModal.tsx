import styled, { keyframes } from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import COLOR from "@styles/Color";
import { largeModalContainerSize, largeModalTitle, largeModalHeaderRightBtn } from "@styles/StyledComponents";
import { ThemeAction, ModalAction } from "@src/action";
import { icon, image } from "@src/constants";

const UserInfoModal = () => {
  const { selectedTheme } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();
  const closeUserInfoModal = () => {
    dispatch(ModalAction.closeModalAction());
  };
  const themes = [
    { id: 1, themeColor: "green", name: "보성 녹차 테마", src: image.greenTheme, isChecked: true },
    { id: 2, themeColor: "yellow", name: "고개 숙인 벼 테마", src: image.yellowTheme, isChecked: false },
    { id: 3, themeColor: "mint", name: "민트 초코 테마", src: image.mintTheme, isChecked: false },
  ];

  const radioHandler = (id: number) => {
    localStorage.setItem("themeNumber", id.toString());
    dispatch(ThemeAction.changeThemeAction(id));
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <ModalHeader>
          <ModalTitle>테마 설정</ModalTitle>
          <ModalHeaderRigthBtn onClick={closeUserInfoModal}>
            <img src={icon.clear} alt="next"></img>
          </ModalHeaderRigthBtn>
        </ModalHeader>
        <Container>
          <ThemeListGroup>
            {themes.map(({ id, themeColor, name, src }) => {
              return (
                <ThemeList key={id} onClick={() => radioHandler(id)} checked={selectedTheme === id}>
                  <img src={src} alt={themeColor} height="70%" />
                  <ThemeListInfo>
                    <input type="radio" name="theme" value={themeColor} checked={selectedTheme === id ? true : false} />
                    <label>{name}</label>
                  </ThemeListInfo>
                </ThemeList>
              );
            })}
          </ThemeListGroup>
        </Container>
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
  ${largeModalContainerSize}
  background-color: ${COLOR.WHITE};
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  font-size: 1.6rem;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  box-sizing: border-box;
  padding: 2rem;
`;
const ModalTitle = styled.div`
  ${largeModalTitle}
`;
const ModalHeaderRigthBtn = styled.button`
  ${largeModalHeaderRightBtn}
`;
const Container = styled.div`
  display: flex;
  height: 100%;
`;
const ThemeListGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
`;
const ThemeList = styled.li<{ checked: boolean }>`
  display: flex;
  margin: 2.5%;
  flex-basis: 45%;
  flex-direction: column;
  border: ${(props) => (props.checked ? `0.2rem solid ${COLOR.RADIO_CHECK}` : `0.1rem solid ${COLOR.LIGHTGRAY1}`)};
  box-sizing: border-box;
  border-radius: 2rem;
  overflow: hidden;
  width: 22rem;
  height: 17rem;
  &:hover {
    cursor: pointer;
  }
  & > img {
    width: 100%;
    height: 80%;
    border-bottom: ${(props) => (props.checked ? `0.2rem solid ${COLOR.RADIO_CHECK}` : ``)};
  }
`;
const ThemeListInfo = styled.div`
  display: flex;
  padding: 1rem;
  & > input {
    margin: 0;
  }
  & > label {
    margin-left: 1rem;
  }
`;

export default UserInfoModal;
