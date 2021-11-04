import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@src/styles/Color";
import { useDispatch } from "react-redux";

interface ProfileModalProps {
  isModalOpened: boolean;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}

const ProfileModal = ({ isModalOpened, setIsModalOpened }: ProfileModalProps) => {
  const modalListItem = [
    { id: 0, name: "회원정보" },
    { id: 1, name: "테마설정" },
    { id: 2, name: "로그아웃" },
  ];

  const dispatch = useDispatch();
  const onClickProfileItem: any = (idx: number) => {
    setIsModalOpened(prev => !prev);
    switch (idx) {
      case 0:
        dispatch({ type: "OPEN_USER_INFO_MODAL" });
        return;
      case 1:
        dispatch({ type: "OPEN_THEME_SETTING_MODAL" });
        return;
    }
  };

  return (
    <ModalWrapper>
      <Container>
        <div>프로필</div>
        <ul>
          {modalListItem.map(item => (
            <li onClick={() => onClickProfileItem(item.id)} key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </Container>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 15%;
  background-color: ${COLOR.WHITE};
  position: absolute;
  right: 1vw;
  top: 5vh;
  border-radius: 1rem;
  z-index: 10;
`;

const Container = styled.div`
  margin: 10%;
  & li {
    padding: 10%;
    font-size: 1.2rem;
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default ProfileModal;
