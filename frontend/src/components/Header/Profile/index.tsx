import { useEffect, useState } from "react";
import styled from "styled-components";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { RootState } from "@src/reducer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { clickedTarget } = useSelector((state: RootState) => state.groupModal);
  const history = useHistory();
  if (!userProfile) history.push("/login");

  const handleProfileBtnClick = () => {
    setIsModalOpened((prev) => !prev);
  };

  useEffect(() => {
    const target = clickedTarget.target.closest("#profile");
    if (!target) setIsModalOpened(false);
  }, [clickedTarget]);

  return (
    <>
      <ProfileContainer id="profile" onClick={handleProfileBtnClick} profile={userProfile}></ProfileContainer>
      {isModalOpened && <ProfileModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}
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
