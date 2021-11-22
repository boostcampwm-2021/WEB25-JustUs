import { useEffect } from "react";
import styled from "styled-components";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { RootState } from "@src/reducer";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { isProfileWrapperModalOpened } = useSelector((state: RootState) => state.modal);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { clickedTarget } = useSelector((state: RootState) => state.groupModal);

  const handleProfileBtnClick = () => {
    dispatch({ type: "SET_PROFILE_WRAPPER_MODAL_OPENED", payload: !isProfileWrapperModalOpened });
  };

  useEffect(() => {
    const target = clickedTarget.target.closest("#profile");
    if (!target) dispatch({ type: "SET_PROFILE_WRAPPER_MODAL_OPENED", payload: false });
  }, [clickedTarget]);

  return (
    <>
      <ProfileContainer id="profile" onClick={handleProfileBtnClick} profile={userProfile}></ProfileContainer>
      {isProfileWrapperModalOpened && <ProfileModal />}
    </>
  );
};

const ProfileContainer = styled.button<{ profile: string }>`
  height: 4vh;
  width: 4vh;
  background-image: url(${(props) => props.profile});
  background-size: cover;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default Profile;
