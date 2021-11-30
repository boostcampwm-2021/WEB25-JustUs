import styled, { keyframes } from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { ThemeAction, ModalAction } from "@src/action";

const UserInfoModal = () => {
  const { selectedTheme } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();
  const closeUserInfoModal = () => {
    dispatch(ModalAction.closeModalAction());
  };
  const themes = [
    { id: 1, themeColor: "green", name: "보성 녹차 테마", src: "/img/greenTheme.png", isChecked: true },
    { id: 2, themeColor: "yellow", name: "고개 숙인 벼 테마", src: "/img/yellowTheme.png", isChecked: false },
    { id: 3, themeColor: "mint", name: "민트 초코 테마", src: "/img/mintTheme.png", isChecked: false },
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
            <img src="/icons/clear.svg" alt="next"></img>
          </ModalHeaderRigthBtn>
        </ModalHeader>
        <Container>
          <ThemeListGroup>
            {themes.map(({ id, themeColor, name, src }) => {
              return (
                <ThemeList key={id} onClick={() => radioHandler(id)} checked={selectedTheme === id}>
                  <img src={src} alt={themeColor} height="70%" />
                  <ThemeListInfo>
                    <input type="radio" name="theme" value={themeColor} checked={selectedTheme == id ? true : false} />
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
const ThemeListInfo = styled.div`
  display: flex;
  padding: 10px;

  & > input {
    margin: 0;
  }

  & > label {
    margin-left: 10px;
  }
`;

const ThemeList = styled.li<{ checked: boolean }>`
  display: flex;
  margin: 2.5%;
  flex-basis: 45%;
  flex-direction: column;
  border: ${(props) => (props.checked ? `2px solid ${COLOR.RADIO_CHECK}` : `1px solid ${COLOR.LIGHTGRAY1}`)};
  box-sizing: border-box;
  border-radius: 2rem;
  overflow: hidden;
  width: 25rem;
  height: 20rem;

  & > img {
    width: 100%;
    height: 80%;
    border-bottom: ${(props) => (props.checked ? `2px solid ${COLOR.RADIO_CHECK}` : ``)};
  }
`;
const ThemeListGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  background-color: ${COLOR.WHITE};
  border: none;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  ${flexRowCenterAlign}
  cursor: pointer;
  &:hover {
    background-color: ${COLOR.GRAY};
  }
`;

const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  flex-direction: row;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 2.5rem;
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 60px;
  box-sizing: border-box;
  font-size: max(1.2vw, 20px);
  padding: 2rem;
`;

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 55rem;
  min-width: 28vw;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  font-size: 1.6rem;
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  height: 100%;
`;

export default UserInfoModal;
