import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import color from "@styles/Color";
import AddGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/AddGroupModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const AddGroupButton = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.element) return;

      const addgroupButtonEl = clickedTarget.element.closest(".add-group-btn");
      if (addgroupButtonEl !== btnRef.current) {
        setIsModalOpened(false);
        return;
      }

      setIsModalOpened(true);
    };

    clickHandler();
  }, [clickedTarget]);

  return (
    <>
      <ButtonWrapper ref={btnRef} className="add-group-btn">
        <img src="/icons/add-group.svg" alt="add-group icon.svg" />
      </ButtonWrapper>
      {isModalOpened && <AddGroupModal />}
    </>
  );
};

const ButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${color.theme1.primary};
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.theme1.secondary};
  cursor: pointer;
`;

export default AddGroupButton;
