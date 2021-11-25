import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import COLOR from "@styles/Color";
import { updateGroupOrderAction } from "@src/reducer/UserReducer";
import { getAlbumListAction } from "@src/reducer/GroupReducer";
import { scrollbar } from "@src/styles/StyledComponents";

interface FirstDepthProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: FirstDepthProps) => {
  const { groups, deleteGroupSucceed, selectedGroupIdx, addGroupSucceed, joinGroupSucceed }: any = useSelector(
    (state: RootState) => state.groups,
  );
  const draggableRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const chooseClickedGroup = (groupIdx: number) => {
    if (groupIdx < 0 || groupIdx > groups.length - 1) return;

    dispatch(getAlbumListAction(groups[groupIdx]));
    setIsToggle(true);
  };

  useEffect(() => {
    dispatch({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupId: 0 } });
    dispatch(getAlbumListAction(groups[0]));
  }, []);

  useEffect(() => {
    if (!groups.length) return;
    if (!deleteGroupSucceed) return;
    if (deleteGroupSucceed && groups.length >= 2) {
      chooseClickedGroup(selectedGroupIdx);
      return;
    }
  }, [groups, selectedGroupIdx]);

  useEffect(() => {
    if (addGroupSucceed) chooseClickedGroup(selectedGroupIdx);
  }, [selectedGroupIdx, addGroupSucceed]);

  useEffect(() => {
    if (joinGroupSucceed) {
      chooseClickedGroup(selectedGroupIdx);
    }
  }, [selectedGroupIdx, joinGroupSucceed]);

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
  width: 100%;
  & > .drag-sort-active {
    background: transparent;
    color: transparent;
    border: 1px solid #4ca1af;
  }
`;

const FirstDepthWrapper = styled.div`
  width: 9rem;
  height: 95vh;
  background-color: ${(props) => props.theme.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: 7;
  overflow: hidden;
  &:hover {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default FirstDepth;
