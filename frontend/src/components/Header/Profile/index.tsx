import { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const Profile = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
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
