import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import color from "@styles/Color";
import ProfileModal from "@components/Header/Profile/Modal/ProfileModal";
import { RootState } from "@src/reducer";

const Profile = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const clickedTarget = useSelector((state: RootState) => state.profileModal.clickedTarget);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.element) return;

      const profileEl = clickedTarget.element.closest("#profile");
      if (profileEl !== profileRef.current) {
        return;
      }
      setIsModalOpened(prev => !prev);
    };
    clickHandler();
  }, [clickedTarget]);

  return (
    <>
      <ProfileContainer ref={profileRef} id="profile">
        <img className="pointer" src="/icons/profile.svg" height="90%" alt="profile" />
      </ProfileContainer>
      {isModalOpened && <ProfileModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />}
    </>
  );
};

const ProfileContainer = styled.div`
  height: 4vh;
  width: 4vh;
  background-color: ${color.white};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Profile;
