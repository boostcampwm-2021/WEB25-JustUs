import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Album from "./Album";
import { useDispatch } from "react-redux";
import { GroupAction } from "@src/action";
import { ModalAction } from "@src/action";

const AlbumList = () => {
  const dispatch = useDispatch();
  const [postSelected, setPostSelected] = useState<number>(-1);
  const { albumList, selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);
  const draggableRef = useRef<HTMLDivElement>(null);

  const onDragLeaveHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    if (!parent) return;
    parent?.classList.remove("album-hover");
    parent?.classList.remove("post-hover");
  }, []);

  const onDropHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    if (!parent) return;
    parent?.classList.remove("album-hover");
    parent?.classList.remove("post-hover");
  }, []);

  const onAlbumDragEndHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
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

    const draggableWrapper = draggableRef.current;
    if (!draggableWrapper) return;
    const children = draggableWrapper.children;

    const albumOrder: string = Array.from(children)
      .map((child) => {
        const albumId = child.getAttribute("data-album-id");
        return Number(albumId);
      })
      .join(",");
    dispatch(GroupAction.updateAlbumOrderAction(selectedGroup.groupId, albumOrder));
  }, []);

  const onPostDragEndHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    const target = ev.target as HTMLElement;
    const parent = target.closest(".albumItem");
    const x = ev.clientX;
    const y = ev.clientY;
    const nowElement = document.elementFromPoint(x, y);
    const nowParent = nowElement?.closest(".albumItem") as HTMLElement;
    if (!nowParent) return;
    if (parent === nowParent) return;
    const postId: number = Number(target.dataset.id);
    const postTitle: string = target.innerText;
    const postAlbumId: number = Number(target.dataset.albumId);
    const postInfo = { postId, postTitle, albumId: postAlbumId };
    const albumId: number = Number(nowParent.dataset.albumId);
    dispatch(GroupAction.postShiftAlbumAction(postInfo, albumId));
  }, []);

  const onPostDragHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
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
  }, []);

  const onAlbumDragHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
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
  }, []);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.target) return;
      if (!clickedTarget.target.closest(".modifying-album-btn")) {
        dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
      }

      if (clickedTarget.target.closest(".update-album-btn") || clickedTarget.target.closest(".delete-album-btn")) {
        dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
      }
    };

    clickHandler();
  }, [clickedTarget]);

  const scrollHandler = useCallback(() => {
    dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
  }, []);

  return (
    <DraggableWrapper ref={draggableRef} onScroll={scrollHandler}>
      {albumList &&
        albumList.map((album: any, idx: number) => {
          return (
            <Album
              key={album.albumId}
              album={album}
              postSelected={postSelected}
              setPostSelected={setPostSelected}
              AlbumDragEndHandler={onAlbumDragEndHandler}
              DropHandler={onDropHandler}
              PostDragHandler={onPostDragHandler}
              AlbumDragHandler={onAlbumDragHandler}
              DragLeaveHandler={onDragLeaveHandler}
              PostDragEndHandler={onPostDragEndHandler}
              albumIdx={idx}
            ></Album>
          );
        })}
    </DraggableWrapper>
  );
};

const DraggableWrapper = styled.div`
  margin: 1rem 0.9rem 0 0;
  & .post-hover {
    border: 2px dotted ${(props) => props.theme.MENUTEXT};
  }
  & .album-hover {
    border-top: 1px solid ${(props) => props.theme.MENUTEXT};
  }
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

export default React.memo(AlbumList);
