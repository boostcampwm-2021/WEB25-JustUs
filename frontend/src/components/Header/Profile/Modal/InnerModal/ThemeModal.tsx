import styled from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import color from "@styles/Color";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@src/styles/StyledComponents";

interface UserInfoModalProps {
  closeFn: () => void;
  open: boolean;
}

const UserInfoModal = ({ closeFn, open = false }: UserInfoModalProps) => {
  const dispatch = useDispatch();
  const closeUserInfoModal = () => {
    dispatch({ type: "CLOSE_THEME_SETTING_MODAL" });
  };
  const themes = [
    { id: 0, themeColor: "green", name: "보성 녹차 테마", src: "/img/greenTheme.png", isChecked: true },
    { id: 1, themeColor: "yellow", name: "고개 숙인 벼 테마", src: "/img/yellowTheme.png", isChecked: false },
    { id: 2, themeColor: "mint", name: "민트 초코 테마", src: "/img/mintTheme.png", isChecked: false },
  ];

  return (
    <Modal open={open} closeFn={closeFn}>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button
              type="button"
              onClick={() => {
                closeFn();
                closeUserInfoModal();
              }}
            >
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Container>
            <Title>테마 설정</Title>
            <Content>
              <ul>
                {themes.map(({ id, themeColor, name, src }) => {
                  return (
                    <li key={id}>
                      <img src={src} alt={themeColor} />
                      <input type="radio" name="theme" value={themeColor} />
                      <label htmlFor={themeColor}>{name}</label>
                    </li>
                  );
                })}
              </ul>
            </Content>
          </Container>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${color.white};
  min-height: 30vw;
  min-width: 40vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  ${flexColumnCenterAlign}
`;

const Container = styled.div`
  margin: 0 10% 10% 10%;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  & > button {
    background-color: white;
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  ${flexColumnCenterAlign}
`;

export default UserInfoModal;
