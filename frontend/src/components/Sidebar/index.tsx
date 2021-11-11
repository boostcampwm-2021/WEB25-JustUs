import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import FirstDepth from "./FirstDepth";
import SecondDepth from "./SecondDepth";
interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isToggle, setIsToggle }: SidebarProps) => {
  const [isAddAlbumModalOpened, setIsAddAlbumModalOpened] = useState<boolean>(false);
  const addGroupBtnRef = useRef<HTMLDivElement>(null);
  const addAlbumBtnRef = useRef<HTMLDivElement>(null);
  const addAlbumModalRef = useRef<HTMLDivElement>(null);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.target) return;

      const addAlbumButtonEl = clickedTarget.target.closest(".add-album-btn");
      const addAlbumModalEl = clickedTarget.target.closest(".add-album-modal");

      if (
        addAlbumButtonEl !== addGroupBtnRef.current &&
        addAlbumButtonEl !== addAlbumBtnRef.current &&
        addAlbumModalEl !== addAlbumModalRef.current
      ) {
        setIsAddAlbumModalOpened(false);
      }

      if (addAlbumButtonEl) setIsAddAlbumModalOpened(true);
    };

    clickHandler();
  }, [clickedTarget]);

  return (
    <SidebarWrapper>
      <FirstDepth isToggle={isToggle} setIsToggle={setIsToggle} addGroupBtnRef={addGroupBtnRef} />
      <SecondDepth
        isToggle={isToggle}
        addAlbumBtnRef={addAlbumBtnRef}
        isAddAlbumModalOpened={isAddAlbumModalOpened}
        setIsAddAlbumModalOpened={setIsAddAlbumModalOpened}
        addAlbumModalRef={addAlbumModalRef}
      />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
`;

export default Sidebar;
