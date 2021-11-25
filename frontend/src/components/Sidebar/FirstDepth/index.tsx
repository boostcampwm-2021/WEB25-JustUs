import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import COLOR from "@styles/Color";
import { updateGroupOrderAction } from "@src/reducer/UserReducer";
import { getAlbumListAction } from "@src/reducer/GroupReducer";

interface FirstDepthProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: FirstDepthProps) => {
  const { groups }: any = useSelector((state: RootState) => state.groups);
  const draggableRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!groups.length) return;
    dispatch(getAlbumListAction(groups[0]));
  }, [groups]);

  if (!groups.length) return null;

  function handleDrag(ev: React.DragEvent<HTMLDivElement>) {
    const selectedItem = ev.target as HTMLElement;
    const list = selectedItem.parentNode;
    if (!list) return;
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
    const draggableWrapper = draggableRef.current;

    if (!draggableWrapper) return;

    const children = draggableWrapper.children;
    const groupOrder: Number[] = [];

    Array.from(children).forEach((child) => {
      const groupId = child.getAttribute("data-id");
      groupOrder.push(Number(groupId));
    });

    dispatch(updateGroupOrderAction({ groupOrder }));

    const item = ev.target as HTMLElement;
    item.classList.remove("drag-sort-active");
  }

  return (
    <>
      <FirstDepthWrapper>
        <DraggableWrapper ref={draggableRef}>
          {groups.map((group: any) =>
            group ? (
              <Group
                isToggle={isToggle}
                key={group.groupId}
                groupId={group.groupId}
                groupName={group.groupName}
                groupImage={group.groupImage}
                setIsToggle={setIsToggle}
                DragHandler={handleDrag}
                DragEndHandler={handleDrop}
              />
            ) : null,
          )}
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
  position: absolute;
  width: 5vw;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: content-box;
  z-index: 7;
  overflow: hidden;
  &:hover {
    margin-right: 0.1rem;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0.8rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.SECONDARY};
      border-radius: 1rem;
    }
  }
`;

export default FirstDepth;
