import { useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";

const Profile = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const handleProfileBtnClick = () => {
    setIsModalOpened(prev => !prev);
  };

  return (
    <>
      <ProfileContainer id="profile" onClick={handleProfileBtnClick}>
        <img className="pointer" src="/icons/profile.svg" height="90%" alt="profile" />
      </ProfileContainer>
      {isModalOpened && <ProfileModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}
    </>
  );
};

const ProfileContainer = styled.button`
  height: 4vh;
  width: 4vh;
  background-color: ${COLOR.WHITE};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

export default Profile;
