import styled, { css } from "styled-components";
import COLOR from "@src/styles/Color";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import { flexRowCenterAlign, scrollbarPrimary, modalTitleFont, iconHover } from "@styles/StyledComponents";
import { ReactComponent as MoreVertSVG } from "@styles/icons/more-vert.svg";
import PostSettingModal from "./Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const highlights = (text: string) => {
  const splited = text.split(/[\u0020]/);
  const makeSpan = (word: string, idx: number) => {
    if (idx === 0) return word;
    return `${word} `;
  };

  const makeHashTag = (word: string) => {
    const hashTagWord = word.split("#");
    return hashTagWord.length > 1
      ? hashTagWord.map((tagWord, idx) => {
          return idx === 0 ? (
            makeSpan(tagWord, 0)
          ) : idx === hashTagWord.length - 1 ? (
            <>
              <mark>#{tagWord}</mark>
              <> </>
            </>
          ) : (
            <mark>#{tagWord}</mark>
          );
        })
      : `${hashTagWord[0]} `;
  };

  return splited.map((word) => {
    return makeHashTag(word);
  });
};
const exportDateTime = (date: string) => {
  const dateStart = 0;
  const dateEnd = 10;
  return date.substring(dateStart, dateEnd);
};

const PostInfoModal = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { selectedPost } = useSelector((state: RootState) => state.modal);
  const { userId } = useSelector((state: RootState) => state.user);

  return (
    <ModalContainer
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".more-icon")) setModalOpened(false);
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <Modal className="modal">
        <ModalHeader className="modalHeader">
          <PostTitle>
            {selectedPost.postTitle.length > 20
              ? selectedPost.postTitle.substring(0, 20).concat("...")
              : selectedPost.postTitle}
          </PostTitle>
          {selectedPost.userId === userId ? (
            <MoreIconWrapper className="more-icon">
              <MoreVertSVG
                fill={COLOR.BLACK}
                onClick={() => {
                  setModalOpened((prev) => !prev);
                }}
              />
            </MoreIconWrapper>
          ) : null}
          {modalOpened && <PostSettingModal />}
        </ModalHeader>
        <ModalContentWrapper className="modalContentWrapper">
          <CarouselWrapper>
            <Carousel files={selectedPost.images} carouselWidth={35} />
          </CarouselWrapper>
          <ModalContent>{highlights(selectedPost.postContent)}</ModalContent>
        </ModalContentWrapper>
        <ModalFooter className="modalFooter">
          <FooterItem>{exportDateTime(selectedPost.postDate)}</FooterItem>
          <FooterItem>{selectedPost.userNickname}🖊</FooterItem>
        </ModalFooter>
      </Modal>
    </ModalContainer>
  );
};

const postInfoModalWidth = css`
  width: 50rem;
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  ${postInfoModalWidth};
  height: 70rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Modal = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 7rem;
  width: 100%;
  position: relative;
  border-bottom: 0.2rem solid ${COLOR.GRAY};
`;
const PostTitle = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 2;
  grid-column-end: 3;
  font-family: "NanumDaCaeSaRang";
  font-size: 3rem;
  font-weight: bold;
`;
const MoreIconWrapper = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;
  & svg {
    ${iconHover}
  }
`;
const ModalContentWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;
const CarouselWrapper = styled.div`
  border-bottom: 0.2rem solid ${COLOR.GRAY};
  box-sizing: border-box;
`;
const ModalContent = styled.div`
  ${modalTitleFont};
  font-weight: normal;
  padding: 2rem;
  font-family: "NanumDaCaeSaRang";
  white-space: pre-wrap;
  height: 20rem;
  box-sizing: border-box;
  word-break: break-all;
  line-height: 130%;
  width: 50rem;
  ${scrollbarPrimary}

  & mark {
    border-radius: 3px;
    color: ${COLOR.WHITE};
    background-color: ${(props) => props.theme.SECONDARY};
    padding: 0 1rem 0 0.5rem;
    font-size: 2.5rem;
    font-family: "NanumDaCaeSaRang";
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.PRIMARY};
    }
  }
`;
const ModalFooter = styled.div`
  padding: 1rem 0;
  background-color: ${COLOR.DARKGRAY};
  border-radius: 0 0 1rem 1rem;
  ${modalTitleFont}
  color: ${COLOR.WHITE};
  font-weight: 300;
  display: flex;
  justify-content: flex-end;
  vertical-align: bottom;
  font-family: "NanumDaCaeSaRang";
  box-sizing: border-box;
`;
const FooterItem = styled.div`
  padding-right: 1rem;
  font-family: "NanumDaCaeSaRang";
`;

export default PostInfoModal;
