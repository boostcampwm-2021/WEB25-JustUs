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

  function onDragOverHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".AlbumItem");
    if (!parent) return;
    parent?.classList.add("drag-hover");
  }

  function onDragLeaveHandler(ev: React.DragEvent<HTMLDivElement>) {
    const target = ev.target as HTMLElement;
    const parent = target.closest(".AlbumItem");
    if (!parent) return;
    parent?.classList.remove("drag-hover");
  }
  function onDropHandler(ev: React.DragEvent<HTMLDivElement>) {
    const target = ev.target as HTMLElement;
    const parent = target.closest(".AlbumItem");
    if (!parent) return;
    parent?.classList.remove("drag-hover");
  }

  function onDragEndHandler(ev: React.DragEvent<HTMLDivElement>) {
    const target = ev.target as HTMLElement;
    const parent = target.closest(".AlbumItem");
    if (!parent) return;
    const list = parent?.parentNode;
    if (!list) return;
    const x = ev.clientX;
    const y = ev.clientY;
    let swapItem: Element | null = document.elementFromPoint(x, y) === null ? parent : document.elementFromPoint(x, y);
    if (!swapItem) return;
    swapItem = swapItem.closest(".AlbumItem");
    if (swapItem !== parent && list === swapItem?.parentNode) {
      const referenceNode = swapItem !== parent.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(parent, referenceNode);
    }
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
                DragOverHander={onDragOverHandler}
                DragLeaveHander={onDragLeaveHandler}
                DragEndHandler={onDragEndHandler}
                DropHandler={onDropHandler}
              ></Album>
            </AlbumWrapper>
          );
        })}
    </DraggableWrapper>
  );
};

const DraggableWrapper = styled.div`
  width: 100%;
  & .drag-hover {
    border-top: 1px solid ${(props) => props.theme.MENUTEXT};
  }
`;
const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

export default AlbumList;
