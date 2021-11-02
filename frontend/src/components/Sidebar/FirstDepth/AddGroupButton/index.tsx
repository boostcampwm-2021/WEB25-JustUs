import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Color from "@styles/Color";
import AddGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/AddGroupModal";

interface AddGroupButtonProps {
  clickedTarget: { element: HTMLElement };
}

const AddGroupButton = ({ clickedTarget }: AddGroupButtonProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const clickHandler = () => {
    if (!clickedTarget.element) return;

    const addgroupButtonEl = clickedTarget.element.closest(".add-group-btn");
    if (addgroupButtonEl === btnRef.current) {
      setIsModalOpened(prev => !prev);
    } else {
      setIsModalOpened(false);
    }
  };

  const onClickAddGroupButton = () => {};

  useEffect(() => {
    clickHandler();
  }, [clickedTarget]);

  return (
    <>
      <ButtonWrapper ref={btnRef} className="add-group-btn" onClick={onClickAddGroupButton}>
        <img src="/icons/add-group.svg" alt="add-group icon.svg" />
      </ButtonWrapper>
      {isModalOpened && <AddGroupModal />}
    </>
  );
};

const ButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${Color["theme1-primary"]};
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Color["theme1-secondary"]};
  cursor: pointer;
`;

export default AddGroupButton;
