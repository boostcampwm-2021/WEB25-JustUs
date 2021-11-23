import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@src/styles/Color";
import { RootState } from "@src/reducer";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "@src/reducer/UserReducer";
import { SET_PROFILE_WRAPPER_MODAL_OPENED } from "@src/reducer/Modal";

interface ProfileModalProps {
  isModalOpened: boolean;
  setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}

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
    dispatch({
      type: SET_PROFILE_WRAPPER_MODAL_OPENED,
      payload: { isProfileWrapperModalOpened: !isProfileWrapperModalOpened },
    });
    if (id === 2) {
      dispatch(logoutRequestAction());
    } else {
      const type = "OPEN_MODAL";
      dispatch({ type, payload });
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
    padding-bottom: 2rem;

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default ProfileModal;
