import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Album from "./Album";
import { GroupAction } from "@src/action";
import { useDispatch } from "react-redux";

const AlbumList = () => {
  const dispatch = useDispatch();
  const [postSelected, setPostSelected] = useState<number>(-1);
  const [modalOpenedIdx, setModalOpenedIdx] = useState<number>(-1);
  const { albumList }: any = useSelector((state: RootState) => state.groups);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);
  const { selectedPost }: any = useSelector((state: RootState) => state.modal);

  function onDragLeaveHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    if (!parent) return;
    parent?.classList.remove("album-hover");
    parent?.classList.remove("post-hover");
  }
  function onDropHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    if (!parent) return;
    parent?.classList.remove("album-hover");
    parent?.classList.remove("post-hover");
  }

  function onAlbumDragEndHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    if (!parent) return;
    parent?.classList.remove("album-hover");
    parent?.classList.remove("post-hover");
    const list = parent?.parentNode;
    if (!list) return;
    const x = ev.clientX;
    const y = ev.clientY;
    let swapItem: Element | null = document.elementFromPoint(x, y) === null ? parent : document.elementFromPoint(x, y);
    if (!swapItem) return;
    swapItem = swapItem.closest(".albumItem");
    if (swapItem !== parent && list === swapItem?.parentNode) {
      const referenceNode = swapItem !== parent.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(parent, referenceNode);
    }
  }

  function onPostDragEndHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    const x = ev.clientX;
    const y = ev.clientY;
    const nowElement = document.elementFromPoint(x, y);
    const nowParent = nowElement?.closest(".albumItem") as HTMLElement;
    if (!nowParent) return;
    if (parent === nowParent) return;
    const payload = {
      beforeIdx: target.dataset.albumidx,
      afterIdx: nowParent.dataset.albumidx,
      post: { postId: target.dataset.id, postTitle: target.innerHTML },
    };
    dispatch({
      type: GroupAction.MOVE_POST,
      payload: payload,
    });
  }

  function onPostDragHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    const x = ev.clientX;
    const y = ev.clientY;
    const nowElement = document.elementFromPoint(x, y);
    const nowParent = nowElement?.closest(".albumItem");
    if (!nowParent) return;
    if (parent === nowParent) return;
    nowParent.classList.add("post-hover");
  }

  function onAlbumDragHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    const x = ev.clientX;
    const y = ev.clientY;
    const nowElement = document.elementFromPoint(x, y);
    const nowParent = nowElement?.closest(".albumItem");
    if (!nowParent) return;
    if (parent === nowParent) return;
    nowParent.classList.add("album-hover");
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

  useEffect(() => {
    setPostSelected(selectedPost.postId);
  }, [selectedPost]);

  return (
    <DraggableWrapper>
      {albumList &&
        albumList.map((album: any, idx: number) => {
          return (
            <AlbumWrapper key={album.albumId} className="albumItem" data-albumidx={idx}>
              <Album
                album={album}
                postSelected={postSelected}
                setPostSelected={setPostSelected}
                modalOpenedIdx={modalOpenedIdx}
                setModalOpenedIdx={setModalOpenedIdx}
                AlbumDragEndHandler={onAlbumDragEndHandler}
                DropHandler={onDropHandler}
                PostDragHandler={onPostDragHandler}
                AlbumDragHandler={onAlbumDragHandler}
                DragLeaveHandler={onDragLeaveHandler}
                PostDragEndHandler={onPostDragEndHandler}
                albumIdx={idx}
              ></Album>
            </AlbumWrapper>
          );
        })}
    </DraggableWrapper>
  );
};

const DraggableWrapper = styled.div`
  width: 100%;
  & .post-hover {
    border: 2px dotted ${(props) => props.theme.MENUTEXT};
  }
  & .album-hover {
    border-top: 1px solid ${(props) => props.theme.MENUTEXT};
  }
`;
const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`;

export default AlbumList;
