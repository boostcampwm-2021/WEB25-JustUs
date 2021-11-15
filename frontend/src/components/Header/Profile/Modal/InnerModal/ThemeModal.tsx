import styled from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { flexColumnCenterAlign } from "@src/styles/StyledComponents";

const UserInfoModal = () => {
  const { selectedTheme } = useSelector((state: RootState) => state.theme);

  const dispatch = useDispatch();
  const closeUserInfoModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const themes = [
    { id: 1, themeColor: "green", name: "보성 녹차 테마", src: "/img/greenTheme.png", isChecked: true },
    { id: 2, themeColor: "yellow", name: "고개 숙인 벼 테마", src: "/img/yellowTheme.png", isChecked: false },
    { id: 3, themeColor: "mint", name: "민트 초코 테마", src: "/img/mintTheme.png", isChecked: false },
  ];

  const radioHandler = (id: number) => {
    switch (id) {
      case 1:
        dispatch({ type: "CHANGE_THEME1" });
        break;
      case 2:
        dispatch({ type: "CHANGE_THEME2" });
        break;
      case 3:
        dispatch({ type: "CHANGE_THEME3" });
        break;
      default:
        break;
    }
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
            <img src="/icons/clear.svg" alt="next" height="90%"></img>
          </ModalHeaderRigthBtn>
        </ModalHeader>
        <Container>
          <ThemeListGroup>
            {themes.map(({ id, themeColor, name, src }) => {
              return (
                <ThemeList key={id} onClick={() => radioHandler(id)}>
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

const ThemeListInfo = styled.div`
  display: flex;
  padding: 10px;
  & > label {
    margin-left: 10px;
  }
`;

const ThemeList = styled.li`
  display: flex;
  margin: 2.5%;
  flex-basis: 45%;
  flex-direction: column;
  border: 1px solid ${COLOR.LIGHTGRAY1};
  box-sizing: border-box;
  border-radius: 20px;
  overflow: hidden;
`;
const ThemeListGroup = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  flex-direction: row;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 60px;
  box-sizing: border-box;
  font-size: max(1.2vw, 20px);
`;

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  height: 30vw;
  width: 40vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  padding: 10px;
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  ${flexColumnCenterAlign}
`;

export default UserInfoModal;
