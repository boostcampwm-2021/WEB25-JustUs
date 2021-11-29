import styled from "styled-components";
import COLOR from "@src/styles/Color";
import { RootState } from "@src/reducer";
import { useDispatch, useSelector } from "react-redux";
import { UserAction } from "@src/action";
import { ModalAction } from "@src/action";

interface ModalListItem {
  id: number;
  name: string;
  payload: string;
}

const ProfileModal = () => {
  const modalListItem: ModalListItem[] = [
    { id: 0, name: "회원정보", payload: "ProfileModal" },
    { id: 1, name: "테마설정", payload: "ThemeModal" },
    { id: 2, name: "로그아웃", payload: "" },
  ];

  const dispatch = useDispatch();
  const { isProfileWrapperModalOpened } = useSelector((state: RootState) => state.modal);
  const onClickProfileItem = ({ payload, id }: ModalListItem) => {
    dispatch(
      ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: !isProfileWrapperModalOpened }),
    );
    if (id === 2) {
      dispatch(UserAction.logoutRequestAction());
    } else {
      dispatch(ModalAction.openModalAction(payload));
    }
  };

  return (
    <ModalWrapper>
      <Container>
        <ul>
          {modalListItem.map((item) => (
            <li onClick={() => onClickProfileItem(item)} key={item.id}>
              {item.name}
            </li>
          ))}
        </ul>
      </Container>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  background-color: ${COLOR.WHITE};
  position: absolute;
  right: 1vw;
  top: 5vh;
  border-radius: 1rem;
  z-index: 10;
  border: 1px solid ${COLOR.SHADOW_BLACK};
  box-shadow: 0.5rem 0.6rem 0.6rem 0rem ${COLOR.SHADOW_BLACK};
`;

const Container = styled.div`
  padding: 2rem;
  font-size: 2rem;

  & li {
    padding: 1rem 0;

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default ProfileModal;
