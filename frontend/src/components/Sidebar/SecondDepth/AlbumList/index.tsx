import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Album from "./Album";

const AlbumList = () => {
  const [postSelected, setPostSelected] = useState<number>(-1);
  const [modalOpenedIdx, setModalOpenedIdx] = useState<number>(-1);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);

  function handleDrag(ev: React.DragEvent<HTMLDivElement>) {
    const selectedItem = ev.target as HTMLElement;
    const parentItem = selectedItem.parentNode as HTMLElement;
    const list = parentItem?.parentNode;
    if (!list) return;
    const x = ev.clientX;
    const y = ev.clientY;
    parentItem.classList.add("drag-sort-active");
    let swapItem: Element | null =
      document.elementFromPoint(x, y) === null ? parentItem : document.elementFromPoint(x, y);
    if (!swapItem) return;
    swapItem = swapItem.closest(".AlbumItem");
    if (swapItem !== parentItem && list === swapItem?.parentNode) {
      const referenceNode = swapItem !== parentItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(parentItem, referenceNode);
    }
  }

  function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    const item = ev.target as HTMLElement;
    const parentItem = item.closest(".drag-sort-active");
    if (!parentItem) return;
    parentItem.classList.remove("drag-sort-active");
  }

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.target) return;
      if (!clickedTarget.target.closest(".modifying-album-btn")) {
        setModalOpenedIdx(-1);
      }

      if (clickedTarget.target.closest(".update-album-btn") || clickedTarget.target.closest(".delete-album-btn")) {
        setModalOpenedIdx(-1);
      }
    };

    clickHandler();
  }, [clickedTarget]);

  return (
    <DraggableWrapper>
      {selectedGroup.albumList &&
        selectedGroup.albumList.map((album: any) => {
          return (
            <AlbumWrapper key={album.albumID} className="AlbumItem">
              <Album
                album={album}
                postSelected={postSelected}
                setPostSelected={setPostSelected}
                modalOpenedIdx={modalOpenedIdx}
                setModalOpenedIdx={setModalOpenedIdx}
                DragHandler={handleDrag}
                DragEndHandler={handleDrop}
              ></Album>
            </AlbumWrapper>
          );
        })}
    </DraggableWrapper>
  );
};

const DraggableWrapper = styled.div`
  width: 100%;
  & .drag-sort-active {
    background: transparent;
    border: 1px solid ${(props) => props.theme.MENUTEXT};
  }
`;
const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

export default AlbumList;
