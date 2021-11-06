import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Album from "./Album";

const AlbumList = () => {
  const [postSelected, setPostSelected] = useState<number>(0);
  const [modalOpenedIdx, setModalOpenedIdx] = useState<number>(-1);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);

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
    <>
      {selectedGroup.albumList &&
        selectedGroup.albumList.map((album: any) => {
          return (
            <AlbumWrapper key={album.albumID}>
              <Album
                album={album}
                postSelected={postSelected}
                setPostSelected={setPostSelected}
                modalOpenedIdx={modalOpenedIdx}
                setModalOpenedIdx={setModalOpenedIdx}
              ></Album>
            </AlbumWrapper>
          );
        })}
    </>
  );
};

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

export default AlbumList;
