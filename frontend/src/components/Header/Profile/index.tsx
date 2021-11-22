import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { RootState } from "@src/reducer";
import { useSelector } from "react-redux";
const Profile = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { clickedTarget } = useSelector((state: RootState) => state.groupModal);

  const handleProfileBtnClick = () => {
    setIsModalOpened((prev) => !prev);
  };

  useEffect(() => {
    const target = clickedTarget.target.closest("#profile");
    if (!target) setIsModalOpened(false);
  }, [clickedTarget]);

  return (
    <>
      <ProfileContainer>
        <ProfileImage id="profile" onClick={handleProfileBtnClick} profile={userProfile}></ProfileImage>
      </ProfileContainer>
      {isModalOpened && <ProfileModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}
    </>
  );
};

const ProfileContainer = styled.div`
  height: 4vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ProfileImage = styled.button<{ profile: string }>`
  width: 4vh;
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
