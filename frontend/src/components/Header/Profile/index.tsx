import { useEffect } from "react";
import styled from "styled-components";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { RootState } from "@src/reducer";
import { useSelector, useDispatch } from "react-redux";
import COLOR from "@src/styles/Color";
import { ModalAction } from "@src/action";

const Profile = () => {
  const dispatch = useDispatch();
  const { isProfileWrapperModalOpened } = useSelector((state: RootState) => state.modal);
  const { userProfile, userNickName }: { userProfile: string; userNickName: string } = useSelector(
    (state: RootState) => state.user,
  );
  const { clickedTarget } = useSelector((state: RootState) => state.groupModal);

  const handleProfileBtnClick = () => {
    dispatch(
      ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: !isProfileWrapperModalOpened }),
    );
  };

  useEffect(() => {
    const target = clickedTarget.target.closest("#profile");
    if (isProfileWrapperModalOpened && !target)
      dispatch(ModalAction.setProfileWrapperModalOpenedAction({ isProfileWrapperModalOpened: false }));
  }, [clickedTarget]);

  return (
    <>
      <ProfileContainer>
        <ProfileContent id="profile" onClick={handleProfileBtnClick}>
          <ProfileName>
            {userNickName
              ? userNickName.length > 10
                ? userNickName.substring(0, 10).concat("...")
                : userNickName
              : ""}
          </ProfileName>
          <ProfileImage profile={userProfile}></ProfileImage>
        </ProfileContent>
      </ProfileContainer>
      {isProfileWrapperModalOpened && <ProfileModal />}
    </>
  );
};
const ProfileName = styled.div`
  font-size: 2rem;
  color: ${COLOR.WHITE};
  margin-right: 1rem;
  cursor: pointer;
`;
const ProfileContainer = styled.div`
  height: 4vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
`;
const ProfileImage = styled.button<{ profile: string }>`
  width: 4vh;
  height: 100%;
  background-image: url(${(props) => props.profile});
  background-size: cover;
  border-radius: 10px;
  border: none;
  margin-right: 2rem;
  &:hover {
    cursor: pointer;
  }
`;
export default Profile;
