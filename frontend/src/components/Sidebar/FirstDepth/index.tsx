import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import COLOR from "@styles/Color";

interface FirstDepthProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: FirstDepthProps) => {
  const { groups }: any = useSelector((state: RootState) => state.groups);

  function handleDrag(ev: React.DragEvent<HTMLDivElement>) {
    const selectedItem = ev.target as HTMLElement;
    const list = selectedItem.parentNode;
    if (!list) return;
    console.log(selectedItem);
    const x = ev.clientX;
    const y = ev.clientY;
    selectedItem.classList.add("drag-sort-active");
    let swapItem: Element | null =
      document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
    if (!swapItem) return;

    if (list === swapItem.parentNode) {
      const insertItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, insertItem);
    }
  }

  function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    const item = ev.target as HTMLElement;
    item.classList.remove("drag-sort-active");
  }

  return (
    <>
      <FirstDepthWrapper>
        <DraggableWrapper>
          {groups.map((group: any) => (
            <Group
              key={group.groupID}
              groupID={group.groupID}
              groupName={group.groupName}
              groupImg={group.groupImg}
              albumList={group.albumList}
              setIsToggle={setIsToggle}
              DragHandler={handleDrag}
              DragEndHandler={handleDrop}
            />
          ))}
        </DraggableWrapper>
        <AddGroupButton addGroupBtnRef={addGroupBtnRef} />
      </FirstDepthWrapper>
    </>
  );
};

const DraggableWrapper = styled.div`
  & > .drag-sort-active {
    background: transparent;
    color: transparent;
    border: 1px solid #4ca1af;
  }
`;

const FirstDepthWrapper = styled.div`
  width: 5vw;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5vw 0;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.SCROLL};
    border-radius: 10px;
  }
`;

export default FirstDepth;
